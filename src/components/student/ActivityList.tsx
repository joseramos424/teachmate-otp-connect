import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { ActivityContent } from "./ActivityContent";
import { ActivityHeader } from "./activity/ActivityHeader";
import { ActivityGroup } from "./activity/ActivityGroup";
import { Activity } from "./types";

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const groupActivitiesByPath = (activities: Activity[]) => {
    const groups: { [key: string]: Activity[] } = {};
    
    activities.forEach(activity => {
      const pathParts = activity.activity_path.split('/');
      const mainPath = pathParts.slice(0, -1).join('/');
      
      if (!groups[mainPath]) {
        groups[mainPath] = [];
      }
      groups[mainPath].push(activity);
    });

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        const aMatch = a.activity_title.match(/Sesión (\d+)/);
        const bMatch = b.activity_title.match(/Sesión (\d+)/);
        
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        return a.activity_title.localeCompare(b.activity_title);
      });
    });

    return groups;
  };

  const getPathDisplay = (path: string) => {
    const pathMap: { [key: string]: string } = {
      'matematicas': 'Matemáticas',
      'multiplicar': 'Multiplicación',
      'sesiones': 'Sesiones',
      'juegos': 'Juegos',
      'practicar': 'Práctica',
      'practicar-tablas': 'Práctica de Tablas',
      'a': 'Nivel A',
      'b': 'Nivel B',
      'c': 'Nivel C',
      'd': 'Nivel D',
      'parada-1': 'Parada 1',
      'parada-2': 'Parada 2',
      'parada-3': 'Parada 3',
      'parada-4': 'Parada 4',
      'completo': 'Completo'
    };

    const parts = path.split('/').filter(part => part);
    return parts.map(part => 
      pathMap[part] || part.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ).join(' / ');
  };

  const groupedActivities = groupActivitiesByPath(activities);

  return (
    <div className="space-y-6">
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
        <>
          <ActivityHeader title="Actividades Asignadas" />
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedActivities).map(([path, pathActivities]) => (
              <ActivityGroup
                key={path}
                path={path}
                activities={pathActivities}
                getPathDisplay={getPathDisplay}
                onSelectActivity={setSelectedActivity}
              />
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
};