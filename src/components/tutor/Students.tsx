import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useStudents, Student, StudentFormData } from "@/hooks/useStudents";
import StudentsTable from "./StudentsTable";
import StudentDialog from "./StudentDialog";
import AssignContentDialog from "./AssignContentDialog";

const Students = () => {
  const { students, isLoading, addStudent, updateStudent, deleteStudent } = useStudents();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAssignContentDialogOpen, setIsAssignContentDialogOpen] = React.useState(false);
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

  const handleDelete = (student: Student) => {
    if (window.confirm(`¿Está seguro de eliminar al estudiante ${student.first_name} ${student.last_name}?`)) {
      deleteStudent.mutate(student.id);
    }
  };

  const handleAssignContent = (student: Student) => {
    setSelectedStudent(student);
    setIsAssignContentDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleAssignContentDialogClose = () => {
    setIsAssignContentDialogOpen(false);
    setSelectedStudent(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
        <div className="text-lg text-primary">Cargando estudiantes...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-[#F6F6F7] to-[#E5DEFF] rounded-lg p-8 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">Estudiantes</h1>
            <p className="text-[#8E9196]">
              Gestiona tus estudiantes y asigna contenido personalizado
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Agregar nuevo estudiante"
          >
            <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
            Agregar Estudiante
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#F1F0FB] overflow-hidden">
        <StudentsTable 
          students={students || []} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onAssignContent={handleAssignContent}
        />
      </div>

      <StudentDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        selectedStudent={selectedStudent || undefined}
      />

      <AssignContentDialog
        isOpen={isAssignContentDialogOpen}
        onClose={handleAssignContentDialogClose}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students;