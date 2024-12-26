import { sesionesMultiplicacion } from './sesiones';
import { juegosMultiplicacion } from './juegos';

export const contenidoMultiplicacion = [
  {
    title: "Sesiones",
    description: "Serie completa de sesiones prácticas",
    items: sesionesMultiplicacion
  },
  {
    title: "Practicamos las tablas",
    path: "/matematicas/multiplicar/a/practicar-tablas",
    description: "Ejercicios de práctica de las tablas de multiplicar"
  },
  {
    title: "Practicamos multiplicaciones",
    path: "/matematicas/multiplicar/a/practicar",
    description: "Ejercicios de práctica específicos"
  },
  {
    title: "Juego 'Preparamos una excursión'",
    description: "Juego interactivo de multiplicación",
    items: juegosMultiplicacion
  }
];

export const multiplicacionCursos = [
  {
    title: "Curso Multiplicación A",
    description: "Primera sección de multiplicación con ejercicios básicos",
    items: contenidoMultiplicacion
  },
  {
    title: "Curso Multiplicación B",
    path: "/matematicas/multiplicar/b",
    description: "Segunda sección de multiplicación"
  },
  {
    title: "Curso Multiplicación C",
    path: "/matematicas/multiplicar/c",
    description: "Tercera sección de multiplicación"
  },
  {
    title: "Curso Multiplicación D",
    path: "/matematicas/multiplicar/d",
    description: "Cuarta sección de multiplicación"
  }
];