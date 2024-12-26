import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "@/types/student";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type AssignContentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
};

const courseContent = [
  {
    title: "Matemáticas",
    items: [
      {
        title: "Sentido numérico",
        path: "/math/numeric-sense",
        description: "Desarrollo de la comprensión de números y operaciones básicas."
      },
      {
        title: "Sumar y restar",
        path: "/math/add-subtract",
        description: "Operaciones fundamentales de suma y resta."
      },
      {
        title: "Multiplicar y dividir",
        path: "/math/multiply-divide",
        description: "Conceptos y práctica de multiplicación y división."
      }
    ]
  }
];

const AssignContentDialog = ({ isOpen, onClose, student }: AssignContentDialogProps) => {
  const assignContent = async (content: { title: string; path: string; description: string }) => {
    if (!student) return;

    try {
      const { error } = await supabase
        .from("assigned_activities")
        .insert({
          student_id: student.id,
          activity_path: content.path,
          activity_title: content.title,
          activity_description: content.description
        });

      if (error) throw error;

      toast.success(`Contenido asignado a ${student.first_name} ${student.last_name}`);
    } catch (error) {
      console.error("Error al asignar contenido:", error);
      toast.error("Error al asignar el contenido");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Asignar Contenido a {student?.first_name} {student?.last_name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {courseContent.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <div className="grid gap-2">
                  {section.items.map((item) => (
                    <div
                      key={item.path}
                      className="p-4 border rounded-lg hover:bg-accent"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => assignContent(item)}
                        >
                          Asignar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AssignContentDialog;