import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ClassSelectionProps = {
  selectedClasses: string[];
  onClassSelect: (classId: string) => void;
};

const ClassSelection = ({ selectedClasses, onClassSelect }: ClassSelectionProps) => {
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Cargando clases...</div>;

  return (
    <div className="space-y-2">
      <Label>Clases</Label>
      <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
        {classes?.map((classItem) => (
          <div key={classItem.id} className="flex items-center space-x-2">
            <Checkbox
              id={`class-${classItem.id}`}
              checked={selectedClasses.includes(classItem.id)}
              onCheckedChange={() => onClassSelect(classItem.id)}
            />
            <label
              htmlFor={`class-${classItem.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {classItem.name}
            </label>
          </div>
        ))}
        {!classes?.length && (
          <div className="text-sm text-muted-foreground col-span-2">
            No hay clases disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSelection;