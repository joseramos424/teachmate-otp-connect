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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StudentActivitiesList from "./StudentActivitiesList";
import { Student, AssignedActivity } from "./types";

type StudentCardProps = {
  student: Student & { activities: AssignedActivity[] };
  onUnassign: (activityId: string, activityTitle: string) => Promise<void>;
};

const StudentCard = ({ student, onUnassign }: StudentCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasActivities = student.activities && student.activities.length > 0;

  const completionStats = React.useMemo(() => {
    if (!hasActivities) return { completed: 0, total: 0, percentage: 0 };
    
    const completed = student.activities.filter(a => a.completed_at).length;
    const total = student.activities.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  }, [student.activities, hasActivities]);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
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
              </div>
              {hasActivities && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progreso ({completionStats.percentage}%)
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {completionStats.completed} completadas
                      </Badge>
                      <Badge variant="outline">
                        {completionStats.total - completionStats.completed} pendientes
                      </Badge>
                    </div>
                  </div>
                  <Progress value={completionStats.percentage} className="h-2" />
                </div>
              )}
            </div>
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