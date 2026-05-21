-- ご飯会日程調整 MVP 初期スキーマ
-- Supabase Dashboard > SQL Editor で全文コピペ実行

-- 回答記号: ◯ / △ / ×
do $$ begin
  create type answer_mark as enum ('o', 't', 'x');
exception when duplicate_object then null; end $$;

-- イベント
create table if not exists events (
  id              uuid primary key default gen_random_uuid(),
  title           text not null check (char_length(title) between 1 and 80),
  admin_token     uuid not null default gen_random_uuid(),
  is_closed       boolean not null default false,
  decided_date_id uuid,
  created_at      timestamptz not null default now()
);

-- 候補日
create table if not exists event_dates (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references events(id) on delete cascade,
  date       date not null,
  sort_order int  not null,
  unique (event_id, date)
);
create index if not exists event_dates_event_id_idx on event_dates (event_id);

-- 回答者
create table if not exists responses (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references events(id) on delete cascade,
  nickname   text not null check (char_length(nickname) between 1 and 30),
  created_at timestamptz not null default now()
);
create index if not exists responses_event_id_idx on responses (event_id);

-- 回答内容
create table if not exists response_answers (
  response_id   uuid not null references responses(id) on delete cascade,
  event_date_id uuid not null references event_dates(id) on delete cascade,
  mark          answer_mark not null,
  primary key (response_id, event_date_id)
);

-- 集計ビュー（◯=2, △=1, ×=0、出席率は (cnt_o + cnt_t*0.5) / respondents）
create or replace view event_date_scores as
select
  ed.id        as event_date_id,
  ed.event_id  as event_id,
  ed.date      as date,
  ed.sort_order as sort_order,
  count(*) filter (where ra.mark = 'o') as cnt_o,
  count(*) filter (where ra.mark = 't') as cnt_t,
  count(*) filter (where ra.mark = 'x') as cnt_x,
  coalesce(sum(case ra.mark when 'o' then 2 when 't' then 1 else 0 end), 0)::int as score,
  count(distinct ra.response_id)::int as respondents
from event_dates ed
left join response_answers ra on ra.event_date_id = ed.id
group by ed.id;

-- RLS は MVP では無効化のまま。書き込みは service_role キーを使う
-- Server Actions 経由のみ許可する設計（クライアントから @supabase/supabase-js を直接呼ばない）
