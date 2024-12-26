export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type AssignedActivity = {
  id: string;
  student_id: string;
  activity_title: string;
  activity_description: string | null;
  assigned_at: string;
  completed_at: string | null;
};