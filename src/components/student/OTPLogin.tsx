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
      
      if (!otpData || !otpData.students) {
        toast.error("Error al verificar el código OTP");
        return;
      }

      await markOTPAsUsed(otpData.id);

      // Guardar los datos del estudiante en localStorage
      localStorage.setItem('studentData', JSON.stringify(otpData.students));
      
      toast.success("Acceso concedido");
      
      // Asegurarnos de que la navegación se ejecute
      console.log('Redirigiendo a dashboard...');
      navigate("/student/dashboard", { replace: true });
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      toast.error(error instanceof Error ? error.message : "Error al procesar la solicitud");
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