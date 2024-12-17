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
    setIsLoading(true);

    try {
      console.log('Verificando código OTP:', otp);
      const otpData = await verifyOTP(otp);
      
      console.log('Código OTP válido, datos del estudiante:', otpData);
      await markOTPAsUsed(otpData.id);

      localStorage.setItem('studentData', JSON.stringify(otpData.students));
      
      toast.success("Acceso concedido");
      navigate("/student/dashboard");
    } catch (error) {
      console.error('Error:', error);
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