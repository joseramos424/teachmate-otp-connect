import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type StudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addStudent = useMutation({
    mutationFn: async (newStudent: StudentFormData) => {
      const { data, error } = await supabase
        .from("students")
        .insert([newStudent])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast("Estudiante agregado", {
        description: "El estudiante ha sido agregado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error adding student:", error);
      toast("Error", {
        description: "No se pudo agregar el estudiante. Por favor intente nuevamente.",
      });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async ({ id, ...updateData }: StudentFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("students")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast("Estudiante actualizado", {
        description: "El estudiante ha sido actualizado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
      toast("Error", {
        description: "No se pudo actualizar el estudiante. Por favor intente nuevamente.",
      });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      // First delete related records in students_classes
      const { error: relationsError } = await supabase
        .from("students_classes")
        .delete()
        .eq("student_id", id);

      if (relationsError) throw relationsError;

      // Then delete the student
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast("Estudiante eliminado", {
        description: "El estudiante ha sido eliminado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      toast("Error", {
        description: "No se pudo eliminar el estudiante. Por favor intente nuevamente.",
      });
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