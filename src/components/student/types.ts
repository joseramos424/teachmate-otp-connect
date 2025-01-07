export type Activity = {
  id: string;
  activity_title: string;
  activity_description: string;
  activity_path: string;
  assigned_at: string;
  completed_at: string | null;
  results?: {
    correct: number;
    total: number;
  } | null;
};