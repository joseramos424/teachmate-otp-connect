export type TablesTypes = {
  classes: {
    Row: {
      created_at: string;
      description: string | null;
      id: string;
      name: string;
    };
    Insert: {
      created_at?: string;
      description?: string | null;
      id?: string;
      name: string;
    };
    Update: {
      created_at?: string;
      description?: string | null;
      id?: string;
      name?: string;
    };
    Relationships: [];
  };
  otp_codes: {
    Row: {
      code: string;
      student_id: string;
      created_at: string;
      expires_at: string;
      id: string;
      used: boolean | null;
    };
    Insert: {
      code: string;
      student_id: string;
      created_at?: string;
      expires_at: string;
      id?: string;
      used?: boolean | null;
    };
    Update: {
      code?: string;
      student_id?: string;
      created_at?: string;
      expires_at?: string;
      id?: string;
      used?: boolean | null;
    };
    Relationships: [];
  };
  tutor_otp_codes: {
    Row: {
      code: string;
      tutor_id: string;
      created_at: string;
      expires_at: string;
      id: string;
      used: boolean | null;
    };
    Insert: {
      code: string;
      tutor_id: string;
      created_at?: string;
      expires_at: string;
      id?: string;
      used?: boolean | null;
    };
    Update: {
      code?: string;
      tutor_id?: string;
      created_at?: string;
      expires_at?: string;
      id?: string;
      used?: boolean | null;
    };
    Relationships: [];
  };
  students: {
    Row: {
      created_at: string;
      email: string;
      first_name: string;
      id: string;
      last_name: string;
    };
    Insert: {
      created_at?: string;
      email: string;
      first_name: string;
      id?: string;
      last_name: string;
    };
    Update: {
      created_at?: string;
      email?: string;
      first_name?: string;
      id?: string;
      last_name?: string;
    };
    Relationships: [];
  };
  students_classes: {
    Row: {
      student_id: string;
      class_id: string;
      joined_at: string;
    };
    Insert: {
      student_id: string;
      class_id: string;
      joined_at?: string;
    };
    Update: {
      student_id?: string;
      class_id?: string;
      joined_at?: string;
    };
    Relationships: [
      {
        foreignKeyName: "students_classes_class_id_fkey";
        columns: ["class_id"];
        isOneToOne: false;
        referencedRelation: "classes";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "students_classes_student_id_fkey";
        columns: ["student_id"];
        isOneToOne: false;
        referencedRelation: "students";
        referencedColumns: ["id"];
      }
    ];
  };
};