import { supabase } from "@/integrations/supabase/client";

export const checkStudentCodes = async () => {
  console.log('Consultando códigos de estudiantes...');
  
  const { data: codes, error } = await supabase
    .from("permanent_student_codes")
    .select(`
      code,
      students (
        first_name,
        last_name
      )
    `);

  if (error) {
    console.error('Error al consultar códigos:', error);
    return;
  }

  console.log('Códigos encontrados:', codes);
  return codes;
};