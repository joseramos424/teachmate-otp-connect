import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const TutorOTPLogin = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for predefined tutor code first
      if (otp.toUpperCase() === "TUTOR1") {
        toast.success("Acceso concedido como Tutor1");
        navigate("/tutor/dashboard");
        return;
      }

      console.log('Attempting to verify Tutor OTP:', otp);
      
      const { data, error } = await supabase
        .from("tutor_otp_codes")
        .select()
        .eq("code", otp)
        .eq("used", false);

      if (error) {
        console.error('Error verificando OTP:', error);
        toast.error("Error al verificar el código");
        return;
      }

      console.log('Tutor OTP verification response:', data);

      if (!data || data.length === 0) {
        console.log('No valid Tutor OTP found');
        toast.error("Código OTP inválido");
        return;
      }

      const otpCode = data[0];
      console.log('Valid Tutor OTP found:', otpCode);

      const { error: updateError } = await supabase
        .from("tutor_otp_codes")
        .update({ used: true })
        .eq("id", otpCode.id);

      if (updateError) {
        console.error('Error actualizando OTP:', updateError);
        toast.error("Error al procesar el código");
        return;
      }

      toast.success("Acceso concedido");
      navigate("/tutor/dashboard");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-[#1A1F2C]">
          Acceso Tutor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-label="Formulario de acceso tutor"
        >
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Ingresa tu código OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="text-center text-2xl tracking-wider bg-[#F6F6F7] border-[#E5DEFF] focus:border-[#9b87f5] focus:ring-[#9b87f5]"
              disabled={isLoading}
              aria-label="Código OTP"
              aria-required="true"
              aria-invalid={false}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};