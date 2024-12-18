import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Student, StudentFormData } from "@/types/student";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "@/api/students";

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const addStudent = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante agregado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error adding student:", error);
      toast.error(error.message || "No se pudo agregar el estudiante");
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, ...data }: StudentFormData & { id: string }) => 
      updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante actualizado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error updating student:", error);
      toast.error("No se pudo actualizar el estudiante");
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante eliminado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error deleting student:", error);
      toast.error("No se pudo eliminar el estudiante");
    },
  });

  return {
    students,
    isLoading,
    addStudent,
    updateStudent: updateStudentMutation,
    deleteStudent: deleteStudentMutation,
  };
};

export type { Student, StudentFormData };