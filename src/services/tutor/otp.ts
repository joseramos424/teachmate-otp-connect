import { supabase } from "@/integrations/supabase/client";

export const verifyTutorOTP = async (otp: string) => {
  console.log('Verificando código OTP de tutor:', otp);
  
  // Primero obtenemos los datos sin usar single()
  const { data: otpResults, error: otpError } = await supabase
    .from("tutor_otp_codes")
    .select()
    .eq("code", otp)
    .eq("used", false);

  if (otpError) {
    console.error('Error al verificar OTP del tutor:', otpError);
    throw new Error("Error al verificar el código OTP");
  }

  // Verificamos si tenemos resultados
  if (!otpResults || otpResults.length === 0) {
    console.error('No se encontró el código OTP del tutor o ya fue utilizado');
    throw new Error("Código OTP inválido o ya utilizado");
  }

  const otpData = otpResults[0];
  console.log('OTP de tutor válido:', otpData);
  return otpData;
};

export const markTutorOTPAsUsed = async (otpId: string) => {
  console.log('Marcando OTP de tutor como usado:', otpId);
  
  const { error: updateError } = await supabase
    .from("tutor_otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (updateError) {
    console.error('Error al marcar OTP de tutor como usado:', updateError);
    throw new Error("Error al procesar el código");
  }

  console.log('OTP de tutor marcado como usado exitosamente');
};