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
    const groups: { [key: string]: any } = {};
    
    activities.forEach(activity => {
      const pathParts = activity.activity_path.split('/');
      let currentLevel = groups;
      
      // Build the nested structure
      pathParts.slice(0, -1).forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {
            items: {},
            activities: []
          };
        }
        currentLevel = currentLevel[part].items;
      });
      
      // Add the activity to its final location
      const lastPart = pathParts[pathParts.length - 2] || 'root';
      if (!currentLevel[lastPart]) {
        currentLevel[lastPart] = {
          items: {},
          activities: []
        };
      }
      currentLevel[lastPart].activities.push(activity);
    });

    return groups;
  };

  const renderNestedStructure = (structure: any, level: number = 0) => {
    return Object.entries(structure).map(([key, value]: [string, any]) => {
      const hasSubItems = Object.keys(value.items).length > 0;
      const hasActivities = value.activities && value.activities.length > 0;

      if (!hasSubItems && !hasActivities) return null;

      return (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="font-medium">{key}</span>
              {hasActivities && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({value.activities.length} actividades)
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pl-4">
              {/* Render nested folders */}
              {hasSubItems && (
                <Accordion type="single" collapsible className="w-full">
                  {renderNestedStructure(value.items, level + 1)}
                </Accordion>
              )}
              
              {/* Render activities at this level */}
              {hasActivities && value.activities.map((activity: Activity) => (
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
      );
    });
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
          {renderNestedStructure(groupedActivities)}
        </Accordion>
      )}
    </div>
  );
};