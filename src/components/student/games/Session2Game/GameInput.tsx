import React from 'react';
import { cn } from "@/lib/utils";

interface GameInputProps {
  ref: React.RefObject<HTMLInputElement>;
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showResults: boolean;
  isCorrect: boolean;
  index: number;
}

export const GameInput = React.forwardRef<HTMLInputElement, GameInputProps>(
  ({ value, onKeyDown, showResults, isCorrect, index }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={value}
        onKeyDown={onKeyDown}
        className={cn(
          "w-16 h-16 text-3xl text-center font-medium",
          "border-2 border-dashed",
          "focus:outline-none focus:border-orange-500",
          "bg-transparent",
          showResults && !isCorrect && "border-red-500",
          showResults && isCorrect && "border-green-500 bg-green-50"
        )}
        maxLength={2}
        disabled={showResults}
        aria-label={`Respuesta ${index + 1}`}
      />
    );
  }
);

GameInput.displayName = 'GameInput';