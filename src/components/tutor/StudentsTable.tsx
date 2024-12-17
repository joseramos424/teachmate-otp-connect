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
import { Edit2, Trash2 } from "lucide-react";
import type { Student } from "@/types/students";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentsTable = ({ students, onEdit, onDelete }: StudentsTableProps) => {
  // Obtener los códigos OTP de los estudiantes
  const { data: otpCodes } = useQuery({
    queryKey: ["student-otp-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("otp_codes")
        .select("code, student_id")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.reduce((acc: Record<string, string>, curr) => {
        acc[curr.student_id] = curr.code;
        return acc;
      }, {});
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Código OTP</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{otpCodes?.[student.id] || "No asignado"}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(student)}
                  aria-label="Editar estudiante"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(student)}
                  aria-label="Eliminar estudiante"
                >
                  <Trash2 className="h-4 w-4" />
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