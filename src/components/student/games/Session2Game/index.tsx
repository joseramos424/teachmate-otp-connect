import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, ActivityResult } from "./types";
import { CurvedArrow } from "./CurvedArrow";
import { ActivitySummary } from "./ActivitySummary";
import { supabase } from "@/integrations/supabase/client";

const generateActivities = (): Activity[] => {
  const activities: Activity[] = [];
  const usedStarts = new Set<number>();

  while (activities.length < 4) {
    const start = Math.floor(Math.random() * 9) * 2 + 2;
    if (usedStarts.has(start)) continue;
    usedStarts.add(start);

    const answers = [];
    for (let i = 1; i <= 4; i++) {
      const next = start + i * 2;
      if (next <= 20) {
        answers.push(next);
      } else {
        break;
      }
    }
    if (answers.length === 4) {
      activities.push({ start, answers });
    }
  }

  return activities.sort((a, b) => a.start - b.start);
};

interface Session2GameProps {
  activityId: string;
}

export const Session2Game = ({ activityId }: Session2GameProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [showResults, setShowResults] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activityResults, setActivityResults] = useState<ActivityResult[]>([]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const generatedActivities = generateActivities();
    setActivities(generatedActivities);
  }, []);

  const updateActivityResults = async (results: ActivityResult[]) => {
    const totalAttempts = results.reduce((sum, result) => sum + result.attempts, 0);
    const successfulActivities = results.filter(result => result.success).length;
    
    try {
      await supabase
        .from('assigned_activities')
        .update({ 
          completed_at: new Date().toISOString(),
          results: {
            correct: successfulActivities,
            total: results.length,
            attempts: totalAttempts
          }
        })
        .eq('id', activityId);
    } catch (error) {
      console.error('Error updating activity results:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      const newAnswers = [...answers];
      if (newAnswers[index].length < 2) {
        newAnswers[index] = newAnswers[index] + e.key;
        setAnswers(newAnswers);
        
        if (newAnswers[index].length === 2 && index < 3) {
          inputRefs[index + 1].current?.focus();
        }
      }
    } else if (e.key === "Backspace") {
      const newAnswers = [...answers];
      newAnswers[index] = newAnswers[index].slice(0, -1);
      setAnswers(newAnswers);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
    const correct = answers.every((answer, index) => 
      parseInt(answer) === activities[currentActivity].answers[index]
    );
    setAllCorrect(correct);
    
    if (correct) {
      const newResults = [...activityResults, { 
        attempts: attempts + 1, 
        success: true,
        start: activities[currentActivity].start,
        answers: activities[currentActivity].answers
      }];
      setActivityResults(newResults);
      
      if (currentActivity < activities.length - 1) {
        setTimeout(() => {
          setCurrentActivity(prevIndex => prevIndex + 1);
          resetActivity();
        }, 1500);
      } else {
        setCompleted(true);
        updateActivityResults(newResults);
      }
    } else {
      setAttempts(prevAttempts => prevAttempts + 1);
      if (attempts + 1 >= 2) {
        setShowSolution(true);
        const newResults = [...activityResults, { 
          attempts: 2, 
          success: false,
          start: activities[currentActivity].start,
          answers: activities[currentActivity].answers
        }];
        setActivityResults(newResults);
      }
    }
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(prevIndex => prevIndex + 1);
      resetActivity();
    } else {
      setCompleted(true);
      updateActivityResults(activityResults);
    }
  };

  const resetActivity = () => {
    setAnswers(["", "", "", ""]);
    setShowResults(false);
    setAllCorrect(false);
    setAttempts(0);
    setShowSolution(false);
    inputRefs[0].current?.focus();
  };

  const showCurrentSolution = () => {
    setAnswers(activities[currentActivity].answers.map(String));
  };

  const isCorrect = (index: number) => {
    return parseInt(answers[index]) === activities[currentActivity].answers[index];
  };

  if (completed) {
    return <ActivitySummary activityResults={activityResults} />;
  }

  if (activities.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contar de 2 en 2</h1>
        <div className="text-sm text-gray-600">
          Actividad {currentActivity + 1} de {activities.length}
        </div>
      </div>

      <div className="relative flex items-center justify-start gap-16 pt-12">
        <div className="relative">
          <div className="w-16 h-16 text-3xl text-center font-medium flex items-center justify-center border-2 border-transparent">
            {activities[currentActivity].start}
          </div>
          <CurvedArrow />
        </div>
        
        {activities[currentActivity].answers.map((answer, index) => (
          <div key={index} className="relative">
            <input
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              value={answers[index]}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "w-16 h-16 text-3xl text-center font-medium",
                "border-2 border-dashed",
                "focus:outline-none focus:border-orange-500",
                "bg-transparent",
                showResults && !isCorrect(index) && "border-red-500",
                showResults && isCorrect(index) && "border-green-500 bg-green-50"
              )}
              maxLength={2}
              disabled={showResults}
              aria-label={`Respuesta ${index + 1}`}
            />
            
            {index < activities[currentActivity].answers.length - 1 && <CurvedArrow />}

            {showResults && (
              <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                {isCorrect(index) ? (
                  <CheckCircle className="text-green-500 w-5 h-5" aria-label="Correcto" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" aria-label="Incorrecto" />
                )}
              </div>
            )}

            {showSolution && !isCorrect(index) && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-lg font-medium text-green-600 bg-green-100 px-3 py-1 rounded-md">
                {answer}
              </div>
            )}
          </div>
        ))}
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

      <div className="mt-8 flex justify-center gap-4">
        {!showResults && !showSolution && (
          <Button onClick={checkAnswers} className="bg-gray-500 hover:bg-gray-600 text-white">Comprobar</Button>
        )}
        {showSolution && (
          <>
            <Button onClick={showCurrentSolution} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Ver solución
            </Button>
            <Button onClick={nextActivity} className="bg-green-500 hover:bg-green-600 text-white">
              {currentActivity === activities.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          </>
        )}
        {showResults && !showSolution && attempts < 2 && !allCorrect && (
          <Button onClick={() => {
            setShowResults(false);
            setAnswers(["", "", "", ""]);
            inputRefs[0].current?.focus();
          }} className="bg-gray-500 hover:bg-gray-600 text-white">
            Intentar de nuevo
          </Button>
        )}
      </div>
    </div>
  );
};