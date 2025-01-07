import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, ActivityResult } from "./types";
import { CurvedArrow } from "./CurvedArrow";
import { ActivitySummary } from "./ActivitySummary";
import { GameInput } from "./GameInput";
import { GameControls } from "./GameControls";
import { GameHeader } from "./GameHeader";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(prevIndex => prevIndex + 1);
      resetActivity();
    } else {
      setCompleted(true);
      updateActivityResults(activityResults);
    }
  };

  if (completed) {
    return <ActivitySummary activityResults={activityResults} />;
  }

  if (activities.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <GameHeader 
        currentActivity={currentActivity}
        totalActivities={activities.length}
        showResults={showResults}
        allCorrect={allCorrect}
        attempts={attempts}
        showSolution={showSolution}
      />

      <div className="relative flex items-center justify-start gap-16 pt-12">
        <div className="relative">
          <div className="w-16 h-16 text-3xl text-center font-medium flex items-center justify-center border-2 border-transparent">
            {activities[currentActivity].start}
          </div>
          <CurvedArrow />
        </div>
        
        {activities[currentActivity].answers.map((answer, index) => (
          <div key={index} className="relative">
            <GameInput
              ref={inputRefs[index]}
              value={answers[index]}
              onKeyDown={(e) => handleKeyDown(e, index)}
              showResults={showResults}
              isCorrect={parseInt(answers[index]) === answer}
              index={index}
            />
            
            {index < activities[currentActivity].answers.length - 1 && <CurvedArrow />}
          </div>
        ))}
      </div>

      <GameControls 
        showResults={showResults}
        showSolution={showSolution}
        attempts={attempts}
        allCorrect={allCorrect}
        onCheck={checkAnswers}
        onShowSolution={showCurrentSolution}
        onNext={nextActivity}
        onRetry={resetActivity}
        currentActivity={currentActivity}
        totalActivities={activities.length}
      />
    </div>
  );
};