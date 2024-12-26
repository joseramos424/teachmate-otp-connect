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

  // Group activities by their complete path structure
  const groupActivitiesByPath = (activities: Activity[]) => {
    const groups: { [key: string]: Activity[] } = {};
    
    activities.forEach(activity => {
      const pathParts = activity.activity_path.split('/');
      const mainPath = pathParts.slice(0, -1).join('/'); // Get all parts except the last one
      
      if (!groups[mainPath]) {
        groups[mainPath] = [];
      }
      groups[mainPath].push(activity);
    });

    // Sort activities within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        // Extract session numbers if they exist
        const aMatch = a.activity_title.match(/Sesión (\d+)/);
        const bMatch = b.activity_title.match(/Sesión (\d+)/);
        
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        
        // If not sessions, sort alphabetically
        return a.activity_title.localeCompare(b.activity_title);
      });
    });

    return groups;
  };

  const getPathDisplay = (path: string) => {
    const parts = path.split('/');
    return parts.map(part => 
      part.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ).join(' / ');
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
          {Object.entries(groupedActivities).map(([path, pathActivities]) => (
            <AccordionItem key={path} value={path || 'root'}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  <span className="font-medium">{getPathDisplay(path || 'General')}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({pathActivities.length} actividades)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pl-4">
                  {pathActivities.map((activity) => (
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
                        <p className="text-sm text-muted-foreground mb-2">
                          Ruta: {getPathDisplay(activity.activity_path)}
                        </p>
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