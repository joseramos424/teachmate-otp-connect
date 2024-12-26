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
import ClassStudentsList from "./ClassStudentsList";

type Class = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

type ClassesTableProps = {
  classes: Class[];
  onEdit: (classItem: Class) => void;
  onDelete: (classItem: Class) => void;
};

const ClassesTable = ({ classes, onEdit, onDelete }: ClassesTableProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7] hover:bg-[#F6F6F7]">
            <TableHead className="text-[#1A1F2C] font-semibold">Nombre</TableHead>
            <TableHead className="text-[#1A1F2C] font-semibold">Descripción</TableHead>
            <TableHead className="text-[#1A1F2C] font-semibold">Estudiantes</TableHead>
            <TableHead className="text-[#1A1F2C] font-semibold">Fecha de Creación</TableHead>
            <TableHead className="text-right text-[#1A1F2C] font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow 
              key={classItem.id}
              className="hover:bg-[#E5DEFF]/10 transition-colors"
            >
              <TableCell className="font-medium text-[#1A1F2C]">{classItem.name}</TableCell>
              <TableCell className="text-[#8E9196]">{classItem.description}</TableCell>
              <TableCell>
                <ClassStudentsList classId={classItem.id} />
              </TableCell>
              <TableCell className="text-[#8E9196]">
                {new Date(classItem.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(classItem)}
                  aria-label={`Editar ${classItem.name}`}
                  className="mr-2 hover:bg-[#E5DEFF] hover:text-[#9b87f5]"
                >
                  <Edit className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(classItem)}
                  aria-label={`Eliminar ${classItem.name}`}
                  className="hover:bg-red-50 hover:text-red-500"
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

export default ClassesTable;