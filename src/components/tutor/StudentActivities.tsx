import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText, Plus } from "lucide-react";
import type { Student } from "@/types/students";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

interface StudentActivitiesProps {
  student: Student;
}

const StudentActivities = ({ student }: StudentActivitiesProps) => {
  const { toast } = useToast();

  const courseStructure: ContentItem[] = [
    {
      title: "Matemáticas",
      description: "Curso completo de matemáticas",
      items: [
        {
          title: "Sentido numérico",
          description: "Desarrollo de la comprensión de números",
          items: [
            {
              title: "Sumar y restar",
              description: "Operaciones fundamentales"
            },
            {
              title: "Multiplicar y dividir",
              description: "Conceptos básicos"
            }
          ]
        }
      ]
    }
  ];

  const handleAssignActivity = (activity: ContentItem) => {
    // Aquí se implementará la lógica para asignar la actividad
    toast({
      title: "Actividad asignada",
      description: `Se asignó "${activity.title}" a ${student.first_name} ${student.last_name}`,
    });
  };

  const renderContent = (items: ContentItem[], level = 0) => {
    return items.map((item, index) => (
      <AccordionItem 
        value={`${level}-${index}`} 
        key={`${level}-${index}`}
        className={`pl-${level * 4}`}
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            {item.items ? (
              <Folder className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            <span>{item.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {!item.items && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAssignActivity(item)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Asignar
              </Button>
            )}
          </div>
          {item.items && renderContent(item.items, level + 1)}
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Actividades para {student.first_name} {student.last_name}
      </h2>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Accordion type="multiple" className="w-full">
          {renderContent(courseStructure)}
        </Accordion>
      </ScrollArea>
    </Card>
  );
};

export default StudentActivities;