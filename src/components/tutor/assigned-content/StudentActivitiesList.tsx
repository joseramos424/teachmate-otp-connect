import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AssignedActivity } from "./types";

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
                      "px-2 py-0.5 rounded-full text-xs",
                      activity.completed_at
                        ? "bg-green-100 text-green-800"
                        : "bg-[#E5DEFF] text-[#7E69AB]"
                    )}
                  >
                    {activity.completed_at ? "Completado" : "Pendiente"}
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
            <div className="text-sm space-y-2 pl-4">
              <p className="text-[#8E9196]">
                {activity.activity_description}
              </p>
              <p className="text-xs text-[#8E9196]">
                Fecha de asignación: {new Date(activity.assigned_at).toLocaleDateString()}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StudentActivitiesList;