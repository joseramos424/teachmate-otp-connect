import { multiplicacionCursos } from './multiplicacion';

export const contenidoMatematicas = {
  title: "Matemáticas",
  description: "Curso completo de matemáticas que abarca diversos aspectos fundamentales",
  items: [
    {
      title: "Sentido numérico",
      description: "Desarrollo de la comprensión de números y operaciones básicas",
      items: [
        {
          title: "Sumar y restar",
          path: "/matematicas/sumar-restar",
          description: "Operaciones fundamentales de suma y resta con diferentes niveles de dificultad"
        },
        {
          title: "Multiplicar y dividir",
          description: "Conceptos y práctica de multiplicación y división",
          items: multiplicacionCursos
        },
        {
          title: "Fracciones y porcentajes",
          path: "/matematicas/fracciones-porcentajes",
          description: "Estudio de fracciones y cálculo de porcentajes"
        }
      ]
    },
    {
      title: "Sentido de la medida",
      path: "/matematicas/medidas",
      description: "Comprensión y aplicación de medidas"
    },
    {
      title: "Sentido espacial",
      path: "/matematicas/espacial",
      description: "Desarrollo de la comprensión espacial y geometría"
    },
    {
      title: "Sentido algebraico",
      path: "/matematicas/algebraico",
      description: "Introducción a conceptos algebraicos básicos"
    },
    {
      title: "Sentido estocástico",
      path: "/matematicas/estocastico",
      description: "Introducción a la probabilidad y estadística"
    }
  ]
};