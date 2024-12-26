"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { Exercise } from "./equality/Exercise"
import { FeedbackMessage } from "./equality/FeedbackMessage"
import { exercises } from "./equality/exercises"

export default function EqualityGame({ activityId }: { activityId: string }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answers, setAnswers] = useState<Record<number, "equal" | "notEqual" | null>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (answer: "equal" | "notEqual") => {
    setAnswers(prev => ({ ...prev, [exercises[currentExercise].id]: answer }))
    setShowFeedback(true)
  }

  const handleNext = async () => {
    setShowFeedback(false)
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
    } else {
      setShowResults(true)
      // Calculate final results
      const totalAnswers = exercises.length
      const correctAnswers = exercises.reduce((acc, exercise) => 
        acc + (answers[exercise.id] === exercise.correctAnswer ? 1 : 0), 0
      )
      
      // Mark activity as completed and store results
      const studentId = sessionStorage.getItem('studentId')
      if (studentId && activityId) {
        await supabase
          .from('assigned_activities')
          .update({ 
            completed_at: new Date().toISOString(),
            results: {
              correct: correctAnswers,
              total: totalAnswers
            }
          })
          .eq('id', activityId)
      }
    }
  }

  const handlePrevious = () => {
    setShowFeedback(false)
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    setCurrentExercise(0)
  }

  const score = exercises.reduce((acc, exercise) => 
    acc + (answers[exercise.id] === exercise.correctAnswer ? 1 : 0), 0
  )

  const currentAnswer = answers[exercises[currentExercise].id]
  const isCurrentAnswerCorrect = currentAnswer === exercises[currentExercise].correctAnswer

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      {!showResults ? (
        <div className="flex justify-between items-center mb-4 w-[600px] mx-auto">
          <h1 className="text-2xl font-bold text-primary">Sesión 1</h1>
          <span className="text-sm text-gray-500">
            Actividad {currentExercise + 1} de {exercises.length}
          </span>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4 w-[600px] mx-auto">
          <h1 className="text-2xl font-bold text-primary">Resultados de la Sesión 1</h1>
          <div className="text-lg">
            <span className="font-semibold">Puntuación: </span>
            <span className="text-green-600 font-bold">{score}</span>
            <span className="text-gray-600"> de </span>
            <span className="font-bold">{exercises.length}</span>
          </div>
        </div>
      )}
      {!showResults ? (
        <div className="space-y-6">
          <Exercise
            exercise={exercises[currentExercise]}
            onAnswer={handleAnswer}
            showResult={false}
            userAnswer={answers[exercises[currentExercise].id]}
          />
          {showFeedback && <FeedbackMessage isCorrect={isCurrentAnswerCorrect} />}
          <div className="flex justify-between mt-8 w-[600px] mx-auto">
            <Button 
              onClick={handlePrevious} 
              disabled={currentExercise === 0}
              className="text-lg px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!showFeedback}
              className="text-lg px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentExercise === exercises.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {exercises.map((exercise) => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              onAnswer={() => {}}
              showResult={true}
              userAnswer={answers[exercise.id]}
            />
          ))}
          <div className="flex justify-center mt-6">
            <Button onClick={handleReset} className="text-lg px-8 py-3">
              Reiniciar juego
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}