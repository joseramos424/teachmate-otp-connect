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
    console.log('Intentando login con OTP:', otp);

    try {
      const otpData = await verifyOTP(otp);
      console.log('Respuesta de verificación OTP:', otpData);
      
      if (!otpData || !otpData.students) {
        toast.error("Código OTP inválido o ya utilizado");
        setIsLoading(false);
        return;
      }

      localStorage.setItem('studentData', JSON.stringify(otpData.students));
      await markOTPAsUsed(otpData.id);
      
      toast.success("Acceso concedido");
      navigate("/student/dashboard", { replace: true });
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      toast.error("Código OTP inválido o ya utilizado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[400px] shadow-sm border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-center">
          Acceso Estudiante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OTPForm onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};