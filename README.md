# 📅 いついく？

> 候補日10件でも、30秒で答えられる。スマホ専用の日程調整。

ご飯会・飲み会の日程調整をスマホ100%最適化で再設計したアプリ。ログイン不要、URLを送るだけで◯/🤔/× を投票して、出席率の高い順に自動集計します。

---

## 🎯 強み・差別化ポイント

| | |
| --- | --- |
| ⚡ **候補日が多いほどラク** | 一括投票・範囲投票で30件でも数タップ |
| 📱 **スマホ100%最適化** | 大きいタップターゲット、safe-area対応、片手操作 |
| 🔓 **ログイン不要・無料** | URL送るだけで誰でも投票、LINE未利用者にも届く |
| 📊 **チャートで一目** | 3色スタックバー・比較バーで結果が直感的 |
| 🤔 **「微妙」を表現できる** | ◯/🤔/× の3段階で現実的な事情を1タップ |

→ 詳細は [docs/strengths.md](./docs/strengths.md)

---

## 🛠 技術スタック

| レイヤ | 技術 |
| --- | --- |
| フレームワーク | Next.js 16 (App Router) + TypeScript |
| スタイル | Tailwind CSS v4（カスタム @theme でデザイントークン） |
| DB / BaaS | Supabase (Postgres + Service Role からの Server Actions) |
| バリデーション | Zod（Server Actions の入力検証） |
| デプロイ | Vercel (Fluid Compute, Node 24) |
| Lint/Format | Biome |
| テスト | Vitest（53テスト） |
| 状態管理 | React 19 useState + localStorage（履歴） |
| カレンダー | 自作（Trip.com風縦スクロール + 連結ピル） |

---

## 🚀 セットアップ

### 必要なもの

- Node.js 24+
- Supabase アカウント（無料枠でOK）
- Vercel アカウント（デプロイする場合）

### 1. リポジトリ取得 & 依存インストール

```bash
git clone https://github.com/Sol-momma/votest.git
cd votest
npm install
```

### 2. Supabase プロジェクト作成

[Supabase Dashboard](https://supabase.com/dashboard) で新規プロジェクトを作成し、SQL Editor で
[supabase/migrations/0001_init.sql](./supabase/migrations/0001_init.sql) を実行。

### 3. 環境変数

`.env.local` を作成:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... # Project Settings > API の service_role secret
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` は **サーバー側のみ**で使用。クライアントに露出させない。

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 を開く。

### 5. テスト

```bash
npm test          # 1回実行
npm run test:watch  # ウォッチモード
```

### 6. 本番ビルド

```bash
npm run build
npm start
```

---

## 📂 ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx              # サイト共通 (Header, Sidebar)
│   ├── page.tsx                # トップ（ヒーロー + 強み + サンプル）
│   ├── new/page.tsx            # イベント作成
│   └── event/[eventId]/
│       ├── page.tsx            # 結果ランキング
│       └── respond/page.tsx    # 投票
├── actions/                    # Server Actions（Zod検証）
│   ├── create-event.ts
│   ├── submit-response.ts
│   └── close-event.ts
├── components/
│   ├── SiteSidebar.tsx         # デスクトップ左サイドバー
│   ├── SiteHeader.tsx          # モバイル上部ヘッダー
│   ├── CreateEventForm.tsx     # 作成フォーム
│   ├── DatePickerMulti.tsx     # 自作カレンダー
│   ├── RespondForm.tsx         # 投票UI（2カラム + 範囲モード）
│   ├── RankingList.tsx         # 結果ランキング（チャート）
│   ├── ShareBlock.tsx
│   ├── CloseEventButton.tsx
│   ├── RecentEventRecorder.tsx # localStorage履歴記録
│   └── CreateEventForm.tsx
├── lib/
│   ├── schemas.ts              # Zodスキーマ
│   ├── score.ts                # ランキング計算
│   ├── format.ts               # 日付フォーマット
│   ├── recent-events.ts        # localStorage履歴管理
│   └── supabase/server.ts      # service role クライアント
└── types/db.ts

tests/
└── lib/
    ├── format.test.ts
    ├── score.test.ts
    └── schemas.test.ts

supabase/migrations/0001_init.sql
docs/strengths.md
```

---

## 🗃 データベース設計

| テーブル | 役割 |
| --- | --- |
| `events` | イベント本体（title, admin_token, is_closed, decided_date_id） |
| `event_dates` | 候補日（event_id, date, sort_order） |
| `responses` | 回答者（event_id, nickname） |
| `response_answers` | 回答内容（response_id, event_date_id, mark） |
| `event_date_scores` (view) | 集計ビュー（cnt_o, cnt_t, cnt_x, score, respondents） |

スキーマ詳細: [supabase/migrations/0001_init.sql](./supabase/migrations/0001_init.sql)

### 認可モデル

- **読み取り**: URL を知っている人 = 正当（RLS無効）
- **書き込み**: Server Actions のみ（service role キー、サーバー専用）
- **管理操作（締切）**: `admin_token` を持つ人のみ（`?admin=` URLパラメータ）

---

## 🧪 テスト

ユニットテスト（vitest）53件:

- `format.test.ts` — 日付パース/フォーマット/相対日時
- `score.test.ts` — ランキング計算・並び順・タイブレーク
- `schemas.test.ts` — Zod バリデーション

```bash
npm test
```

---

## 🚢 デプロイ（Vercel）

### CLI 経由

```bash
npx vercel link
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
npx vercel deploy --prod
```

### Dashboard 経由

1. https://vercel.com/new で GitHub リポジトリを Import
2. Environment Variables に 3キーを追加
3. Deploy

Preview deploy も自動で動くので、PR レビューで実機確認しやすい。

---

## 📚 詳しいドキュメント

- [docs/strengths.md](./docs/strengths.md) — 強み・差別化・競合比較
- [AGENTS.md](./AGENTS.md) / [CLAUDE.md](./CLAUDE.md) — 開発時の AI エージェント設定

---

## 📝 ライセンス

未設定（個人プロジェクト）

---

## 🙋 開発メモ

- **Tailwind v4 の `@theme`** でカスタムカラー (`paper`, `ink`, `tag-*`, `accent`) を一元管理
- **Notion 風デザイン**：白基調・パステルタグ・絵文字をアイコン代わり
- **カレンダーは自作**：縦スクロール複数月、範囲選択モード、連結ピル表示
- **Server Actions** を全API層として使用。REST/RPC ルートは不採用
