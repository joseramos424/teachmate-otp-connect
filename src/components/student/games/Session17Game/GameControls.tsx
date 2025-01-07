import React from 'react';
import { Button } from "@/components/ui/button";

interface GameControlsProps {
  showSolution: boolean;
  showCurrentSolution: () => void;
  continueToNextActivity: () => void;
  checkAnswers: () => void;
  currentActivityIndex: number;
  activitiesLength: number;
}

export const GameControls = ({
  showSolution,
  showCurrentSolution,
  continueToNextActivity,
  checkAnswers,
  currentActivityIndex,
  activitiesLength
}: GameControlsProps) => {
  return (
    <div className="mt-4 flex justify-center gap-4">
      {!showSolution && (
        <Button onClick={checkAnswers} className="bg-gray-500 hover:bg-gray-600 text-white">
          Comprobar respuestas
        </Button>
      )}
      {showSolution && (
        <>
          <Button onClick={showCurrentSolution} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Ver solución
          </Button>
          <Button onClick={continueToNextActivity} className="bg-green-500 hover:bg-green-600 text-white">
            {currentActivityIndex === activitiesLength - 1 ? "Terminar" : "Siguiente"}
          </Button>
        </>
      )}
    </div>
  );
};