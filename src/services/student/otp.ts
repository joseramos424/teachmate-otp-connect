import { supabase } from "@/integrations/supabase/client";

export const assignOTP = async (studentId: string) => {
  // Generar un código OTP de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { data, error } = await supabase
    .from("otp_codes")
    .insert({
      code,
      student_id: studentId,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const verifyOTP = async (otp: string) => {
  const { data, error } = await supabase
    .from("otp_codes")
    .select(`
      id,
      code,
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

  if (error) throw error;
  return data;
};

export const markOTPAsUsed = async (otpId: string) => {
  const { error } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (error) throw error;
};