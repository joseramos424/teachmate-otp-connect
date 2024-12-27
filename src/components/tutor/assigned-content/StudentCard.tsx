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
import StudentSummary from "./StudentSummary";
import { Student, AssignedActivity } from "./types";

type StudentCardProps = {
  student: Student & { activities: AssignedActivity[] };
  onUnassign: (activityId: string, activityTitle: string) => Promise<void>;
};

const StudentCard = ({ student, onUnassign }: StudentCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasActivities = student.activities && student.activities.length > 0;

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
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            {hasActivities ? (
              <>
                <StudentSummary activities={student.activities} />
                <StudentActivitiesList 
                  activities={student.activities} 
                  onUnassign={onUnassign}
                />
              </>
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