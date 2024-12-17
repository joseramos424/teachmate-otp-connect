import { supabase } from "@/integrations/supabase/client";

export const verifyOTP = async (otp: string) => {
  console.log('Verificando OTP:', otp);
  
  try {
    const { data, error } = await supabase
      .from("otp_codes")
      .select(`
        id,
        code,
        student_id,
        students (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq("code", otp)
      .eq("used", false)
      .maybeSingle(); // Cambiamos single() por maybeSingle()

    if (error) {
      console.error('Error verificando OTP:', error);
      throw new Error("Error al verificar el código OTP");
    }

    if (!data) {
      console.log('No se encontró OTP válido');
      throw new Error("Código OTP inválido o ya utilizado");
    }

    console.log('Resultado de verificación OTP:', data);
    return data;
  } catch (error) {
    console.error('Error en verifyOTP:', error);
    throw error;
  }
};

export const markOTPAsUsed = async (otpId: string) => {
  console.log('Marcando OTP como usado:', otpId);
  
  const { error } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (error) {
    console.error('Error marcando OTP como usado:', error);
    throw error;
  }
};

export const assignOTP = async (studentId: string) => {
  const { data: availableOTP, error: fetchError } = await supabase
    .from("available_otp_codes")
    .select("*")
    .eq("is_assigned", false)
    .limit(1)
    .single();

  if (fetchError) {
    console.error('Error obteniendo OTP disponible:', fetchError);
    throw fetchError;
  }

  if (!availableOTP) {
    throw new Error("No hay códigos OTP disponibles");
  }

  const { data: otpCode, error: createError } = await supabase
    .from("otp_codes")
    .insert({
      code: availableOTP.code,
      student_id: studentId,
      available_otp_id: availableOTP.id,
      used: false
    })
    .select()
    .single();

  if (createError) {
    console.error('Error creando código OTP:', createError);
    throw createError;
  }

  const { error: updateError } = await supabase
    .from("available_otp_codes")
    .update({ is_assigned: true })
    .eq("id", availableOTP.id);

  if (updateError) {
    console.error('Error actualizando available OTP:', updateError);
    throw updateError;
  }

  return { code: availableOTP.code };
};