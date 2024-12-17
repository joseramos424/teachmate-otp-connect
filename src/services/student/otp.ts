import { supabase } from "@/integrations/supabase/client";

export const generateOTP = () => {
  // Genera un código OTP de 6 dígitos
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const assignOTP = async (studentId: string) => {
  const code = generateOTP();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24); // El código expira en 24 horas

  const { data, error } = await supabase
    .from("otp_codes")
    .insert({
      code,
      student_id: studentId,
      expires_at: expirationDate.toISOString(),
      used: false
    })
    .select()
    .single();

  if (error) {
    console.error('Error al asignar OTP:', error);
    throw new Error("Error al generar el código de acceso");
  }

  return data;
};

export const verifyOTP = async (otp: string) => {
  console.log('Verificando código OTP de estudiante:', otp);
  
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
    .eq("used", false)
    .gt("expires_at", new Date().toISOString()); // Verifica que no haya expirado

  if (otpError) {
    console.error('Error al verificar OTP:', otpError);
    throw new Error("Error al verificar el código OTP");
  }

  if (!otpResults || otpResults.length === 0) {
    console.error('No se encontró el código OTP o ya fue utilizado');
    throw new Error("Código OTP inválido, expirado o ya utilizado");
  }

  return otpResults[0];
};

export const markOTPAsUsed = async (otpId: string) => {
  const { error } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (error) {
    console.error('Error al marcar OTP como usado:', error);
    throw new Error("Error al actualizar el estado del código OTP");
  }
};