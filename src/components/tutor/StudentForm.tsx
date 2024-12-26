import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student, StudentFormData } from "@/types/student";

type StudentFormProps = {
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  initialData?: Student;
  isEditing?: boolean;
};

const StudentForm = ({ onSubmit, onCancel, initialData, isEditing }: StudentFormProps) => {
  const { register, handleSubmit } = useForm<StudentFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="block">Nombre</Label>
          <Input
            id="first_name"
            {...register("first_name", { required: true })}
            placeholder="Ingrese el nombre"
            aria-required="true"
            aria-invalid={false}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="block">Apellido</Label>
          <Input
            id="last_name"
            {...register("last_name", { required: true })}
            placeholder="Ingrese el apellido"
            aria-required="true"
            aria-invalid={false}
            className="w-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="block">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="Ingrese el email"
          aria-required="true"
          aria-invalid={false}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="code" className="block">Código de Acceso</Label>
        <Input
          id="code"
          {...register("code", { required: true })}
          placeholder="Ingrese el código de acceso"
          maxLength={6}
          aria-required="true"
          aria-invalid={false}
          aria-describedby="code-description"
          className="w-full"
        />
        <span id="code-description" className="sr-only">
          El código de acceso debe tener 6 caracteres
        </span>
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="w-full sm:w-auto"
          aria-label="Cancelar formulario"
        >
          Cancelar
        </Button>
        <Button 
          type="submit"
          className="w-full sm:w-auto"
          aria-label={isEditing ? "Guardar cambios del estudiante" : "Guardar nuevo estudiante"}
        >
          {isEditing ? "Guardar Cambios" : "Guardar"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;