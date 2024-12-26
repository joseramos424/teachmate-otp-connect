import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "@/types/student";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContentTree from "./ContentTree";
import { courseContent } from "@/data/courseContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AssignContentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
};

const AssignContentDialog = ({ isOpen, onClose, student }: AssignContentDialogProps) => {
  const assignContent = async (content: { title: string; path: string; description: string }) => {
    if (!student) return;

    try {
      // Primero verificamos si la actividad ya está asignada
      const { data: existingAssignment } = await supabase
        .from("assigned_activities")
        .select("*")
        .eq("student_id", student.id)
        .eq("activity_path", content.path)
        .maybeSingle();

      if (existingAssignment) {
        toast.error(`Esta actividad ya está asignada a ${student.first_name} ${student.last_name}`);
        return;
      }

      // Si no está asignada, procedemos a asignarla
      const { error } = await supabase
        .from("assigned_activities")
        .insert({
          student_id: student.id,
          activity_path: content.path,
          activity_title: content.title,
          activity_description: content.description
        });

      if (error) throw error;

      toast.success(`Actividad "${content.title}" asignada exitosamente a ${student.first_name} ${student.last_name}`, {
        description: "El estudiante podrá acceder a esta actividad desde su panel"
      });
      
    } catch (error) {
      console.error("Error al asignar contenido:", error);
      toast.error("Error al asignar el contenido");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Asignar Contenido a {student?.first_name} {student?.last_name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {courseContent.map((subject, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {subject.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ContentTree 
                      items={subject.items} 
                      onAssign={assignContent}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AssignContentDialog;