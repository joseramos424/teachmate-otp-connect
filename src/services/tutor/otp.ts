import { supabase } from "@/integrations/supabase/client";

export const verifyTutorOTP = async (otp: string) => {
  console.log('Verificando código OTP de tutor:', otp);
  
  const { data: otpData, error } = await supabase
    .from("tutor_otp_codes")
    .select("*")
    .eq("code", otp)
    .eq("used", false)
    .single();

  if (error) {
    console.error('Error al verificar OTP del tutor:', error);
    throw new Error("Código OTP inválido o ya utilizado");
  }

  if (!otpData) {
    throw new Error("Código OTP inválido o ya utilizado");
  }

  return otpData;
};

export const markTutorOTPAsUsed = async (otpId: string) => {
  console.log('Marcando OTP de tutor como usado:', otpId);
  
  const { error } = await supabase
    .from("tutor_otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (error) {
    console.error('Error al marcar OTP de tutor como usado:', error);
    throw new Error("Error al procesar el código");
  }
};