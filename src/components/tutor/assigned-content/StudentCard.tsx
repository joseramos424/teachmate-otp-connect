import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentActivitiesList from "./StudentActivitiesList";
import { Student, AssignedActivity } from "./types";

type StudentCardProps = {
  student: Student & { activities: AssignedActivity[] };
  onUnassign: (activityId: string, activityTitle: string) => Promise<void>;
};

const StudentCard = ({ student, onUnassign }: StudentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {student.first_name} {student.last_name}
        </CardTitle>
        <CardDescription>{student.email}</CardDescription>
      </CardHeader>
      <CardContent>
        {student.activities && student.activities.length > 0 ? (
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
    </Card>
  );
};

export default StudentCard;