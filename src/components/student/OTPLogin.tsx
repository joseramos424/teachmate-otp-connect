import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const OTPLogin = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting to verify OTP:', otp);
      
      // Fetch OTP code and related student information
      const { data: otpData, error: otpError } = await supabase
        .from("otp_codes")
        .select(`
          *,
          students (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq("code", otp)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (otpError) {
        console.error('Error verificando OTP:', otpError);
        toast.error("Código OTP inválido o expirado");
        return;
      }

      if (!otpData || !otpData.students) {
        console.log('No valid OTP found or no student data');
        toast.error("Código OTP inválido o estudiante no encontrado");
        return;
      }

      console.log('Valid OTP found with student data:', otpData);

      // Marcar el código como usado
      const { error: updateError } = await supabase
        .from("otp_codes")
        .update({ used: true })
        .eq("id", otpData.id);

      if (updateError) {
        console.error('Error actualizando OTP:', updateError);
        toast.error("Error al procesar el código");
        return;
      }

      // Store student information in localStorage
      localStorage.setItem('studentData', JSON.stringify(otpData.students));

      toast.success("Acceso concedido");
      navigate("/student/dashboard");
    } catch (error) {
      console.error('Error general:', error);
      toast.error("Error al procesar la solicitud");
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
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};