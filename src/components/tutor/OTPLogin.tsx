import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyTutorOTP, markTutorOTPAsUsed } from "@/services/tutor/otp";

export const TutorOTPLogin = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      toast.error("Por favor ingresa un código OTP");
      return;
    }

    setIsLoading(true);

    try {
      const otpData = await verifyTutorOTP(otp.trim());
      
      // Marcar OTP como usado después de la verificación exitosa
      await markTutorOTPAsUsed(otpData.id);
      
      // Guardar información del tutor
      localStorage.setItem('tutorId', otpData.tutor_id);
      
      toast.success("Acceso concedido");
      navigate("/tutor/dashboard", { replace: true });
    } catch (error) {
      console.error('Error en el proceso de login del tutor:', error);
      toast.error("Código OTP inválido o ya utilizado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Acceso Tutor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Ingresa tu código OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="text-center text-2xl tracking-wider"
              disabled={isLoading}
              autoComplete="off"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !otp.trim()}
          >
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};