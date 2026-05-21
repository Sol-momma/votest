export type Mark = "o" | "t" | "x";

export type EventRow = {
  id: string;
  title: string;
  admin_token: string;
  is_closed: boolean;
  decided_date_id: string | null;
  created_at: string;
};

export type EventDateRow = {
  id: string;
  event_id: string;
  date: string;
  sort_order: number;
};

export type ResponseRow = {
  id: string;
  event_id: string;
  nickname: string;
  created_at: string;
};

export type ResponseAnswerRow = {
  response_id: string;
  event_date_id: string;
  mark: Mark;
};

export type EventDateScoreRow = {
  event_date_id: string;
  event_id: string;
  date: string;
  sort_order: number;
  cnt_o: number;
  cnt_t: number;
  cnt_x: number;
  score: number;
  respondents: number;
};
