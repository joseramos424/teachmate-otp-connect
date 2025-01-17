import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Activity = {
  id: string;
  activity_title: string;
  activity_description: string;
  assigned_at: string;
  completed_at: string | null;
};

type ActivityItemProps = {
  activity: Activity;
  onUnassign: (activityId: string, activityTitle: string) => void;
};

const ActivityItem = ({ activity, onUnassign }: ActivityItemProps) => {
  return (
    <AccordionItem value={activity.id}>
      <AccordionTrigger className="text-sm">
        <div className="flex items-center justify-between w-full pr-4">
          <span>{activity.activity_title}</span>
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
            Asignado: {new Date(activity.assigned_at).toLocaleDateString()}
          </p>
          <p className="text-xs">
            Estado:{" "}
            <span
              className={`px-2 py-1 rounded text-xs ${
                activity.completed_at
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {activity.completed_at ? "Completado" : "Pendiente"}
            </span>
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ActivityItem;