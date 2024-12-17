import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import { UserPlus, Edit, Trash } from "lucide-react";

const Students = () => {
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

  if (isLoading) {
    return (
      <div className="p-8" role="status" aria-live="polite">
        Cargando estudiantes...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Estudiantes</h1>
        <Button aria-label="Agregar nuevo estudiante">
          <UserPlus className="mr-2" aria-hidden="true" />
          Agregar Estudiante
        </Button>
      </div>

      <div className="bg-background rounded-lg shadow" role="region" aria-label="Lista de estudiantes">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Nombre</TableHead>
              <TableHead scope="col">Apellido</TableHead>
              <TableHead scope="col">Email</TableHead>
              <TableHead scope="col">Fecha de Registro</TableHead>
              <TableHead className="text-right" scope="col">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {new Date(student.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    aria-label={`Editar estudiante ${student.first_name} ${student.last_name}`}
                  >
                    <Edit className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/90"
                    aria-label={`Eliminar estudiante ${student.first_name} ${student.last_name}`}
                  >
                    <Trash className="h-4 w-4" aria-hidden="true" />
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

export default Students;