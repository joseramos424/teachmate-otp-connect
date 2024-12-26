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

      toast.success(`Contenido asignado a ${student.first_name} ${student.last_name}`);
    } catch (error) {
      console.error("Error al asignar contenido:", error);
      toast.error("Error al asignar el contenido");
    }
  };

  const renderContentItems = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div
        key={`${item.path}-${index}`}
        className={`ml-${level * 4} mb-4`}
      >
        <div className="p-4 border rounded-lg hover:bg-accent">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            {!item.items && (
              <Button
                size="sm"
                onClick={() => assignContent(item)}
              >
                Asignar
              </Button>
            )}
          </div>
          {item.items && (
            <div className="mt-4 pl-4 border-l">
              {renderContentItems(item.items, level + 1)}
            </div>
          )}
        </div>
      </div>
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
              <div key={section.title} className="space-y-2">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                {renderContentItems(section.items)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AssignContentDialog;