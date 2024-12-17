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
    console.log('Attempting login with OTP:', otp);

    try {
      const otpData = await verifyOTP(otp);
      console.log('OTP verification response:', otpData);
      
      if (!otpData || !otpData.students) {
        toast.error("Código OTP inválido");
        setIsLoading(false);
        return;
      }

      // Store the student data in localStorage
      localStorage.setItem('studentData', JSON.stringify(otpData.students));
      
      toast.success("Acceso concedido");
      navigate("/student/dashboard", { replace: true });
      
      // Mark OTP as used after successful login
      await markOTPAsUsed(otpData.id);
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      toast.error("Error al verificar el código OTP");
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