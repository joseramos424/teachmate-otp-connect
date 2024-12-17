import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Student } from "@/types/students";

export const useStudentMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addStudentMutation = useMutation({
    mutationFn: async ({ studentData, classIds }: { studentData: any; classIds: string[] }) => {
      // 1. Crear el estudiante
      const { data: newStudent, error: studentError } = await supabase
        .from("students")
        .insert([studentData])
        .select()
        .single();

      if (studentError) throw studentError;

      // 2. Obtener un código OTP disponible
      const { data: availableOTP, error: otpError } = await supabase
        .from("available_otp_codes")
        .select("*")
        .eq("is_assigned", false)
        .limit(1)
        .single();

      if (otpError) {
        console.error("Error getting available OTP:", otpError);
        throw otpError;
      }

      // 3. Crear el registro en otp_codes
      const { error: assignError } = await supabase
        .from("otp_codes")
        .insert([{
          code: availableOTP.code,
          student_id: newStudent.id,
          available_otp_id: availableOTP.id
        }]);

      if (assignError) throw assignError;

      // 4. Marcar el código como asignado
      const { error: updateError } = await supabase
        .from("available_otp_codes")
        .update({ is_assigned: true })
        .eq("id", availableOTP.id);

      if (updateError) throw updateError;

      // 5. Asignar clases si existen
      if (classIds.length > 0) {
        const classesData = classIds.map(classId => ({
          student_id: newStudent.id,
          class_id: classId,
        }));

        const { error: classesError } = await supabase
          .from("students_classes")
          .insert(classesData);

        if (classesError) throw classesError;
      }

      return { ...newStudent, otpCode: availableOTP.code };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Estudiante agregado",
        description: `El estudiante ha sido agregado exitosamente. Código OTP: ${data.otpCode}`,
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

  const updateStudentMutation = useMutation({
    mutationFn: async ({ id, data, classIds }: { id: string; data: any; classIds: string[] }) => {
      const { error: studentError } = await supabase
        .from("students")
        .update(data)
        .eq("id", id);

      if (studentError) throw studentError;

      const { error: deleteError } = await supabase
        .from("students_classes")
        .delete()
        .eq("student_id", id);

      if (deleteError) throw deleteError;

      if (classIds.length > 0) {
        const classesData = classIds.map(classId => ({
          student_id: id,
          class_id: classId,
        }));

        const { error: classesError } = await supabase
          .from("students_classes")
          .insert(classesData);

        if (classesError) throw classesError;
      }
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

  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      // Primero, obtener el OTP code asociado
      const { data: otpData } = await supabase
        .from("otp_codes")
        .select("available_otp_id")
        .eq("student_id", studentId)
        .single();

      if (otpData) {
        // Marcar el código OTP como no asignado
        await supabase
          .from("available_otp_codes")
          .update({ is_assigned: false })
          .eq("id", otpData.available_otp_id);

        // Eliminar el registro de otp_codes
        await supabase
          .from("otp_codes")
          .delete()
          .eq("student_id", studentId);
      }

      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", studentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Estudiante eliminado",
        description: "El estudiante ha sido eliminado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    addStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
  };
};