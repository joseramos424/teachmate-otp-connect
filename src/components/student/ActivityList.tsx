import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type Activity = {
  id: string;
  activity_title: string;
  activity_description: string;
  assigned_at: string;
  completed_at: string | null;
};

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Actividades Asignadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities?.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle>{activity.activity_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{activity.activity_description}</p>
              <div className="flex justify-between items-center text-sm">
                <span>
                  Asignado: {new Date(activity.assigned_at).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded ${
                    activity.completed_at
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {activity.completed_at ? "Completado" : "Pendiente"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};