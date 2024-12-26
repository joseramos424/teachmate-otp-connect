import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useTutorAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOTP = async (otp: string) => {
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

  return {
    isLoading,
    verifyOTP
  };
};