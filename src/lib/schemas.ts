import { z } from "zod";

// ============================================================
// 基本スキーマ
// ============================================================

/** ISO日付（YYYY-MM-DD）- DB の date カラムに対応 */
export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "日付の形式が不正です (YYYY-MM-DD)");

/** マーク: ◯ / 🤔 / × */
export const MarkSchema = z.enum(["o", "t", "x"]);

/** UUID（events.id, event_dates.id, admin_token など） */
export const UuidSchema = z.string().uuid("IDの形式が不正です");

// ============================================================
// イベント作成
// ============================================================

export const CreateEventInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "タイトルを入力してください")
    .max(80, "タイトルは80文字以内で入力してください"),
  dates: z
    .array(IsoDateSchema)
    .min(1, "候補日を1つ以上選んでください")
    .max(31, "候補日は31件までにしてください")
    .transform((arr) => Array.from(new Set(arr)).sort()), // 重複排除 + ソート
});

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

// ============================================================
// 回答送信
// ============================================================

export const AnswerSchema = z.object({
  eventDateId: UuidSchema,
  mark: MarkSchema,
});

export const SubmitResponseInputSchema = z.object({
  eventId: UuidSchema,
  nickname: z
    .string()
    .trim()
    .min(1, "名前を入力してください")
    .max(30, "名前は30文字以内で入力してください"),
  answers: z
    .array(AnswerSchema)
    .min(1, "回答がありません")
    .max(100, "候補日が多すぎます"), // 安全弁
});

export type SubmitResponseInput = z.infer<typeof SubmitResponseInputSchema>;

// ============================================================
// 締切
// ============================================================

export const CloseEventInputSchema = z.object({
  eventId: UuidSchema,
  adminToken: UuidSchema,
  decidedDateId: UuidSchema.nullable().optional(),
});

export type CloseEventInput = z.infer<typeof CloseEventInputSchema>;

// ============================================================
// 共通ユーティリティ
// ============================================================

/**
 * Zod の SafeParseError から最初の人間可読エラーメッセージを抽出。
 * ネストしたフィールドの場合はパスを付与する（例: "dates.0: 日付の形式が不正です"）。
 */
export function firstErrorMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "入力が不正です";
  return issue.message;
}
