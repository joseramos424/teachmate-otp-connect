import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    title: "Sentido numérico",
    description: "Desarrollo de la comprensión de números y operaciones básicas",
    items: [
      {
        title: "Sumar y restar",
        path: "/math/add-subtract",
        description: "Operaciones fundamentales de suma y resta con diferentes niveles de dificultad",
        items: [
          {
            title: "Suma hasta 10",
            path: "/math/add-subtract/level-1",
            description: "Práctica de sumas con números del 1 al 10"
          },
          {
            title: "Resta hasta 10",
            path: "/math/add-subtract/level-2",
            description: "Práctica de restas con números del 1 al 10"
          },
          {
            title: "Suma y resta hasta 20",
            path: "/math/add-subtract/level-3",
            description: "Combinación de sumas y restas hasta el número 20"
          }
        ]
      },
      {
        title: "Multiplicar y dividir",
        path: "/math/multiply-divide",
        description: "Conceptos y práctica de multiplicación y división",
        items: [
          {
            title: "Tablas de multiplicar",
            path: "/math/multiply-divide/tables",
            description: "Práctica de las tablas de multiplicar del 1 al 10"
          },
          {
            title: "División básica",
            path: "/math/multiply-divide/basic-division",
            description: "Introducción a la división con números pequeños"
          },
          {
            title: "Problemas combinados",
            path: "/math/multiply-divide/combined",
            description: "Ejercicios que combinan multiplicación y división"
          }
        ]
      }
    ]
  }
];

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

  const renderContentItems = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <AccordionItem key={`${item.path}-${index}`} value={`${item.path}-${index}`}>
        <AccordionTrigger>
          <div className="text-left">
            <div className="font-medium">{item.title}</div>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {item.items ? (
            <div className="pl-4">
              <Accordion type="single" collapsible className="w-full">
                {renderContentItems(item.items, level + 1)}
              </Accordion>
            </div>
          ) : (
            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                onClick={() => assignContent(item)}
              >
                Asignar
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    ));
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
            {courseContent.map((section) => (
              <div key={section.title}>
                <Accordion type="single" collapsible className="w-full">
                  {renderContentItems(section.items)}
                </Accordion>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AssignContentDialog;