import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (studentsError) throw studentsError;

      // Fetch permanent codes for each student
      const { data: codesData, error: codesError } = await supabase
        .from("permanent_student_codes")
        .select("*");

      if (codesError) throw codesError;

      // Combine student data with their permanent codes
      const studentsWithCodes = studentsData.map(student => ({
        ...student,
        code: codesData.find(code => code.student_id === student.id)?.code
      }));

      return studentsWithCodes;
    },
  });

  const addStudent = useMutation({
    mutationFn: async (newStudent: StudentFormData) => {
      // First, check if the code is already in use
      const { data: existingCode, error: codeError } = await supabase
        .from("permanent_student_codes")
        .select()
        .eq("code", newStudent.code);

      if (codeError) throw codeError;
      if (existingCode && existingCode.length > 0) {
        throw new Error("Este código ya está en uso");
      }

      // Create the student
      const { data: student, error: studentError } = await supabase
        .from("students")
        .insert([{
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          email: newStudent.email
        }])
        .select()
        .single();

      if (studentError) throw studentError;

      // Create the permanent code
      const { error: permanentCodeError } = await supabase
        .from("permanent_student_codes")
        .insert([{
          code: newStudent.code,
          student_id: student.id,
          is_assigned: true
        }]);

      if (permanentCodeError) throw permanentCodeError;

      return student;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante agregado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error adding student:", error);
      toast.error(error.message || "No se pudo agregar el estudiante");
    },
  });

  const updateStudent = useMutation({
    mutationFn: async ({ id, ...updateData }: StudentFormData & { id: string }) => {
      // Update student data
      const { data: student, error: studentError } = await supabase
        .from("students")
        .update({
          first_name: updateData.first_name,
          last_name: updateData.last_name,
          email: updateData.email
        })
        .eq("id", id)
        .select()
        .single();

      if (studentError) throw studentError;

      // Update or create permanent code if provided
      if (updateData.code) {
        const { error: codeError } = await supabase
          .from("permanent_student_codes")
          .upsert({
            code: updateData.code,
            student_id: id,
            is_assigned: true
          });

        if (codeError) throw codeError;
      }

      return student;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante actualizado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error updating student:", error);
      toast.error("No se pudo actualizar el estudiante");
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      // Delete permanent code first
      const { error: codeError } = await supabase
        .from("permanent_student_codes")
        .delete()
        .eq("student_id", id);

      if (codeError) throw codeError;

      // Delete student
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante eliminado exitosamente");
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      toast.error("No se pudo eliminar el estudiante");
    },
  });

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};