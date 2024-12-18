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
      toast({
        title: "Estudiante agregado",
        description: "El estudiante ha sido agregado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description: "No se pudo agregar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
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
      toast({
        title: "Estudiante actualizado",
        description: "El estudiante ha sido actualizado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    students,
    isLoading,
    addStudent,
    updateStudent,
  };
};