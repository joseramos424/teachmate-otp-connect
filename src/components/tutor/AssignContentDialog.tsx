import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContentTree from "./ContentTree";
import { contenidoMatematicas } from "@/data/courses/matematicas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Student } from "@/types/student";

interface AssignContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

const AssignContentDialog = ({
  isOpen,
  onClose,
  student,
}: AssignContentDialogProps) => {
  const assignContent = async (path: string, title: string, description: string | undefined) => {
    if (!student) return;

    try {
      const { error } = await supabase.from("assigned_activities").insert({
        student_id: student.id,
        activity_path: path,
        activity_title: title,
        activity_description: description,
      });

      if (error) throw error;

      toast.success(`Actividad "${title}" asignada correctamente a ${student.first_name}`);
    } catch (error) {
      console.error("Error al asignar actividad:", error);
      toast.error("Error al asignar la actividad");
    }
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Asignar contenido a {student.first_name} {student.last_name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="matematicas">
                <AccordionTrigger className="text-lg font-semibold">
                  {contenidoMatematicas.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ContentTree 
                    items={contenidoMatematicas.items} 
                    onAssign={assignContent}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AssignContentDialog;