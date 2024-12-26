import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ActivityContent } from "./ActivityContent";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FolderOpen, FileText } from "lucide-react";

type Activity = {
  id: string;
  activity_title: string;
  activity_description: string;
  activity_path: string;
  assigned_at: string;
  completed_at: string | null;
  results?: {
    correct: number;
    total: number;
  } | null;
};

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Group activities by their path structure
  const groupActivitiesByPath = (activities: Activity[]) => {
    const groups: { [key: string]: Activity[] } = {};
    
    activities.forEach(activity => {
      const pathParts = activity.activity_path.split('/');
      const mainCategory = pathParts[0] || 'Otros';
      
      if (!groups[mainCategory]) {
        groups[mainCategory] = [];
      }
      groups[mainCategory].push(activity);
    });

    return groups;
  };

  const groupedActivities = groupActivitiesByPath(activities);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Actividades Asignadas</h2>
      {selectedActivity ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedActivity(null)}
            className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-2"
          >
            ← Volver al directorio
          </button>
          <ActivityContent 
            activityPath={selectedActivity.activity_path}
            activityId={selectedActivity.id}
          />
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(groupedActivities).map(([category, categoryActivities]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  <span className="font-medium">{category}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({categoryActivities.length} actividades)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pl-4">
                  {categoryActivities.map((activity) => (
                    <Card 
                      key={activity.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <CardTitle className="text-base">{activity.activity_title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">{activity.activity_description}</p>
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
                        {activity.completed_at && activity.results && (
                          <div className="mt-2 text-sm text-gray-600">
                            Resultado: {activity.results.correct} de {activity.results.total} correctas
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};