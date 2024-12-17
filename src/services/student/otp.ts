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

export const assignOTP = async (studentId: string) => {
  // First, get an available OTP code that hasn't been assigned
  const { data: availableOTP, error: fetchError } = await supabase
    .from("available_otp_codes")
    .select("*")
    .eq("is_assigned", false)
    .limit(1)
    .single();

  if (fetchError) {
    console.error('Error fetching available OTP:', fetchError);
    throw fetchError;
  }

  if (!availableOTP) {
    throw new Error("No available OTP codes found");
  }

  // Create an OTP code entry linking the student and the available OTP
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
    console.error('Error creating OTP code:', createError);
    throw createError;
  }

  // Mark the available OTP as assigned
  const { error: updateError } = await supabase
    .from("available_otp_codes")
    .update({ is_assigned: true })
    .eq("id", availableOTP.id);

  if (updateError) {
    console.error('Error updating available OTP:', updateError);
    throw updateError;
  }

  return { code: availableOTP.code };
};