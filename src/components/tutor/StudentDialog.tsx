import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentForm from "./StudentForm";
import { Student, StudentFormData } from "@/hooks/useStudents";

type StudentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
  selectedStudent?: Student;
};

const StudentDialog = ({
  isOpen,
  onClose,
  onSubmit,
  selectedStudent,
}: StudentDialogProps) => {
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
          initialData={selectedStudent}
          isEditing={!!selectedStudent}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;