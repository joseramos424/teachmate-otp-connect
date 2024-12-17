import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const verifyOTP = async (otp: string) => {
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
    .single();

  if (otpError) {
    console.error('Error verificando OTP:', otpError);
    throw new Error("Código OTP inválido");
  }

  if (!otpData || !otpData.students) {
    console.log('No se encontró el código OTP o el estudiante');
    throw new Error("Código OTP inválido o estudiante no encontrado");
  }

  return otpData;
};

export const markOTPAsUsed = async (otpId: string) => {
  const { error: updateError } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (updateError) {
    console.error('Error actualizando OTP:', updateError);
    throw new Error("Error al procesar el código");
  }
};