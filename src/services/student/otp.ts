import { supabase } from "@/integrations/supabase/client";

export const verifyOTP = async (otp: string) => {
  console.log('Verificando código OTP de estudiante:', otp);
  
  // Primero obtenemos los datos sin usar single()
  const { data: otpResults, error: otpError } = await supabase
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
    .eq("used", false);

  if (otpError) {
    console.error('Error al verificar OTP:', otpError);
    throw new Error("Error al verificar el código OTP");
  }

  // Verificamos si tenemos resultados
  if (!otpResults || otpResults.length === 0) {
    console.error('No se encontró el código OTP o ya fue utilizado');
    throw new Error("Código OTP inválido o ya utilizado");
  }

  const otpData = otpResults[0];
  console.log('OTP válido, datos del estudiante:', otpData.students);
  return otpData;
};

export const markOTPAsUsed = async (otpId: string) => {
  console.log('Marcando OTP como usado:', otpId);
  
  const { error: updateError } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (updateError) {
    console.error('Error al marcar OTP como usado:', updateError);
    throw new Error("Error al procesar el código");
  }

  console.log('OTP marcado como usado exitosamente');
};