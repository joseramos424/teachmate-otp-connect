import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ClassFormData = {
  name: string;
  description: string;
};

export const useClassMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      toast({
        title: "Clase creada",
        description: "La clase ha sido creada exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la clase. Por favor intente nuevamente.",
        variant: "destructive",
      });
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
      toast({
        title: "Clase actualizada",
        description: "La clase ha sido actualizada exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error updating class:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la clase. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    addClassMutation,
    updateClassMutation,
  };
};