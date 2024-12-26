import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

type Activity = {
  id: string;
  activity_path: string;
  activity_title: string;
  activity_description: string | null;
  completed_at: string | null;
  results?: {
    correct: number;
    total: number;
  };
};

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Actividades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-lg transition-shadow">
            <Link to={`/student/activity/${activity.id}`}>
              <CardHeader>
                <CardTitle className="text-lg">{activity.activity_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {activity.activity_description || "Sin descripción"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {activity.completed_at ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">
                      {activity.completed_at ? "Completada" : "Pendiente"}
                    </span>
                  </div>
                  {activity.completed_at && activity.results && (
                    <div className="text-sm text-muted-foreground">
                      <span className="text-green-500 font-medium">
                        {activity.results.correct}
                      </span>
                      {" / "}
                      <span className="font-medium">{activity.results.total}</span>{" "}
                      correctas
                    </div>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};