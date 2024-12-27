import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, CheckCircle, XCircle } from "lucide-react";
import { AssignedActivity } from "./types";
import { cn } from "@/lib/utils";

type StudentActivitiesListProps = {
  activities: AssignedActivity[];
  onUnassign: (activityId: string, activityTitle: string) => Promise<void>;
};

const StudentActivitiesList = ({ activities, onUnassign }: StudentActivitiesListProps) => {
  const getPathDisplay = (path: string) => {
    const pathMap: { [key: string]: string } = {
      'matematicas': 'Matemáticas',
      'multiplicar': 'Multiplicación',
      'sesiones': 'Sesiones',
      'juegos': 'Juegos',
      'practicar': 'Práctica',
      'practicar-tablas': 'Práctica de Tablas',
      'a': 'Nivel A',
      'b': 'Nivel B',
      'c': 'Nivel C',
      'd': 'Nivel D',
      'parada-1': 'Parada 1',
      'parada-2': 'Parada 2',
      'parada-3': 'Parada 3',
      'parada-4': 'Parada 4',
      'completo': 'Completo'
    };

    const parts = path.split('/').filter(part => part);
    return parts.map(part => 
      pathMap[part] || part.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ).join(' / ');
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {activities.map((activity) => (
        <AccordionItem 
          key={activity.id} 
          value={activity.id}
          className="border-[#E5DEFF]"
        >
          <AccordionTrigger className="text-sm hover:text-[#9b87f5] transition-colors">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[#1A1F2C]">{activity.activity_title}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs flex items-center gap-1",
                      activity.completed_at
                        ? "bg-green-100 text-green-800"
                        : "bg-[#FEF7CD] text-[#854D0E]"
                    )}
                  >
                    {activity.completed_at ? (
                      "Completado"
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Pendiente</span>
                      </>
                    )}
                  </span>
                </div>
                <span className="text-xs text-[#8E9196]">
                  Ruta: {getPathDisplay(activity.activity_path)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnassign(activity.id, activity.activity_title);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive hover:text-red-600" />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-4 pl-4">
              <p className="text-[#8E9196]">
                {activity.activity_description}
              </p>
              <div className="space-y-2">
                <p className="text-xs text-[#8E9196]">
                  Fecha de asignación: {new Date(activity.assigned_at).toLocaleDateString()}
                </p>
                {activity.completed_at && (
                  <>
                    <p className="text-xs text-[#8E9196]">
                      Fecha de finalización: {new Date(activity.completed_at).toLocaleDateString()}
                    </p>
                    {activity.results && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-[#1A1F2C]">Resultados:</h4>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>
                              Aciertos: <strong>{activity.results.correct}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>
                              Fallos: <strong>{activity.results.total - activity.results.correct}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#8E9196]">
                              Porcentaje de aciertos:{" "}
                              <strong className="text-[#1A1F2C]">
                                {((activity.results.correct / activity.results.total) * 100).toFixed(1)}%
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StudentActivitiesList;