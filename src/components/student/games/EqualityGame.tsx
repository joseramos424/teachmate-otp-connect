"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"

interface Exercise {
  id: number
  question: string
  imageUrls: string[]
  correctAnswer: "equal" | "notEqual"
}

const exercises: Exercise[] = [
  {
    id: 1,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 2,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_iguales-t6fQi0U8miV5Xe3JVJPiTBHMj7CEEi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_iguales-t6fQi0U8miV5Xe3JVJPiTBHMj7CEEi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_manzanas_melocoton-ujFMpNl8VCCT6nWHiQI6IbzCQCkNDw.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 3,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dos_cerezas-lUcI8ULMS7Db4NJoVPSbMVfb8s1mT2.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 4,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_amarilla_abajo-5UBRZOPsQdD2s2ktL3em2icDRYdq4S.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_amarilla_abajo-5UBRZOPsQdD2s2ktL3em2icDRYdq4S.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_roja_abajo-ccVY0zvSA714ZpdAURQmlpVpCP3SCO.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 5,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 6,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_uvas-GvdyWSCSGBFB2SAhdVRmGhT5d6iVuT.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 7,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_sacapuntas-kvVc9BzH5xsO7gTe7mvPhIheKvP1yy.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png"
    ],
    correctAnswer: "notEqual"
  }
]

function Exercise({ exercise, onAnswer, showResult, userAnswer }: {
  exercise: Exercise
  onAnswer: (answer: "equal" | "notEqual") => void
  showResult: boolean
  userAnswer: "equal" | "notEqual" | null
}) {
  const imageSize = exercise.imageUrls.length <= 3 ? "w-40 h-40" : "w-32 h-32"
  
  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-center">{exercise.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between min-h-[500px]">
        <div className="flex-1 w-full flex items-center justify-center py-8">
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-[580px]">
            {exercise.imageUrls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`Imagen ${index + 1}`} 
                className={`object-contain ${imageSize}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full space-y-6 pb-4">
          <RadioGroup
            onValueChange={(value) => onAnswer(value as "equal" | "notEqual")}
            value={userAnswer || ""}
            className="flex justify-center space-x-12"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id={`equal-${exercise.id}`} />
              <Label htmlFor={`equal-${exercise.id}`} className="text-lg">Iguales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notEqual" id={`notEqual-${exercise.id}`} />
              <Label htmlFor={`notEqual-${exercise.id}`} className="text-lg">No iguales</Label>
            </div>
          </RadioGroup>
          {showResult && (
            <div className="text-center text-lg">
              {userAnswer === exercise.correctAnswer ? (
                <CheckCircle className="inline-block text-green-500 mr-2 h-6 w-6" />
              ) : (
                <XCircle className="inline-block text-red-500 mr-2 h-6 w-6" />
              )}
              {userAnswer === exercise.correctAnswer ? "¡Correcto!" : "Incorrecto"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function FeedbackMessage({ isCorrect }: { isCorrect: boolean }) {
  return (
    <div className={`mt-4 p-6 rounded-md text-lg w-[600px] mx-auto ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {isCorrect ? (
        <>
          <CheckCircle className="inline-block mr-2 h-6 w-6" />
          ¡Muy bien! Tu respuesta es correcta.
        </>
      ) : (
        <>
          <XCircle className="inline-block mr-2 h-6 w-6" />
          Lo siento, tu respuesta no es correcta. Inténtalo de nuevo en el siguiente ejercicio.
        </>
      )}
    </div>
  )
}

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
          <span className="text-sm text-gray-500">
            Puntuación: {score} de {exercises.length}
          </span>
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
          <div className="flex justify-between items-center mb-4 w-[600px] mx-auto">
            <h1 className="text-2xl font-bold text-primary">Resultados de la Sesión 1</h1>
            <div className="text-lg">
              <span className="font-semibold">Puntuación: </span>
              <span className="text-green-600 font-bold">{score}</span>
              <span className="text-gray-600"> de </span>
              <span className="font-bold">{exercises.length}</span>
            </div>
          </div>
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