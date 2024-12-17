import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import StudentActions from "./StudentActions";
import type { Student } from "@/types/students";

type StudentsTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete?: (student: Student) => void;
};

const StudentsTable = ({ students, onEdit, onDelete }: StudentsTableProps) => {
  return (
    <div className="bg-background rounded-lg shadow" role="region" aria-label="Lista de estudiantes">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Nombre</TableHead>
            <TableHead scope="col">Apellido</TableHead>
            <TableHead scope="col">Email</TableHead>
            <TableHead scope="col">Fecha de Registro</TableHead>
            <TableHead scope="col">Acciones OTP</TableHead>
            <TableHead className="text-right" scope="col">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                {new Date(student.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StudentActions student={student} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2"
                  onClick={() => onEdit(student)}
                  aria-label={`Editar estudiante ${student.first_name} ${student.last_name}`}
                >
                  <Edit className="h-4 w-4" aria-hidden="true" />
                </Button>
                {onDelete && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => onDelete(student)}
                    aria-label={`Eliminar estudiante ${student.first_name} ${student.last_name}`}
                  >
                    <Trash className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;