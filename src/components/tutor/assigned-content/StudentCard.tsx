import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import StudentActivitiesList from "./StudentActivitiesList";
import { Student, AssignedActivity } from "./types";

type StudentCardProps = {
  student: Student & { activities: AssignedActivity[] };
  onUnassign: (activityId: string, activityTitle: string) => Promise<void>;
};

const StudentCard = ({ student, onUnassign }: StudentCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasActivities = student.activities && student.activities.length > 0;

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {student.first_name} {student.last_name}
              </CardTitle>
              <CardDescription>{student.email}</CardDescription>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform",
                isOpen && "transform rotate-180"
              )}
            />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            {hasActivities ? (
              <StudentActivitiesList 
                activities={student.activities} 
                onUnassign={onUnassign}
              />
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No hay contenido asignado
              </p>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default StudentCard;