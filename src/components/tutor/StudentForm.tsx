import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

type StudentFormProps = {
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  initialData?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  isEditing?: boolean;
};

const StudentForm = ({ onSubmit, onCancel, initialData, isEditing }: StudentFormProps) => {
  const { register, handleSubmit } = useForm<StudentFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first_name">Nombre</Label>
        <Input
          id="first_name"
          {...register("first_name", { required: true })}
          placeholder="Ingrese el nombre"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last_name">Apellido</Label>
        <Input
          id="last_name"
          {...register("last_name", { required: true })}
          placeholder="Ingrese el apellido"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="Ingrese el email"
        />
      </div>
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