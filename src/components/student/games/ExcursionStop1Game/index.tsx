import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const actividadInicial = {
  numero: 0,
  preguntas: [
    {
      pregunta: "¿Cómo se llama el grupo de Cris?",
      opciones: ["Las Gorras Amarillas", "Las Camisetas Amarillas", "Las Setas Amarillas"],
      respuestaCorrecta: "Las Setas Amarillas"
    },
    {
      pregunta: "¿Cuántas personas hay en el grupo de Cris, contando con Cris?",
      opciones: ["En el grupo de Cris hay 3 personas", "En el grupo de Cris hay 4 personas", "En el grupo de Cris hay 5 personas"],
      respuestaCorrecta: "En el grupo de Cris hay 4 personas"
    }
  ]
}

const actividadesConteo = [
  {
    numero: 1,
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomates-2aoMJ3yNrmK4OpMDDykFGag8OJCBCI.png",
    nombre: "tomates",
    grupos: "3",
    cantidad: "5",
    opcionesGrupos: ["2", "3", "4"],
    opcionesCantidad: ["4", "5", "6"]
  },
  {
    numero: 2,
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pepinos-9NcOziNBKjTbkotpRcJExT5q8aC14V.png",
    nombre: "pepinos",
    grupos: "2",
    cantidad: "7",
    opcionesGrupos: ["1", "2", "3"],
    opcionesCantidad: ["5", "6", "7"]
  },
  {
    numero: 3,
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boligrafos-BHqiR89dOw8WeBwtsi7bDO6Zn08cIw.png",
    nombre: "bolígrafos",
    grupos: "3",
    cantidad: "4",
    opcionesGrupos: ["2", "3", "4"],
    opcionesCantidad: ["3", "4", "5"]
  },
  {
    numero: 4,
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sacapuntas-kQdYijHzcgr3rt0h0DWpcWgx9UhXYU.png",
    nombre: "sacapuntas",
    grupos: "2",
    cantidad: "4",
    opcionesGrupos: ["1", "2", "3"],
    opcionesCantidad: ["3", "4", "5"]
  }
]

interface ExcursionStop1GameProps {
  activityId: string;
}

export const ExcursionStop1Game = ({ activityId }: ExcursionStop1GameProps) => {
  const [actividadActual, setActividadActual] = useState(0);
  const [respuestas, setRespuestas] = useState({
    inicial: ["", ""],
    conteo: actividadesConteo.map(() => ({ grupos: "", cantidad: "" }))
  });
  const [mensaje, setMensaje] = useState("");
  const [intentos, setIntentos] = useState([0, ...actividadesConteo.map(() => 0)]);
  const [mostrarRespuestaCorrecta, setMostrarRespuestaCorrecta] = useState(false);
  const [actividadFinalCompletada, setActividadFinalCompletada] = useState(false);
  const [resultados, setResultados] = useState([false, ...actividadesConteo.map(() => false)]);
  const [botonDesactivado, setBotonDesactivado] = useState(false);

  const verificarRespuesta = () => {
    if (actividadActual === 0) {
      const respuestasCorrectas = actividadInicial.preguntas.every((pregunta, index) => 
        respuestas.inicial[index] === pregunta.respuestaCorrecta
      );

      if (respuestasCorrectas) {
        setMensaje("¡Correcto! Pasando a las actividades de conteo.");
        setResultados(prev => [true, ...prev.slice(1)]);
        setBotonDesactivado(true);
        setTimeout(() => {
          setActividadActual(1);
          setMensaje("");
          setBotonDesactivado(false);
        }, 2000);
      } else {
        const nuevosIntentos = [...intentos];
        nuevosIntentos[0]++;
        setIntentos(nuevosIntentos);
        if (nuevosIntentos[0] >= 2) {
          setMensaje("Incorrecto. Aquí tienes las respuestas correctas.");
          setMostrarRespuestaCorrecta(true);
          setBotonDesactivado(true);
        } else {
          setMensaje("Incorrecto. Inténtalo de nuevo.");
        }
      }
    } else {
      const actividad = actividadesConteo[actividadActual - 1];
      const respuestaActual = respuestas.conteo[actividadActual - 1];
      const respuestaCorrecta = respuestaActual.grupos === actividad.grupos && respuestaActual.cantidad === actividad.cantidad;

      if (respuestaCorrecta) {
        setMensaje("¡Correcto! Se está cargando la siguiente actividad.");
        setResultados(prev => {
          const newResultados = [...prev];
          newResultados[actividadActual] = true;
          return newResultados;
        });
        setBotonDesactivado(true);
        setTimeout(() => {
          if (actividadActual < actividadesConteo.length) {
            setActividadActual(prev => prev + 1);
            setMensaje("");
            setMostrarRespuestaCorrecta(false);
            setBotonDesactivado(false);
          } else {
            setMensaje("¡Felicidades! Has completado todas las actividades.");
            setActividadFinalCompletada(true);
          }
        }, 2000);
      } else {
        const nuevosIntentos = [...intentos];
        nuevosIntentos[actividadActual]++;
        setIntentos(nuevosIntentos);
        if (nuevosIntentos[actividadActual] >= 2) {
          setMensaje("Incorrecto. Aquí tienes la respuesta correcta.");
          setMostrarRespuestaCorrecta(true);
          setBotonDesactivado(true);
        } else {
          setMensaje("Incorrecto. Inténtalo de nuevo.");
        }
      }
    }
  }

  const siguienteActividad = () => {
    if (actividadActual < actividadesConteo.length) {
      setActividadActual(prev => prev + 1);
      setMensaje("");
      setMostrarRespuestaCorrecta(false);
      setBotonDesactivado(false);
    } else {
      setActividadFinalCompletada(true);
    }
  }

  const repetirActividad = () => {
    const nuevosIntentos = [...intentos];
    nuevosIntentos[actividadActual] = 0;
    setIntentos(nuevosIntentos);
    setMensaje("");
    setMostrarRespuestaCorrecta(false);
    setBotonDesactivado(false);
    if (actividadActual === 0) {
      setRespuestas(prev => ({ ...prev, inicial: ["", ""] }));
    } else {
      setRespuestas(prev => {
        const nuevasRespuestas = { ...prev };
        nuevasRespuestas.conteo[actividadActual - 1] = { grupos: "", cantidad: "" };
        return nuevasRespuestas;
      });
    }
  }

  const renderActividadInicial = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Actividad Inicial</h2>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cris_camiseta-VzLrbN0xx35ivUPcL70I6mafQipMiZ.png" 
          alt="Cris" 
          className="h-16 object-contain"
        />
      </div>
      <div className="space-y-8">
        {actividadInicial.preguntas.map((pregunta, index) => (
          <div key={index} className="space-y-4">
            <p className="font-medium">{pregunta.pregunta}</p>
            <RadioGroup
              value={respuestas.inicial[index]}
              onValueChange={(value) => {
                setRespuestas(prev => {
                  const nuevasRespuestas = { ...prev };
                  nuevasRespuestas.inicial[index] = value;
                  return nuevasRespuestas;
                });
              }}
              className="space-y-3"
            >
              {pregunta.opciones.map((opcion, opcionIndex) => (
                <div key={opcionIndex} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={opcion} 
                    id={`pregunta-${index}-opcion-${opcionIndex}`}
                    className={`w-4 h-4 border-2 ${
                      mostrarRespuestaCorrecta
                        ? opcion === pregunta.respuestaCorrecta
                          ? "border-green-500 bg-green-500"
                          : "border-red-500 bg-red-500"
                        : "border-gray-300 text-gray-600"
                    } focus:border-gray-500`}
                    disabled={mostrarRespuestaCorrecta}
                  />
                  <Label 
                    htmlFor={`pregunta-${index}-opcion-${opcionIndex}`}
                    className={mostrarRespuestaCorrecta && opcion === pregunta.respuestaCorrecta ? "font-bold" : ""}
                  >
                    {opcion}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  )

  const renderActividadConteo = (actividad) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Contar grupos iguales</h2>
        <p className="text-sm text-gray-500">
          Actividad {actividad.numero} de {actividadesConteo.length}
        </p>
      </div>
      <div className="flex justify-center mb-6 space-x-2">
        {[...Array(actividad.numero === 2 || actividad.numero === 4 ? 2 : 3)].map((_, i) => (
          <img
            key={i}
            src={actividad.imagen}
            alt={`Grupos de ${actividad.nombre}`}
            className={`object-cover rounded-md ${actividad.numero === 2 || actividad.numero === 4 ? 'w-1/2' : 'w-1/3'}`}
          />
        ))}
      </div>

      <div className="flex items-start">
        <span className="mr-2 mt-1">Hay</span>
        <RadioGroup 
          value={respuestas.conteo[actividad.numero - 1].grupos} 
          onValueChange={(value) => setRespuestas(prev => {
            const nuevasRespuestas = { ...prev };
            nuevasRespuestas.conteo[actividad.numero - 1] = { ...nuevasRespuestas.conteo[actividad.numero - 1], grupos: value };
            return nuevasRespuestas;
          })} 
          className="flex flex-col space-y-1"
        >
          {actividad.opcionesGrupos.map((num) => (
            <div key={num} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={num} 
                id={`grupos-${num}`} 
                className={`w-4 h-4 border-2 ${
                  mostrarRespuestaCorrecta
                    ? num === actividad.grupos
                      ? "border-green-500 bg-green-500"
                      : "border-red-500 bg-red-500"
                    : "border-gray-300 text-gray-600"
                } focus:border-gray-500`}
                disabled={mostrarRespuestaCorrecta}
              />
              <Label 
                htmlFor={`grupos-${num}`}
                className={mostrarRespuestaCorrecta && num === actividad.grupos ? "font-bold" : ""}
              >
                {num}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <span className="ml-2 mt-1">grupos de {actividad.nombre}.</span>
      </div>

      <div className="flex items-start">
        <span className="mr-2 mt-1">Cada grupo con</span>
        <RadioGroup 
          value={respuestas.conteo[actividad.numero - 1].cantidad} 
          onValueChange={(value) => setRespuestas(prev => {
            const nuevasRespuestas = { ...prev };
            nuevasRespuestas.conteo[actividad.numero - 1] = { ...nuevasRespuestas.conteo[actividad.numero - 1], cantidad: value };
            return nuevasRespuestas;
          })} 
          className="flex flex-col space-y-1"
        >
          {actividad.opcionesCantidad.map((num) => (
            <div key={num} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={num} 
                id={`cantidad-${num}`} 
                className={`w-4 h-4 border-2 ${
                  mostrarRespuestaCorrecta
                    ? num === actividad.cantidad
                      ? "border-green-500 bg-green-500"
                      : "border-red-500 bg-red-500"
                    : "border-gray-300 text-gray-600"
                } focus:border-gray-500`}
                disabled={mostrarRespuestaCorrecta}
              />
              <Label 
                htmlFor={`cantidad-${num}`}
                className={mostrarRespuestaCorrecta && num === actividad.cantidad ? "font-bold" : ""}
              >
                {num}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <span className="ml-2 mt-1">{actividad.nombre}.</span>
      </div>
    </div>
  )

  const renderResumen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Resumen de Actividades</h2>
      {resultados.map((resultado, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <span className="font-medium">Actividad {index === 0 ? 'Inicial' : index}</span>
          {resultado ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <XCircle className="text-red-500" size={24} />
          )}
        </div>
      ))}
      <p className="text-center text-lg font-medium">
        Has completado correctamente {resultados.filter(Boolean).length} de {resultados.length} actividades.
      </p>
      <Button onClick={() => window.location.reload()} className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
        Volver a empezar
      </Button>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <div className="max-w-md mx-auto">
        {!actividadFinalCompletada ? (
          <>
            {actividadActual === 0 ? renderActividadInicial() : renderActividadConteo(actividadesConteo[actividadActual - 1])}

            {mensaje && (
              <div className={`mt-6 mb-2 p-3 rounded-md ${mensaje.includes("Correcto") || mensaje.includes("Felicidades") ? "bg-green-100" : "bg-red-100"}`}>
                <p className={`text-center ${mensaje.includes("Correcto") || mensaje.includes("Felicidades") ? "text-green-800" : "text-red-800"}`}>
                  {mensaje}
                </p>
              </div>
            )}

            {!mostrarRespuestaCorrecta && (
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={verificarRespuesta} 
                  className="w-3/4"
                  disabled={botonDesactivado}
                >
                  Comprobar respuesta
                </Button>
              </div>
            )}

            {mostrarRespuestaCorrecta && (
              <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={repetirActividad} variant="outline">
                  Repetir actividad
                </Button>
                <Button onClick={siguienteActividad}>
                  {actividadActual < actividadesConteo.length ? "Siguiente actividad" : "Ver resumen"}
                </Button>
              </div>
            )}
          </>
        ) : (
          renderResumen()
        )}
      </div>
    </Card>
  );
};
