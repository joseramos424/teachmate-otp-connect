export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  code?: string;
};

export type StudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
  code: string;
};