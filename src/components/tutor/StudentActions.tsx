import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { assignOTP } from "@/services/student/otp";
import type { Student } from "@/types/students";

interface StudentActionsProps {
  student: Student;
}

const StudentActions = ({ student }: StudentActionsProps) => {
  const { toast } = useToast();

  const handleGenerateOTP = async () => {
    try {
      const otpData = await assignOTP(student.id);
      toast({
        title: "Código generado",
        description: `El código de acceso es: ${otpData.code}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el código de acceso",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleGenerateOTP} variant="outline" size="sm">
        Generar código de acceso
      </Button>
    </div>
  );
};

export default StudentActions;