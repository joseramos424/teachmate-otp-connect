import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AssignedActivity } from "./types";

type StudentSummaryProps = {
  activities: AssignedActivity[];
};

const StudentSummary = ({ activities }: StudentSummaryProps) => {
  const completedActivities = activities.filter((activity) => activity.completed_at);
  const completionPercentage = Math.round(
    (completedActivities.length / activities.length) * 100
  );

  const totalResults = completedActivities.reduce(
    (acc, activity) => {
      if (activity.results) {
        acc.correct += activity.results.correct;
        acc.total += activity.results.total;
      }
      return acc;
    },
    { correct: 0, total: 0 }
  );

  const successRate = totalResults.total > 0
    ? Math.round((totalResults.correct / totalResults.total) * 100)
    : 0;

  return (
    <Card className="bg-white border-[#E5DEFF] mb-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8E9196]">
                Progreso ({completionPercentage}%)
              </span>
              <div className="flex gap-2">
                <Badge 
                  variant="secondary"
                  className="bg-[#E5DEFF] text-[#7E69AB] hover:bg-[#d3c8ff]"
                >
                  {completedActivities.length} completadas
                </Badge>
                <Badge 
                  variant="outline"
                  className="border-[#E5DEFF] text-[#8E9196]"
                >
                  {activities.length - completedActivities.length} pendientes
                </Badge>
              </div>
            </div>
            <Progress 
              value={completionPercentage} 
              className="h-2 bg-[#E5DEFF] [&>[role=progressbar]]:bg-[#9b87f5]"
            />
          </div>
          
          {totalResults.total > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8E9196]">
                  Tasa de éxito ({successRate}%)
                </span>
                <Badge 
                  variant="secondary"
                  className="bg-[#E5DEFF] text-[#7E69AB] hover:bg-[#d3c8ff]"
                >
                  {totalResults.correct}/{totalResults.total} correctas
                </Badge>
              </div>
              <Progress 
                value={successRate} 
                className="h-2 bg-[#E5DEFF] [&>[role=progressbar]]:bg-[#9b87f5]"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSummary;