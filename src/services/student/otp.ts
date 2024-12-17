import { supabase } from "@/integrations/supabase/client";

export const verifyOTP = async (otp: string) => {
  console.log('Verifying OTP:', otp);
  
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
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }

  console.log('OTP verification result:', data);
  return data;
};

export const markOTPAsUsed = async (otpId: string) => {
  console.log('Marking OTP as used:', otpId);
  
  const { error } = await supabase
    .from("otp_codes")
    .update({ used: true })
    .eq("id", otpId);

  if (error) {
    console.error('Error marking OTP as used:', error);
    throw error;
  }
};

export const assignOTP = async (studentId: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { data, error } = await supabase
    .from("otp_codes")
    .insert({
      code,
      student_id: studentId,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};