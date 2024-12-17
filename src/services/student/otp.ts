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
    .single();

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