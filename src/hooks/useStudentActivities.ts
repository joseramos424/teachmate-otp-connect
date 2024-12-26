import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStudentActivities = (studentId: string | null) => {
  return useQuery({
    queryKey: ["student-activities", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      
      const { data, error } = await supabase
        .from("assigned_activities")
        .select("*")
        .eq('student_id', studentId)
        .order("assigned_at", { ascending: false });

      if (error) {
        console.error("Error fetching activities:", error);
        throw error;
      }

      return data;
    },
    enabled: !!studentId,
  });
};