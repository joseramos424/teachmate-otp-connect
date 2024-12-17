import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentForm from "../StudentForm";
import type { Student } from "@/types/students";

interface StudentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any, selectedClasses: string[]) => void;
  selectedStudent: Student | null;
  selectedStudentClasses?: string[];
}

const StudentFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  selectedStudent,
  selectedStudentClasses = [],
}: StudentFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedStudent ? "Editar Estudiante" : "Agregar Nuevo Estudiante"}
          </DialogTitle>
        </DialogHeader>
        <StudentForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialData={selectedStudent || undefined}
          initialClasses={selectedStudentClasses}
          isEditing={!!selectedStudent}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;