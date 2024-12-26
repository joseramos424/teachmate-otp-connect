import { supabase } from "@/integrations/supabase/client";
import { Student, StudentFormData } from "@/types/student";

export const fetchStudents = async () => {
  const { data: studentsData, error: studentsError } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (studentsError) throw studentsError;

  // Fetch permanent codes for each student
  const { data: codesData, error: codesError } = await supabase
    .from("permanent_student_codes")
    .select("*");

  if (codesError) throw codesError;

  // Combine student data with their permanent codes
  const studentsWithCodes = studentsData.map(student => ({
    ...student,
    code: codesData.find(code => code.student_id === student.id)?.code
  }));

  return studentsWithCodes;
};

export const createStudent = async (newStudent: StudentFormData) => {
  // First, check if the code is already in use
  const { data: existingCode, error: codeError } = await supabase
    .from("permanent_student_codes")
    .select()
    .eq("code", newStudent.code);

  if (codeError) throw codeError;
  if (existingCode && existingCode.length > 0) {
    throw new Error("Este código ya está en uso");
  }

  // Create the student
  const { data: student, error: studentError } = await supabase
    .from("students")
    .insert([{
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      email: newStudent.email
    }])
    .select()
    .single();

  if (studentError) throw studentError;

  // Create the permanent code
  const { error: permanentCodeError } = await supabase
    .from("permanent_student_codes")
    .insert([{
      code: newStudent.code,
      student_id: student.id,
      is_assigned: true
    }]);

  if (permanentCodeError) throw permanentCodeError;

  return student;
};

export const updateStudent = async (id: string, updateData: StudentFormData) => {
  // Update student data
  const { data: student, error: studentError } = await supabase
    .from("students")
    .update({
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      email: updateData.email
    })
    .eq("id", id)
    .select()
    .single();

  if (studentError) throw studentError;

  // Update permanent code if provided
  if (updateData.code) {
    // First check if student already has a code
    const { data: existingCode, error: fetchError } = await supabase
      .from("permanent_student_codes")
      .select()
      .eq("student_id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingCode) {
      // Update existing code
      const { error: updateError } = await supabase
        .from("permanent_student_codes")
        .update({ code: updateData.code })
        .eq("student_id", id);

      if (updateError) throw updateError;
    } else {
      // Create new code
      const { error: insertError } = await supabase
        .from("permanent_student_codes")
        .insert({
          code: updateData.code,
          student_id: id,
          is_assigned: true
        });

      if (insertError) throw insertError;
    }
  }

  return student;
};

export const deleteStudent = async (id: string) => {
  // Delete permanent code first
  const { error: codeError } = await supabase
    .from("permanent_student_codes")
    .delete()
    .eq("student_id", id);

  if (codeError) throw codeError;

  // Delete student
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) throw error;
};