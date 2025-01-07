import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GameHeaderProps {
  currentActivityIndex: number;
  activitiesLength: number;
  showSolution: boolean;
  isCorrect: boolean | null;
  attempts: number;
}

export const GameHeader = ({
  currentActivityIndex,
  activitiesLength,
  showSolution,
  isCorrect,
  attempts
}: GameHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4 w-[600px] mx-auto">
        <h1 className="text-2xl font-bold text-primary">Sesión 17</h1>
        <span className="text-sm text-gray-500">
          Actividad {currentActivityIndex + 1} de {activitiesLength}
        </span>
      </div>

      {showSolution && (
        <Alert className="mt-24 mb-4">
          <AlertTitle>Solución</AlertTitle>
          <AlertDescription>
            Observa las respuestas correctas y date cuenta dónde estaban los errores. Continúa con la siguiente actividad.
          </AlertDescription>
        </Alert>
      )}

      {isCorrect === false && attempts < 2 && (
        <Alert className="mt-4">
          <AlertTitle>¡Inténtalo de nuevo!</AlertTitle>
          <AlertDescription>
            Algunas respuestas no son correctas. Te queda {2 - attempts} intento{2 - attempts > 1 ? 's' : ''}.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};