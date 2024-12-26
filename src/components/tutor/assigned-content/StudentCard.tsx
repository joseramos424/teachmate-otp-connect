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
    <Card className="border border-[#E5DEFF] shadow-sm hover:shadow-md transition-shadow duration-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#1A1F2C]">
                    {student.first_name} {student.last_name}
                  </CardTitle>
                  <CardDescription className="text-[#8E9196]">
                    {student.email}
                  </CardDescription>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-[#9b87f5] transition-transform duration-200",
                    isOpen && "transform rotate-180"
                  )}
                />
              </div>
              {hasActivities && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8E9196]">
                      Progreso ({completionStats.percentage}%)
                    </span>
                    <div className="flex gap-2">
                      <Badge 
                        variant="secondary"
                        className="bg-[#E5DEFF] text-[#7E69AB] hover:bg-[#d3c8ff]"
                      >
                        {completionStats.completed} completadas
                      </Badge>
                      <Badge 
                        variant="outline"
                        className="border-[#E5DEFF] text-[#8E9196]"
                      >
                        {completionStats.total - completionStats.completed} pendientes
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={completionStats.percentage} 
                    className="h-2 bg-[#E5DEFF]"
                    indicatorClassName="bg-[#9b87f5]"
                  />
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
              <p className="text-sm text-[#8E9196] italic">
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