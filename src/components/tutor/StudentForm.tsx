import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClassSelection from "./ClassSelection";

type StudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

type StudentFormProps = {
  onSubmit: (data: StudentFormData, selectedClasses: string[]) => void;
  onCancel: () => void;
  initialData?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  initialClasses?: string[];
  isEditing?: boolean;
};

const StudentForm = ({ onSubmit, onCancel, initialData, initialClasses = [], isEditing }: StudentFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    defaultValues: initialData,
  });
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>(initialClasses);

  const handleClassSelect = (classId: string) => {
    setSelectedClasses((prev) => {
      if (prev.includes(classId)) {
        return prev.filter((id) => id !== classId);
      }
      return [...prev, classId];
    });
  };

  const handleFormSubmit = (data: StudentFormData) => {
    onSubmit(data, selectedClasses);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first_name">Nombre</Label>
        <Input
          id="first_name"
          {...register("first_name", { required: "El nombre es requerido" })}
          placeholder="Ingrese el nombre"
          aria-invalid={errors.first_name ? "true" : "false"}
        />
        {errors.first_name && (
          <p className="text-sm text-destructive">{errors.first_name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="last_name">Apellido</Label>
        <Input
          id="last_name"
          {...register("last_name", { required: "El apellido es requerido" })}
          placeholder="Ingrese el apellido"
          aria-invalid={errors.last_name ? "true" : "false"}
        />
        {errors.last_name && (
          <p className="text-sm text-destructive">{errors.last_name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { 
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })}
          placeholder="Ingrese el email"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <ClassSelection 
        selectedClasses={selectedClasses}
        onClassSelect={handleClassSelect}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Guardar Cambios" : "Guardar"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;