"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"

const actividades = [
  {
    id: 'huevos',
    titulo: "Juego de los huevos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30_huevos-etqcbEc71owF7uh6fb519guSZ5WBD9.png",
    respuestas: {
      grupos: "3",
      elementosPorGrupo: "10",
      multiplicacion1: "3",
      multiplicacion2: "10",
      suma1: "10",
      suma2: "10",
      suma3: "10",
      resultado: "30",
      total: "30"
    }
  },
  {
    id: 'donuts',
    titulo: "Juego de los donuts",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-grupos_de_2-donuts-4SmdOD2q4qBnH22yhY79fEkZsntj7K.png",
    respuestas: {
      grupos: "6",
      elementosPorGrupo: "2",
      multiplicacion1: "6",
      multiplicacion2: "2",
      suma1: "2",
      suma2: "2",
      suma3: "2",
      suma4: "2",
      suma5: "2",
      suma6: "2",
      resultado: "12",
      total: "12"
    }
  },
  {
    id: 'cerezas',
    titulo: "Juego de las cerezas",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5_grupos_de_2_cerezas-QMDYpeAVKQkGcmL2BBOcQ39XHxHeOr.png",
    respuestas: {
      grupos: "5",
      elementosPorGrupo: "2",
      multiplicacion1: "5",
      multiplicacion2: "2",
      suma1: "2",
      suma2: "2",
      suma3: "2",
      suma4: "2",
      suma5: "2",
      resultado: "10",
      total: "10"
    }
  }
]

const NumberInput = ({ id, value, onChange, isCorrect }) => {
  return (
    <Input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className={`w-16 mx-2 text-center ${
        isCorrect === true ? 'border-green-500 bg-green-50' : 
        isCorrect === false ? 'border-red-500 bg-red-50' : ''
      }`}
    />
  )
}

interface Session17GameProps {
  activityId: string;
}

export const Session17Game = ({ activityId }: Session17GameProps) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [answers, setAnswers] = useState({
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
  })
  const [isCorrect, setIsCorrect] = useState(null)
  const [intentos, setIntentos] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const currentActivity = actividades[currentActivityIndex]
  const currentElement = currentActivity.id === 'huevos' ? 'huevos' : 
                       currentActivity.id === 'donuts' ? 'donuts' : 'cerezas'

  const handleInputChange = (id, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setAnswers(prev => ({ ...prev, [id]: numericValue }))
  }

  const updateActivityResults = async (correct: number, total: number) => {
    try {
      const { error } = await supabase
        .from('assigned_activities')
        .update({ 
          completed_at: new Date().toISOString(),
          results: { correct, total }
        })
        .eq('id', activityId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating activity results:', error);
    }
  };

  const checkAnswers = () => {
    const currentAnswers = currentActivity.respuestas
    const isAllCorrect = Object.keys(currentAnswers).every(key => 
      answers[key] === currentAnswers[key]
    )
    
    setIsCorrect(isAllCorrect)
    if (isAllCorrect) {
      if (currentActivityIndex < actividades.length - 1) {
        setTimeout(() => {
          setCurrentActivityIndex(prevIndex => prevIndex + 1)
          resetGame()
        }, 1500)
      } else {
        setShowSolution(true)
        // Update activity results when all exercises are completed
        updateActivityResults(currentActivityIndex + 1, actividades.length)
      }
    } else {
      setIntentos(prevIntentos => prevIntentos + 1)
      if (intentos + 1 >= 2) {
        setShowSolution(true)
      }
    }
  }

  const resetGame = () => {
    setAnswers({
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
    })
    setIsCorrect(null)
    setIntentos(0)
    setShowSolution(false)
  }

  const restartActivities = () => {
    setCurrentActivityIndex(0)
    resetGame()
  }

  const showCurrentSolution = () => {
    setAnswers(currentActivity.respuestas)
  }

  const continueToNextActivity = () => {
    if (currentActivityIndex < actividades.length - 1) {
      setCurrentActivityIndex(prevIndex => prevIndex + 1)
      resetGame()
    } else {
      restartActivities()
    }
  }

  useEffect(() => {
    resetGame()
  }, [currentActivityIndex])

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto mt-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">Completa el texto con números.</p>
            <p className="text-sm text-gray-500">
              Actividad {currentActivityIndex + 1} de {actividades.length}
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <img 
              src={currentActivity.imagen}
              alt={currentActivity.titulo}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>

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
                    value={answers.suma4} 
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
                    value={answers.suma5} 
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
                    value={answers.suma6} 
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

          {isCorrect !== null && !showSolution && (
            <div className={`mt-4 mb-4 p-4 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? (
                <p className="flex items-center justify-center">
                  <CheckCircle className="mr-2" /> ¡Correcto! Has completado el ejercicio correctamente.
                </p>
              ) : (
                <p className="flex items-center justify-center">
                  <XCircle className="mr-2" /> Algunas respuestas son incorrectas. {intentos < 2 ? 'Inténtalo de nuevo.' : 'Has agotado tus intentos.'}
                </p>
              )}
            </div>
          )}
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
                  {currentActivityIndex < actividades.length - 1 ? 'Continuar' : 'Reiniciar'}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}