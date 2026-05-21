import { describe, expect, it } from "vitest";
import {
  formatDateJa,
  formatDateJaFull,
  parseDateLocal,
  toIsoDate,
} from "../../src/lib/format";

// 2026-05-21 (Thu), 2026-01-01 (Thu) を基本テストデータに採用
// （ローカルTZでの整合性が崩れないよう、YYYY-MM-DDから文字列に閉じている）

describe("parseDateLocal", () => {
  it("YYYY-MM-DD をローカル深夜0時として解釈する", () => {
    const d = parseDateLocal("2026-05-21");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(4); // 5月は index=4
    expect(d.getDate()).toBe(21);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
  });

  it("1月1日も正しくパースできる（境界）", () => {
    const d = parseDateLocal("2026-01-01");
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);
  });
});

describe("formatDateJa", () => {
  it("M/D(曜日) 形式で返す", () => {
    expect(formatDateJa("2026-05-21")).toBe("5/21(木)");
  });

  it("1桁月日を0埋めしない", () => {
    expect(formatDateJa("2026-01-01")).toBe("1/1(木)");
  });

  it("日曜を「日」と表記する", () => {
    expect(formatDateJa("2026-05-24")).toBe("5/24(日)");
  });

  it("土曜を「土」と表記する", () => {
    expect(formatDateJa("2026-05-23")).toBe("5/23(土)");
  });
});

describe("formatDateJaFull", () => {
  it("YYYY年M月D日 (曜日) 形式で返す", () => {
    expect(formatDateJaFull("2026-05-21")).toBe("2026年5月21日 (木)");
  });
});

describe("toIsoDate", () => {
  it("Date を YYYY-MM-DD（ローカルTZ）に変換する", () => {
    const d = new Date(2026, 4, 21); // 2026-05-21 local
    expect(toIsoDate(d)).toBe("2026-05-21");
  });

  it("1桁月日を0埋めする", () => {
    const d = new Date(2026, 0, 5);
    expect(toIsoDate(d)).toBe("2026-01-05");
  });

  it("toIsoDate と parseDateLocal は往復で同値（ローカルTZ）", () => {
    const original = new Date(2026, 11, 31); // 2026-12-31
    const iso = toIsoDate(original);
    const parsed = parseDateLocal(iso);
    expect(parsed.getFullYear()).toBe(original.getFullYear());
    expect(parsed.getMonth()).toBe(original.getMonth());
    expect(parsed.getDate()).toBe(original.getDate());
  });
});
