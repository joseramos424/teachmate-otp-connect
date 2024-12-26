import { useEffect, useRef, useState } from "react";
import { ActivitySummary } from "./ActivitySummary";
import { CurvedArrow } from "./CurvedArrow";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ActivityResult } from "./types";

type Activity = {
  start: number;
  answers: number[];
};

type Props = {
  activities: Activity[];
};

export default function Component({ activities }: Props) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [showResults, setShowResults] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activityResults, setActivityResults] = useState<ActivityResult[]>([]);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const checkAnswers = () => {
    const correctAnswers = activities[currentActivity].answers;
    const isCorrect = answers.map((answer, index) => Number(answer) === correctAnswers[index]);
    setActivityResults((prev) => [
      ...prev,
      { start: activities[currentActivity].start, answers: correctAnswers, success: isCorrect.every(Boolean), attempts },
    ]);
    setShowResults(true);
    setAttempts((prev) => prev + 1);
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity((prev) => prev + 1);
      setAnswers(["", "", "", ""]);
      setShowResults(false);
      setShowSolution(false);
      setAttempts(0);
    } else {
      setCompleted(true);
    }
  };

  const showCurrentSolution = () => {
    setShowSolution(true);
  };

  const isCorrect = (index: number) => {
    return Number(answers[index]) === activities[currentActivity].answers[index];
  };

  const allCorrect = answers.every((answer, index) => Number(answer) === activities[currentActivity]?.answers[index]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, activities[currentActivity]?.answers.length);
  }, [currentActivity, activities]);

  if (completed) {
    return <ActivitySummary activityResults={activityResults} />;
  }

  if (!activities || activities.length === 0) {
    return <div className="flex justify-center items-center min-h-[400px] text-foreground">Cargando...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] shadow-lg">
      <div className="flex justify-between items-center mb-8 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] bg-clip-text text-transparent">
          Contar de 2 en 2
        </h1>
        <div className="text-sm px-4 py-2 bg-[#1A1F2C] text-white rounded-full">
          Actividad {currentActivity + 1} de {activities.length}
        </div>
      </div>

      <div className="relative flex items-center justify-start gap-16 pt-12 bg-white/60 p-8 rounded-xl backdrop-blur-sm">
        <div className="relative">
          <div className="w-16 h-16 text-3xl text-center font-medium flex items-center justify-center border-2 border-[#0EA5E9] rounded-lg bg-white">
            {activities[currentActivity].start}
          </div>
          <CurvedArrow />
        </div>
        
        {activities[currentActivity].answers.map((answer, index) => (
          <div key={index} className="relative">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  checkAnswers();
                }
              }}
              className={`w-16 h-16 text-3xl text-center font-medium border-2 border-dashed rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                showResults && !isCorrect(index) ? "border-red-500 bg-red-50" : ""
              } ${showResults && isCorrect(index) ? "border-green-500 bg-green-50" : ""}`}
              maxLength={2}
              disabled={showResults}
              aria-label={`Respuesta ${index + 1}`}
            />
            
            {index < activities[currentActivity].answers.length - 1 && <CurvedArrow />}

            {showResults && (
              <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                {isCorrect(index) ? (
                  <CheckCircle className="text-green-600 w-5 h-5 drop-shadow" aria-label="Correcto" />
                ) : (
                  <XCircle className="text-red-600 w-5 h-5 drop-shadow" aria-label="Incorrecto" />
                )}
              </div>
            )}

            {showSolution && !isCorrect(index) && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-lg font-medium text-green-700 bg-green-100 px-4 py-2 rounded-lg shadow-sm">
                {answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {showSolution && (
        <Alert className="mt-24 mb-4 border-2 border-[#0EA5E9]/20 bg-white/80 backdrop-blur-sm">
          <AlertTitle className="text-[#1A1F2C]">Solución</AlertTitle>
          <AlertDescription className="text-[#8E9196]">
            Observa las respuestas correctas y date cuenta dónde estaban los errores. Continúa con la siguiente actividad.
          </AlertDescription>
        </Alert>
      )}

      {showResults && !allCorrect && attempts < 2 && (
        <Alert className="mt-4 border-2 border-[#0EA5E9]/20 bg-white/80 backdrop-blur-sm">
          <AlertTitle className="text-[#1A1F2C]">¡Inténtalo de nuevo!</AlertTitle>
          <AlertDescription className="text-[#8E9196]">
            Algunas respuestas no son correctas. Te queda {2 - attempts} intento{2 - attempts > 1 ? 's' : ''}.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-8 flex justify-center gap-4">
        {!showResults && !showSolution && (
          <Button 
            onClick={checkAnswers} 
            className="bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] text-white hover:opacity-90 transition-opacity"
          >
            Comprobar
          </Button>
        )}
        {showResults && (
          <>
            {!allCorrect && attempts < 2 && (
              <Button 
                onClick={() => {
                  setShowResults(false);
                  setAnswers(["", "", "", ""]);
                  inputRefs.current[0]?.focus();
                }} 
                className="bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] text-white hover:opacity-90 transition-opacity"
              >
                Intentar de nuevo
              </Button>
            )}
            {(allCorrect || attempts >= 2) && (
              <>
                {!showSolution && (
                  <Button 
                    onClick={showCurrentSolution} 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90 transition-opacity"
                  >
                    Ver solución
                  </Button>
                )}
                <Button 
                  onClick={nextActivity} 
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:opacity-90 transition-opacity"
                >
                  {currentActivity === activities.length - 1 ? "Terminar" : "Siguiente"}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}