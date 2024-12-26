import { contenidoMatematicas } from './courses/matematicas';

export const courseContent = [
  contenidoMatematicas,
  {
    title: "Lengua",
    description: "Curso completo de lengua que desarrolla habilidades de comunicación y comprensión",
    items: [
      {
        title: "Comunicación oral",
        description: "Desarrollo de habilidades de expresión y comprensión oral",
        items: [
          {
            title: "Escuchar",
            path: "/lengua/escuchar",
            description: "Ejercicios de comprensión auditiva"
          },
          {
            title: "Hablar",
            path: "/lengua/hablar",
            description: "Actividades de expresión oral"
          }
        ]
      },
      {
        title: "Comunicación escrita",
        description: "Desarrollo de habilidades de lectura y escritura",
        items: [
          {
            title: "Lectura",
            description: "Comprensión y análisis de textos",
            items: [
              {
                title: "Comprensión lectora",
                path: "/lengua/lectura/comprension",
                description: "Ejercicios de comprensión de textos"
              },
              {
                title: "Velocidad lectora",
                path: "/lengua/lectura/velocidad",
                description: "Ejercicios para mejorar la velocidad de lectura"
              }
            ]
          },
          {
            title: "Escritura",
            description: "Producción de textos escritos",
            items: [
              {
                title: "Ortografía",
                path: "/lengua/escritura/ortografia",
                description: "Ejercicios de ortografía"
              },
              {
                title: "Redacción",
                path: "/lengua/escritura/redaccion",
                description: "Ejercicios de redacción de textos"
              }
            ]
          }
        ]
      },
      {
        title: "Gramática",
        description: "Estudio de la estructura del lenguaje",
        items: [
          {
            title: "Morfología",
            path: "/lengua/gramatica/morfologia",
            description: "Estudio de la estructura de las palabras"
          },
          {
            title: "Sintaxis",
            path: "/lengua/gramatica/sintaxis",
            description: "Estudio de la estructura de las oraciones"
          }
        ]
      },
      {
        title: "Literatura",
        description: "Exploración de textos literarios",
        items: [
          {
            title: "Géneros literarios",
            path: "/lengua/literatura/generos",
            description: "Estudio de los diferentes géneros literarios"
          },
          {
            title: "Análisis de textos",
            path: "/lengua/literatura/analisis",
            description: "Análisis y comentario de textos literarios"
          }
        ]
      }
    ]
  }
];
