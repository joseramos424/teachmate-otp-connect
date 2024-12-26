export type Activity = {
  start: number;
  answers: number[];
};

export type ActivityResult = {
  attempts: number;
  success: boolean;
  start: number;
  answers: number[];
};