import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

  // Consultar las actividades asignadas al estudiante
  const { data: assignedActivities, refetch: refetchActivities } = useQuery({
    queryKey: ["student-activities", student.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_activities")
        .select("*")
        .eq("student_id", student.id)
        .order("assigned_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar las actividades asignadas",
        });
        throw error;
      }

      return data;
    },
  });

  const handleAssignActivity = async (activity: ContentItem) => {
    try {
      const { error } = await supabase.from("student_activities").insert({
        student_id: student.id,
        activity_title: activity.title,
        activity_description: activity.description,
      });

      if (error) throw error;

      await refetchActivities();

      toast({
        title: "Actividad asignada",
        description: `Se asignó "${activity.title}" a ${student.first_name} ${student.last_name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo asignar la actividad",
      });
    }
  };

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
              description: "Operaciones avanzadas",
              items: [
                {
                  title: "C. Multiplicación A",
                  description: "Primera sección de multiplicación",
                  items: [
                    {
                      title: "Sesiones",
                      description: "Sesiones de práctica",
                      items: [
                        {
                          title: "Sesión 1",
                          description: "Primera sesión de práctica"
                        },
                        {
                          title: "Sesión 2",
                          description: "Segunda sesión de práctica"
                        },
                        {
                          title: "Sesión 3",
                          description: "Tercera sesión de práctica"
                        }
                      ]
                    },
                    {
                      title: "Practicamos las tablas",
                      description: "Ejercicios de tablas de multiplicar"
                    },
                    {
                      title: "Practicamos XXXXXXXXXX",
                      description: "Ejercicios adicionales"
                    },
                    {
                      title: "Juego 'Preparamos una excursión!'",
                      description: "Actividad lúdica de multiplicación",
                      items: [
                        {
                          title: "Parada 1",
                          description: "Primera etapa del juego"
                        },
                        {
                          title: "Parada 2",
                          description: "Segunda etapa del juego"
                        },
                        {
                          title: "Parada 3",
                          description: "Tercera etapa del juego"
                        },
                        {
                          title: "Parada 4",
                          description: "Cuarta etapa del juego"
                        },
                        {
                          title: "Juego completo",
                          description: "Versión completa del juego"
                        }
                      ]
                    }
                  ]
                },
                {
                  title: "C. Multiplicación B",
                  description: "Segunda sección de multiplicación"
                },
                {
                  title: "C. Multiplicación C",
                  description: "Tercera sección de multiplicación"
                },
                {
                  title: "C. Multiplicación D",
                  description: "Cuarta sección de multiplicación"
                }
              ]
            },
            {
              title: "Fracciones y porcentajes",
              description: "Estudio de fracciones y cálculos porcentuales"
            }
          ]
        },
        {
          title: "Sentido de la medida",
          description: "Comprensión y aplicación de medidas"
        },
        {
          title: "Sentido espacial",
          description: "Desarrollo de la comprensión espacial"
        },
        {
          title: "Sentido algebraico",
          description: "Introducción al álgebra"
        },
        {
          title: "Sentido estocástico",
          description: "Introducción a probabilidad y estadística"
        }
      ]
    }
  ];

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

      {/* Lista de actividades asignadas */}
      {assignedActivities && assignedActivities.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Actividades Asignadas</h3>
          <div className="space-y-2 mb-4">
            {assignedActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-muted rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{activity.activity_title}</p>
                  {activity.activity_description && (
                    <p className="text-sm text-muted-foreground">
                      {activity.activity_description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Asignada: {new Date(activity.assigned_at).toLocaleDateString()}
                  </p>
                </div>
                {activity.completed_at && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Completada
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-border my-4"></div>
        </div>
      )}

      {/* Contenido del curso para asignar */}
      <h3 className="text-md font-medium mb-2">Contenido Disponible</h3>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Accordion type="multiple" className="w-full">
          {renderContent(courseStructure)}
        </Accordion>
      </ScrollArea>
    </Card>
  );
};

export default StudentActivities;
