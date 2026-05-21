import { describe, expect, it } from "vitest";
import {
  CloseEventInputSchema,
  CreateEventInputSchema,
  IsoDateSchema,
  MarkSchema,
  SubmitResponseInputSchema,
  UuidSchema,
  firstErrorMessage,
} from "../../src/lib/schemas";

// テスト用の有効UUID
const UUID = "ce23a8f5-3bef-4825-bc19-6edd1a487f52";
const UUID2 = "6d92f0c9-cc5d-45c6-938d-b5621d3a0611";

describe("IsoDateSchema", () => {
  it("YYYY-MM-DD はパース成功", () => {
    expect(IsoDateSchema.safeParse("2026-05-21").success).toBe(true);
  });
  it("不正な形式は失敗", () => {
    expect(IsoDateSchema.safeParse("2026/05/21").success).toBe(false);
    expect(IsoDateSchema.safeParse("2026-5-21").success).toBe(false);
    expect(IsoDateSchema.safeParse("not-a-date").success).toBe(false);
    expect(IsoDateSchema.safeParse("").success).toBe(false);
  });
  it("数値などは失敗", () => {
    expect(IsoDateSchema.safeParse(20260521).success).toBe(false);
    expect(IsoDateSchema.safeParse(null).success).toBe(false);
  });
});

describe("MarkSchema", () => {
  it("'o' / 't' / 'x' を受理", () => {
    expect(MarkSchema.safeParse("o").success).toBe(true);
    expect(MarkSchema.safeParse("t").success).toBe(true);
    expect(MarkSchema.safeParse("x").success).toBe(true);
  });
  it("それ以外は失敗", () => {
    expect(MarkSchema.safeParse("y").success).toBe(false);
    expect(MarkSchema.safeParse("O").success).toBe(false);
    expect(MarkSchema.safeParse("").success).toBe(false);
  });
});

describe("UuidSchema", () => {
  it("正しいUUIDは成功", () => {
    expect(UuidSchema.safeParse(UUID).success).toBe(true);
  });
  it("UUIDっぽいだけの文字列は失敗", () => {
    expect(UuidSchema.safeParse("not-a-uuid").success).toBe(false);
    expect(UuidSchema.safeParse("1234").success).toBe(false);
  });
});

// ============================================================
// CreateEventInputSchema
// ============================================================

describe("CreateEventInputSchema", () => {
  it("正常系: タイトル+候補日1件", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "ご飯会",
      dates: ["2026-05-21"],
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.title).toBe("ご飯会");
      expect(r.data.dates).toEqual(["2026-05-21"]);
    }
  });

  it("title は trim される", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "  ご飯会  ",
      dates: ["2026-05-21"],
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.title).toBe("ご飯会");
  });

  it("title が空文字 → 失敗", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "",
      dates: ["2026-05-21"],
    });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(firstErrorMessage(r.error)).toBe("タイトルを入力してください");
  });

  it("title が trim 後に空文字 → 失敗", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "   ",
      dates: ["2026-05-21"],
    });
    expect(r.success).toBe(false);
  });

  it("title が81文字以上 → 失敗", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "あ".repeat(81),
      dates: ["2026-05-21"],
    });
    expect(r.success).toBe(false);
  });

  it("dates が空配列 → 失敗", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "ご飯会",
      dates: [],
    });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(firstErrorMessage(r.error)).toBe("候補日を1つ以上選んでください");
  });

  it("dates が32件以上 → 失敗", () => {
    const dates = Array.from({ length: 32 }, (_, i) => {
      const d = String(i + 1).padStart(2, "0");
      return `2026-05-${d.length > 2 ? d.slice(0, 2) : d}`;
    });
    const r = CreateEventInputSchema.safeParse({
      title: "ご飯会",
      dates,
    });
    expect(r.success).toBe(false);
  });

  it("dates に不正フォーマット混入 → 失敗", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "ご飯会",
      dates: ["2026-05-21", "invalid-date"],
    });
    expect(r.success).toBe(false);
  });

  it("dates が重複していたら排除されてソートされる（transform）", () => {
    const r = CreateEventInputSchema.safeParse({
      title: "ご飯会",
      dates: ["2026-05-22", "2026-05-21", "2026-05-21"],
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.dates).toEqual(["2026-05-21", "2026-05-22"]);
    }
  });
});

// ============================================================
// SubmitResponseInputSchema
// ============================================================

describe("SubmitResponseInputSchema", () => {
  const valid = {
    eventId: UUID,
    nickname: "たろう",
    answers: [{ eventDateId: UUID2, mark: "o" as const }],
  };

  it("正常系", () => {
    const r = SubmitResponseInputSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("nickname trim される", () => {
    const r = SubmitResponseInputSchema.safeParse({
      ...valid,
      nickname: "  たろう  ",
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.nickname).toBe("たろう");
  });

  it("nickname が空 → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({ ...valid, nickname: "" });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(firstErrorMessage(r.error)).toBe("名前を入力してください");
  });

  it("nickname が31文字 → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({
      ...valid,
      nickname: "あ".repeat(31),
    });
    expect(r.success).toBe(false);
  });

  it("eventId が UUID 形式でない → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({
      ...valid,
      eventId: "not-a-uuid",
    });
    expect(r.success).toBe(false);
  });

  it("answers が空配列 → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({ ...valid, answers: [] });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(firstErrorMessage(r.error)).toBe("回答がありません");
  });

  it("answer.mark が不正値 → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({
      ...valid,
      answers: [{ eventDateId: UUID2, mark: "y" }],
    });
    expect(r.success).toBe(false);
  });

  it("answer.eventDateId がUUIDでない → 失敗", () => {
    const r = SubmitResponseInputSchema.safeParse({
      ...valid,
      answers: [{ eventDateId: "1234", mark: "o" }],
    });
    expect(r.success).toBe(false);
  });
});

// ============================================================
// CloseEventInputSchema
// ============================================================

describe("CloseEventInputSchema", () => {
  it("正常系（decidedDateIdなし）", () => {
    const r = CloseEventInputSchema.safeParse({
      eventId: UUID,
      adminToken: UUID2,
    });
    expect(r.success).toBe(true);
  });

  it("正常系（decidedDateIdあり）", () => {
    const r = CloseEventInputSchema.safeParse({
      eventId: UUID,
      adminToken: UUID2,
      decidedDateId: UUID,
    });
    expect(r.success).toBe(true);
  });

  it("decidedDateId が null も受理", () => {
    const r = CloseEventInputSchema.safeParse({
      eventId: UUID,
      adminToken: UUID2,
      decidedDateId: null,
    });
    expect(r.success).toBe(true);
  });

  it("adminToken が UUID でない → 失敗", () => {
    const r = CloseEventInputSchema.safeParse({
      eventId: UUID,
      adminToken: "not-uuid",
    });
    expect(r.success).toBe(false);
  });

  it("decidedDateId が不正なUUID → 失敗", () => {
    const r = CloseEventInputSchema.safeParse({
      eventId: UUID,
      adminToken: UUID2,
      decidedDateId: "bad-id",
    });
    expect(r.success).toBe(false);
  });
});

// ============================================================
// firstErrorMessage
// ============================================================

describe("firstErrorMessage", () => {
  it("最初のエラーメッセージを返す", () => {
    const r = CreateEventInputSchema.safeParse({ title: "", dates: [] });
    if (!r.success) {
      const msg = firstErrorMessage(r.error);
      expect(typeof msg).toBe("string");
      expect(msg.length).toBeGreaterThan(0);
    }
  });
});
