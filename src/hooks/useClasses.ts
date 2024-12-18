import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ClassFormData = {
  name: string;
  description: string;
};

export const useClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addClassMutation = useMutation({
    mutationFn: async ({
      formData,
      selectedStudents,
    }: {
      formData: ClassFormData;
      selectedStudents: string[];
    }) => {
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .insert([{ name: formData.name, description: formData.description }])
        .select()
        .single();

      if (classError) throw classError;

      if (selectedStudents.length > 0) {
        const studentClassRelations = selectedStudents.map((studentId) => ({
          student_id: studentId,
          class_id: classData.id,
        }));

        const { error: relationError } = await supabase
          .from("students_classes")
          .insert(studentClassRelations);

        if (relationError) throw relationError;
      }

      return classData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast("Clase creada exitosamente");
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      toast("Error al crear la clase");
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: async ({
      classId,
      formData,
      selectedStudents,
    }: {
      classId: string;
      formData: ClassFormData;
      selectedStudents: string[];
    }) => {
      const { error: updateError } = await supabase
        .from("classes")
        .update({ name: formData.name, description: formData.description })
        .eq("id", classId);

      if (updateError) throw updateError;

      const { error: deleteError } = await supabase
        .from("students_classes")
        .delete()
        .eq("class_id", classId);

      if (deleteError) throw deleteError;

      if (selectedStudents.length > 0) {
        const studentClassRelations = selectedStudents.map((studentId) => ({
          student_id: studentId,
          class_id: classId,
        }));

        const { error: relationError } = await supabase
          .from("students_classes")
          .insert(studentClassRelations);

        if (relationError) throw relationError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast("Clase actualizada exitosamente");
    },
    onError: (error) => {
      console.error("Error updating class:", error);
      toast("Error al actualizar la clase");
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (classId: string) => {
      // First delete related records in students_classes
      const { error: relationsError } = await supabase
        .from("students_classes")
        .delete()
        .eq("class_id", classId);

      if (relationsError) throw relationsError;

      // Then delete the class
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", classId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast("Clase eliminada exitosamente");
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
      toast("Error al eliminar la clase");
    },
  });

  return {
    classes,
    isLoading,
    addClassMutation,
    updateClassMutation,
    deleteClassMutation,
  };
};