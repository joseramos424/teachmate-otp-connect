import { supabase } from "@/integrations/supabase/client";

export const verifyOTP = async (otp: string) => {
  console.log('Verificando código OTP de estudiante:', otp);
  
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
    console.error('Error al verificar OTP:', otpError);
    throw new Error("Código OTP inválido");
  }

  if (!otpData) {
    console.error('No se encontró el código OTP');
    throw new Error("Código OTP no encontrado");
  }

  if (!otpData.students) {
    console.error('No se encontró el estudiante asociado al código OTP');
    throw new Error("Estudiante no encontrado");
  }

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