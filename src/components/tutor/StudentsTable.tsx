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
import { Edit, Trash, BookOpen } from "lucide-react";
import { Student } from "@/types/student";

type StudentsTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onAssignContent: (student: Student) => void;
};

const StudentsTable = ({ students, onEdit, onDelete, onAssignContent }: StudentsTableProps) => {
  return (
    <div 
      className="overflow-x-auto" 
      role="region" 
      aria-label="Lista de estudiantes"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F1F0FB]">
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Nombre</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Apellido</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Email</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Código de Acceso</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Fecha de Registro</TableHead>
            <TableHead className="text-right font-semibold text-[#1A1F2C]" scope="col">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow 
              key={student.id}
              className="hover:bg-[#F6F6F7] transition-colors duration-200"
            >
              <TableCell className="font-medium text-[#1A1F2C]">{student.first_name}</TableCell>
              <TableCell className="text-[#1A1F2C]">{student.last_name}</TableCell>
              <TableCell className="text-[#8E9196]">{student.email}</TableCell>
              <TableCell className="text-[#8E9196]">{student.code || "No asignado"}</TableCell>
              <TableCell className="text-[#8E9196]">
                {new Date(student.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-[#E5DEFF] text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
                  onClick={() => onAssignContent(student)}
                  aria-label={`Asignar contenido a ${student.first_name} ${student.last_name}`}
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-[#E5DEFF] text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
                  onClick={() => onEdit(student)}
                  aria-label={`Editar estudiante ${student.first_name} ${student.last_name}`}
                >
                  <Edit className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                  onClick={() => onDelete(student)}
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
  );
};

export default StudentsTable;