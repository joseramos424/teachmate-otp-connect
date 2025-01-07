import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { GameAnswer } from './types';
import { GameForm } from './GameForm';
import { GameControls } from './GameControls';
import { GameHeader } from './GameHeader';
import { actividades } from './activities';

interface Session17GameProps {
  activityId: string;
}

const initialAnswers: GameAnswer = {
  grupos: '',
  elementosPorGrupo: '',
  multiplicacion1: '',
  multiplicacion2: '',
  suma1: '',
  suma2: '',
  suma3: '',
  suma4: '',
  suma5: '',
  suma6: '',
  resultado: '',
  total: ''
};

export const Session17Game = ({ activityId }: Session17GameProps) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [answers, setAnswers] = useState<GameAnswer>(initialAnswers);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [intentos, setIntentos] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const currentActivity = actividades[currentActivityIndex];
  const currentElement = currentActivity.id === 'huevos' ? 'huevos' : 
                        currentActivity.id === 'donuts' ? 'donuts' : 'cerezas';

  const handleInputChange = (id: keyof GameAnswer, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setAnswers(prev => ({ ...prev, [id]: numericValue }));
  };

  const updateActivityResults = async (correct: number, total: number) => {
    try {
      await supabase
        .from('assigned_activities')
        .update({ 
          completed_at: new Date().toISOString(),
          results: { correct, total }
        })
        .eq('id', activityId);
    } catch (error) {
      console.error('Error updating activity results:', error);
    }
  };

  const checkAnswers = () => {
    const currentAnswers = currentActivity.respuestas;
    const isAllCorrect = Object.keys(currentAnswers).every(key => 
      answers[key as keyof GameAnswer] === currentAnswers[key as keyof GameAnswer]
    );
    
    setIsCorrect(isAllCorrect);
    if (isAllCorrect) {
      if (currentActivityIndex < actividades.length - 1) {
        setTimeout(() => {
          setCurrentActivityIndex(prevIndex => prevIndex + 1);
          resetGame();
        }, 1500);
      } else {
        setShowSolution(true);
        updateActivityResults(currentActivityIndex + 1, actividades.length);
      }
    } else {
      setIntentos(prevIntentos => prevIntentos + 1);
      if (intentos + 1 >= 2) {
        setShowSolution(true);
      }
    }
  };

  const resetGame = () => {
    setAnswers(initialAnswers);
    setIsCorrect(null);
    setIntentos(0);
    setShowSolution(false);
  };

  const showCurrentSolution = () => {
    setAnswers(currentActivity.respuestas);
  };

  const continueToNextActivity = () => {
    if (currentActivityIndex < actividades.length - 1) {
      setCurrentActivityIndex(prevIndex => prevIndex + 1);
      resetGame();
    } else {
      updateActivityResults(currentActivityIndex + 1, actividades.length);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto mt-8">
        <div className="p-6">
          <GameHeader 
            currentActivityIndex={currentActivityIndex}
            activitiesLength={actividades.length}
            showSolution={showSolution}
            isCorrect={isCorrect}
            attempts={intentos}
          />

          <GameForm 
            answers={answers}
            handleInputChange={handleInputChange}
            isCorrect={isCorrect}
            currentElement={currentElement}
            showSolution={showSolution}
            currentActivity={currentActivity}
          />

          <GameControls 
            showSolution={showSolution}
            showCurrentSolution={showCurrentSolution}
            continueToNextActivity={continueToNextActivity}
            checkAnswers={checkAnswers}
            currentActivityIndex={currentActivityIndex}
            activitiesLength={actividades.length}
          />
        </div>
      </Card>
    </div>
  );
};