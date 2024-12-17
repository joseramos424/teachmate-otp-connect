import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Book, Edit, Trash, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClassFormData = {
  name: string;
  description: string;
  selectedStudents: string[];
};

const Classes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<ClassFormData>();

  const { data: classes, isLoading: isLoadingClasses } = useQuery({
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

  const addClassMutation = useMutation({
    mutationFn: async (newClass: ClassFormData) => {
      // First create the class
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .insert([{ name: newClass.name, description: newClass.description }])
        .select()
        .single();

      if (classError) throw classError;

      // Then create the student-class relationships
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
      setIsDialogOpen(false);
      setSelectedStudents([]);
      reset();
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

  const onSubmit = (data: ClassFormData) => {
    addClassMutation.mutate({ ...data, selectedStudents });
  };

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }
      return [...prev, studentId];
    });
  };

  if (isLoadingClasses || isLoadingStudents) {
    return (
      <div className="p-8" role="status" aria-live="polite">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Clases</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button aria-label="Crear nueva clase">
              <Book className="mr-2" aria-hidden="true" />
              Crear Clase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Clase</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <div
                      key={student.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelection(student.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`student-${student.id}`}
                        className="text-sm"
                      >
                        {student.first_name} {student.last_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes?.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.description}</TableCell>
                <TableCell>
                  {new Date(classItem.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Editar ${classItem.name}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Eliminar ${classItem.name}`}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Classes;