import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ClassFormData = {
  name: string;
  description: string;
};

type CreateClassFormProps = {
  onSubmit: (data: ClassFormData, selectedStudents: string[]) => void;
  onCancel: () => void;
};

const CreateClassForm = ({ onSubmit, onCancel }: CreateClassFormProps) => {
  const { register, handleSubmit } = useForm<ClassFormData>();
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);

  const { data: students, isLoading: isLoadingStudents } = useQuery({
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

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }
      return [...prev, studentId];
    });
  };

  const handleFormSubmit = (data: ClassFormData) => {
    onSubmit(data, selectedStudents);
  };

  if (isLoadingStudents) {
    return <div>Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la Clase</Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          placeholder="Ingrese el nombre de la clase"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Ingrese una descripción de la clase"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label>Estudiantes</Label>
        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
          {students?.map((student) => (
            <div key={student.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`student-${student.id}`}
                checked={selectedStudents.includes(student.id)}
                onChange={() => handleStudentSelection(student.id)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`student-${student.id}`} className="text-sm">
                {student.first_name} {student.last_name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};

export default CreateClassForm;