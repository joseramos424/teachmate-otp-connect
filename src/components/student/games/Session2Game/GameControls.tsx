import React from 'react';
import { Button } from "@/components/ui/button";

interface GameControlsProps {
  showResults: boolean;
  showSolution: boolean;
  attempts: number;
  allCorrect: boolean;
  onCheck: () => void;
  onShowSolution: () => void;
  onNext: () => void;
  onRetry: () => void;
  currentActivity: number;
  totalActivities: number;
}

export const GameControls = ({
  showResults,
  showSolution,
  attempts,
  allCorrect,
  onCheck,
  onShowSolution,
  onNext,
  onRetry,
  currentActivity,
  totalActivities
}: GameControlsProps) => {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {!showResults && !showSolution && (
        <Button onClick={onCheck} className="bg-gray-500 hover:bg-gray-600 text-white">
          Comprobar
        </Button>
      )}
      {showSolution && (
        <>
          <Button onClick={onShowSolution} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Ver solución
          </Button>
          <Button onClick={onNext} className="bg-green-500 hover:bg-green-600 text-white">
            {currentActivity === totalActivities - 1 ? "Terminar" : "Siguiente"}
          </Button>
        </>
      )}
      {showResults && !showSolution && attempts < 2 && !allCorrect && (
        <Button onClick={onRetry} className="bg-gray-500 hover:bg-gray-600 text-white">
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
};