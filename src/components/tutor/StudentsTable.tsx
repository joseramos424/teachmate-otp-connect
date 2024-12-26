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
import { useIsMobile } from "@/hooks/use-mobile";

type StudentsTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onAssignContent: (student: Student) => void;
};

const StudentsTable = ({ students, onEdit, onDelete, onAssignContent }: StudentsTableProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg border border-[#E5DEFF] p-4 space-y-3"
          >
            <div>
              <h3 className="font-medium text-[#1A1F2C]">
                {student.first_name} {student.last_name}
              </h3>
              <p className="text-sm text-[#8E9196]">{student.email}</p>
              <p className="text-xs text-[#8E9196]">
                Registrado: {new Date(student.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAssignContent(student)}
                className="hover:bg-[#E5DEFF] text-[#9b87f5] hover:text-[#7E69AB]"
              >
                <BookOpen className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(student)}
                className="hover:bg-[#E5DEFF] text-[#9b87f5] hover:text-[#7E69AB]"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(student)}
                className="hover:bg-red-50 text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F1F0FB]">
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Nombre</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Apellido</TableHead>
            <TableHead scope="col" className="font-semibold text-[#1A1F2C]">Email</TableHead>
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