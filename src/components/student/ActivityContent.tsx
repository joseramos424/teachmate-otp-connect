import { useEffect, useState } from "react";
import EqualityGame from "./games/EqualityGame";
import { Session2Game } from "./games/Session2Game";
import { Session17Game } from "./games/Session17Game";

interface ActivityContentProps {
  activityPath: string;
  activityId: string;
}

export const ActivityContent = ({ activityPath, activityId }: ActivityContentProps) => {
  if (activityPath === "/matematicas/multiplicar/a/sesiones/1") {
    return <EqualityGame activityId={activityId} />;
  }
  
  if (activityPath === "/matematicas/multiplicar/a/sesiones/2") {
    return <Session2Game activityId={activityId} />;
  }

  if (activityPath === "/matematicas/multiplicar/a/sesiones/17") {
    return <Session17Game activityId={activityId} />;
  }

  return (
    <div className="p-4 text-center">
      <p className="text-muted-foreground">
        Contenido no disponible para esta actividad
      </p>
    </div>
  );
};