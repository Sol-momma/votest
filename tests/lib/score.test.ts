import { describe, expect, it } from "vitest";
import { rank } from "../../src/lib/score";
import type { EventDateScoreRow } from "../../src/types/db";

const row = (overrides: Partial<EventDateScoreRow> = {}): EventDateScoreRow => ({
  event_date_id: "id",
  event_id: "ev",
  date: "2026-05-21",
  sort_order: 0,
  cnt_o: 0,
  cnt_t: 0,
  cnt_x: 0,
  score: 0,
  respondents: 0,
  ...overrides,
});

describe("rank: 基本", () => {
  it("空配列は空配列を返す", () => {
    expect(rank([])).toEqual([]);
  });

  it("回答0名のとき attendancePct は 0%", () => {
    const r = rank([row({ respondents: 0 })]);
    expect(r[0].attendancePct).toBe(0);
  });

  it("◯のみのとき attendancePct は 100%", () => {
    const r = rank([row({ respondents: 3, cnt_o: 3, score: 6 })]);
    expect(r[0].attendancePct).toBe(100);
  });

  it("×のみのとき attendancePct は 0%", () => {
    const r = rank([row({ respondents: 3, cnt_x: 3, score: 0 })]);
    expect(r[0].attendancePct).toBe(0);
  });

  it("◯=2, 🤔=1, ×=0 / 3名 → 約83.3%", () => {
    const r = rank([row({ respondents: 3, cnt_o: 2, cnt_t: 1, cnt_x: 0, score: 5 })]);
    expect(r[0].attendancePct).toBeCloseTo(83.33, 1);
  });

  it("🤔のみ（半人前カウント）でも0%にならない", () => {
    const r = rank([row({ respondents: 2, cnt_t: 2, score: 2 })]);
    expect(r[0].attendancePct).toBe(50);
  });
});

describe("rank: 並び順", () => {
  it("attendancePct 降順で並ぶ", () => {
    const r = rank([
      row({ event_date_id: "low", respondents: 3, cnt_o: 1, cnt_x: 2, score: 2, date: "2026-05-21" }),
      row({ event_date_id: "high", respondents: 3, cnt_o: 3, score: 6, date: "2026-05-22" }),
    ]);
    expect(r.map((x) => x.event_date_id)).toEqual(["high", "low"]);
  });

  it("attendancePct が同率なら score 降順で並ぶ", () => {
    // a: 2◯+1× / 3 = 66.7%, score=4
    // b: 4◯+2× / 6 = 66.7%, score=8
    const r = rank([
      row({ event_date_id: "a", respondents: 3, cnt_o: 2, cnt_x: 1, score: 4, date: "2026-05-21" }),
      row({ event_date_id: "b", respondents: 6, cnt_o: 4, cnt_x: 2, score: 8, date: "2026-05-22" }),
    ]);
    expect(r[0].event_date_id).toBe("b");
    expect(r[1].event_date_id).toBe("a");
  });

  it("pct と score が同率なら 日付昇順で並ぶ", () => {
    const r = rank([
      row({ event_date_id: "later", respondents: 1, cnt_o: 1, score: 2, date: "2026-05-22" }),
      row({ event_date_id: "earlier", respondents: 1, cnt_o: 1, score: 2, date: "2026-05-21" }),
    ]);
    expect(r[0].event_date_id).toBe("earlier");
    expect(r[1].event_date_id).toBe("later");
  });

  it("3件以上でも並びが安定する", () => {
    const r = rank([
      row({ event_date_id: "c", respondents: 3, cnt_o: 1, cnt_x: 2, score: 2, date: "2026-05-23" }), // 33%
      row({ event_date_id: "a", respondents: 3, cnt_o: 3, score: 6, date: "2026-05-21" }), // 100%
      row({ event_date_id: "b", respondents: 3, cnt_o: 2, cnt_t: 1, score: 5, date: "2026-05-22" }), // 83%
    ]);
    expect(r.map((x) => x.event_date_id)).toEqual(["a", "b", "c"]);
  });
});

describe("rank: イミュータビリティ", () => {
  it("入力配列は変更されない", () => {
    const input = [
      row({ event_date_id: "x", respondents: 1, cnt_x: 1 }),
      row({ event_date_id: "o", respondents: 1, cnt_o: 1, score: 2 }),
    ];
    const before = input.map((x) => x.event_date_id);
    rank(input);
    const after = input.map((x) => x.event_date_id);
    expect(after).toEqual(before);
  });

  it("元のオブジェクトに attendancePct プロパティが生えない", () => {
    const input = [row({ respondents: 1, cnt_o: 1, score: 2 })];
    rank(input);
    expect("attendancePct" in input[0]).toBe(false);
  });
});

describe("rank: 戻り値の整形", () => {
  it("元の集計フィールドを保持しつつ attendancePct を加える", () => {
    const r = rank([row({ respondents: 2, cnt_o: 1, cnt_t: 1, score: 3 })]);
    expect(r[0]).toMatchObject({
      cnt_o: 1,
      cnt_t: 1,
      cnt_x: 0,
      score: 3,
      respondents: 2,
    });
    expect(typeof r[0].attendancePct).toBe("number");
  });
});
