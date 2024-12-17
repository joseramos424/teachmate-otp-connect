import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OTPForm } from "./OTPForm";
import { verifyOTP, markOTPAsUsed } from "@/services/student/otp";

export const OTPLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (otp: string) => {
    if (!otp) {
      toast.error("Por favor ingresa un código OTP");
      return;
    }

    setIsLoading(true);

    try {
      const otpData = await verifyOTP(otp);
      
      if (!otpData) {
        toast.error("Código OTP inválido o expirado");
        return;
      }

      await markOTPAsUsed(otpData.id);

      // Store the student data in localStorage
      const studentData = otpData.students;
      localStorage.setItem('studentData', JSON.stringify(studentData));
      
      toast.success("Acceso concedido");
      navigate("/student/dashboard", { replace: true });
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      if (error instanceof Error) {
        if (error.message.includes("0 rows") || error.message.includes("PGRST116")) {
          toast.error("Código OTP inválido o expirado");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Error al procesar la solicitud");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Acceso Estudiante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OTPForm onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};