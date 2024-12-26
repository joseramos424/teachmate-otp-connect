import { useEffect, useState } from "react";
import EqualityGame from "./games/EqualityGame";
import { Session2Game } from "./games/Session2Game";

interface ActivityContentProps {
  activityPath: string;
  activityId: string;
}

export const ActivityContent = ({ activityPath, activityId }: ActivityContentProps) => {
  if (activityPath === "/math/multiply/a/sessions/1") {
    return <EqualityGame activityId={activityId} />;
  }
  
  if (activityPath === "/math/multiply/a/sessions/2") {
    return <Session2Game activities={[
      { start: 2, answers: [4, 6, 8, 10] },
      { start: 5, answers: [7, 9, 11, 13] },
      // Add more activities as needed
    ]} />;
  }

  return (
    <div className="p-4 text-center">
      <p className="text-muted-foreground">
        Contenido no disponible para esta actividad
      </p>
    </div>
  );
};