import { supabase } from "@/integrations/supabase/client";

export const checkStudentCodes = async () => {
  console.log('Consultando códigos de estudiantes...');
  
  const { data: codes, error } = await supabase
    .from("permanent_student_codes")
    .select(`
      code,
      is_assigned,
      students (
        first_name,
        last_name
      )
    `);

  if (error) {
    console.error('Error al consultar códigos:', error);
    return;
  }

  console.log('=== CÓDIGOS DE ESTUDIANTES ===');
  codes?.forEach(code => {
    if (code.is_assigned && code.students) {
      console.log(`Código: ${code.code} - Estudiante: ${code.students.first_name} ${code.students.last_name}`);
    } else {
      console.log(`Código: ${code.code} - No asignado`);
    }
  });
  
  return codes;
};