import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { AssignedActivity } from "./types";

type SessionSummaryProps = {
  activities: AssignedActivity[];
};

const SessionSummary = ({ activities }: SessionSummaryProps) => {
  const getSubjectFromPath = (path: string): string => {
    const pathParts = path.split('/');
    const subject = pathParts[1]; // e.g., "matematicas" from "/matematicas/..."
    return subject === 'matematicas' ? 'Matemáticas' : 
           subject === 'lengua' ? 'Lengua' : 
           subject.charAt(0).toUpperCase() + subject.slice(1);
  };

  const calculateSubjectStats = () => {
    const subjectStats: { [key: string]: { total: number; completed: number; correct: number; totalQuestions: number } } = {};

    activities.forEach(activity => {
      const subject = getSubjectFromPath(activity.activity_path);
      
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, completed: 0, correct: 0, totalQuestions: 0 };
      }

      subjectStats[subject].total++;
      
      if (activity.completed_at) {
        subjectStats[subject].completed++;
        if (activity.results) {
          subjectStats[subject].correct += activity.results.correct;
          subjectStats[subject].totalQuestions += activity.results.total;
        }
      }
    });

    return subjectStats;
  };

  const subjectStats = calculateSubjectStats();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">Resumen por Materia</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(subjectStats).map(([subject, stats]) => {
          const completionPercentage = (stats.completed / stats.total) * 100;
          const correctPercentage = stats.totalQuestions > 0 
            ? (stats.correct / stats.totalQuestions) * 100 
            : 0;
          const isGoodScore = correctPercentage >= 70;

          return (
            <Card key={subject} className="border-[#E5DEFF]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {subject}
                  {isGoodScore && <Trophy className="h-5 w-5 text-[#9b87f5]" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#8E9196]">Progreso</span>
                      <span className="font-medium">{Math.round(completionPercentage)}%</span>
                    </div>
                    <Progress 
                      value={completionPercentage} 
                      className="h-2 bg-[#E5DEFF] [&>[role=progressbar]]:bg-[#9b87f5]"
                    />
                  </div>
                  
                  {stats.totalQuestions > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#8E9196]">Aciertos</span>
                        <span className="font-medium">{Math.round(correctPercentage)}%</span>
                      </div>
                      <Progress 
                        value={correctPercentage} 
                        className="h-2 bg-[#E5DEFF] [&>[role=progressbar]]:bg-green-500"
                      />
                    </div>
                  )}

                  <div className="text-sm text-[#8E9196]">
                    <p>Actividades completadas: {stats.completed} de {stats.total}</p>
                    {stats.totalQuestions > 0 && (
                      <p>Respuestas correctas: {stats.correct} de {stats.totalQuestions}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SessionSummary;