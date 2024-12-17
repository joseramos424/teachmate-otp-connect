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
  onDelete?: (classItem: Class) => void;
};

const ClassesTable = ({ classes, onEdit, onDelete }: ClassesTableProps) => {
  return (
    <div className="bg-background rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Estudiantes</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow key={classItem.id}>
              <TableCell>{classItem.name}</TableCell>
              <TableCell>{classItem.description}</TableCell>
              <TableCell>
                <ClassStudentsList classId={classItem.id} />
              </TableCell>
              <TableCell>
                {new Date(classItem.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(classItem)}
                  aria-label={`Editar ${classItem.name}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(classItem)}
                    aria-label={`Eliminar ${classItem.name}`}
                  >
                    <Trash className="h-4 w-4" />
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

export default ClassesTable;