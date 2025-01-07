import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GameHeaderProps {
  currentActivity: number;
  totalActivities: number;
  showResults: boolean;
  allCorrect: boolean;
  attempts: number;
  showSolution: boolean;
}

export const GameHeader = ({
  currentActivity,
  totalActivities,
  showResults,
  allCorrect,
  attempts,
  showSolution
}: GameHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contar de 2 en 2</h1>
        <div className="text-sm text-gray-600">
          Actividad {currentActivity + 1} de {totalActivities}
        </div>
      </div>

      {showSolution && (
        <Alert className="mt-24 mb-4">
          <AlertTitle>Solución</AlertTitle>
          <AlertDescription>
            Observa las respuestas correctas y date cuenta dónde estaban los errores. Continúa con la siguiente actividad.
          </AlertDescription>
        </Alert>
      )}

      {showResults && !allCorrect && attempts < 2 && (
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