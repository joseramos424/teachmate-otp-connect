import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useStudents, Student, StudentFormData } from "@/hooks/useStudents";
import StudentsTable from "./StudentsTable";
import StudentDialog from "./StudentDialog";

const Students = () => {
  const { students, isLoading, addStudent, updateStudent } = useStudents();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  const handleSubmit = (data: StudentFormData) => {
    if (selectedStudent) {
      updateStudent.mutate({ ...data, id: selectedStudent.id });
    } else {
      addStudent.mutate(data);
    }
    handleDialogClose();
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

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
        <Button
          onClick={() => setIsDialogOpen(true)}
          aria-label="Agregar nuevo estudiante"
        >
          <UserPlus className="mr-2" aria-hidden="true" />
          Agregar Estudiante
        </Button>
      </div>

      <StudentsTable students={students || []} onEdit={handleEdit} />

      <StudentDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        selectedStudent={selectedStudent || undefined}
      />
    </div>
  );
};

export default Students;