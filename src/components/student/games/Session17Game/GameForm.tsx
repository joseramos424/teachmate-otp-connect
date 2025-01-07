import React from 'react';
import { NumberInput } from './NumberInput';
import { GameAnswer } from './types';

interface GameFormProps {
  answers: GameAnswer;
  handleInputChange: (id: keyof GameAnswer, value: string) => void;
  isCorrect: boolean | null;
  currentElement: string;
  showSolution: boolean;
  currentActivity: {
    respuestas: GameAnswer;
  };
}

export const GameForm = ({ 
  answers, 
  handleInputChange, 
  isCorrect, 
  currentElement,
  showSolution,
  currentActivity
}: GameFormProps) => {
  return (
    <div className="space-y-8 text-xl">
      <div className="flex items-center">
        <span>Hay</span>
        <NumberInput 
          id="grupos" 
          value={answers.grupos} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.grupos === currentActivity.respuestas.grupos : null}
        />
        <span>grupos.</span>
      </div>

      <div className="flex items-center">
        <span>Cada grupo tiene</span>
        <NumberInput 
          id="elementosPorGrupo" 
          value={answers.elementosPorGrupo} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.elementosPorGrupo === currentActivity.respuestas.elementosPorGrupo : null}
        />
        <span>{currentElement}.</span>
      </div>

      <div className="flex items-center">
        <NumberInput 
          id="multiplicacion1" 
          value={answers.multiplicacion1} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.multiplicacion1 === currentActivity.respuestas.multiplicacion1 : null}
        />
        <span>grupos de</span>
        <NumberInput 
          id="multiplicacion2" 
          value={answers.multiplicacion2} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.multiplicacion2 === currentActivity.respuestas.multiplicacion2 : null}
        />
        <span>.</span>
      </div>

      <div className="flex items-center">
        <NumberInput 
          id="multiplicacion1" 
          value={answers.multiplicacion1} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.multiplicacion1 === currentActivity.respuestas.multiplicacion1 : null}
        />
        <span>veces</span>
        <NumberInput 
          id="multiplicacion2" 
          value={answers.multiplicacion2} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.multiplicacion2 === currentActivity.respuestas.multiplicacion2 : null}
        />
        <span>.</span>
      </div>

      <div className="flex items-center flex-wrap">
        <span>Sumanos:</span>
        <NumberInput 
          id="suma1" 
          value={answers.suma1} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.suma1 === currentActivity.respuestas.suma1 : null}
        />
        <span>+</span>
        <NumberInput 
          id="suma2" 
          value={answers.suma2} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.suma2 === currentActivity.respuestas.suma2 : null}
        />
        <span>+</span>
        <NumberInput 
          id="suma3" 
          value={answers.suma3} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.suma3 === currentActivity.respuestas.suma3 : null}
        />
        {currentActivity.respuestas.suma4 && (
          <>
            <span>+</span>
            <NumberInput 
              id="suma4" 
              value={answers.suma4 || ''} 
              onChange={handleInputChange}
              isCorrect={isCorrect !== null ? answers.suma4 === currentActivity.respuestas.suma4 : null}
            />
          </>
        )}
        {currentActivity.respuestas.suma5 && (
          <>
            <span>+</span>
            <NumberInput 
              id="suma5" 
              value={answers.suma5 || ''} 
              onChange={handleInputChange}
              isCorrect={isCorrect !== null ? answers.suma5 === currentActivity.respuestas.suma5 : null}
            />
          </>
        )}
        {currentActivity.respuestas.suma6 && (
          <>
            <span>+</span>
            <NumberInput 
              id="suma6" 
              value={answers.suma6 || ''} 
              onChange={handleInputChange}
              isCorrect={isCorrect !== null ? answers.suma6 === currentActivity.respuestas.suma6 : null}
            />
          </>
        )}
        <span>=</span>
        <NumberInput 
          id="resultado" 
          value={answers.resultado} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.resultado === currentActivity.respuestas.resultado : null}
        />
      </div>

      <div className="flex items-center">
        <span>En total hay</span>
        <NumberInput 
          id="total" 
          value={answers.total} 
          onChange={handleInputChange}
          isCorrect={isCorrect !== null ? answers.total === currentActivity.respuestas.total : null}
        />
        <span>{currentElement} en total.</span>
      </div>
    </div>
  );
};