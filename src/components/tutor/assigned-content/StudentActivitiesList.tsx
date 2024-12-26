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
  return (
    <Accordion type="single" collapsible className="w-full">
      {activities.map((activity) => (
        <AccordionItem key={activity.id} value={activity.id}>
          <AccordionTrigger className="text-sm">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2">
                  <span>{activity.activity_title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activity.completed_at
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.completed_at ? "Completado" : "Pendiente"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Ruta: {activity.activity_path}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onUnassign(activity.id, activity.activity_title);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">
                {activity.activity_description}
              </p>
              <p className="text-xs text-muted-foreground">
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