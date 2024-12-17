export interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

export const courseStructure: ContentItem[] = [
  {
    title: "Matemáticas",
    description: "Curso completo de matemáticas que abarca diversos aspectos fundamentales.",
    items: [
      {
        title: "Sentido numérico",
        description: "Desarrollo de la comprensión de números y operaciones básicas.",
        items: [
          {
            title: "Sumar y restar",
            description: "Operaciones fundamentales de suma y resta con diferentes niveles de dificultad."
          },
          {
            title: "Multiplicar y dividir",
            description: "Conceptos y práctica de multiplicación y división.",
            items: [
              {
                title: "C. Multiplicación A",
                description: "Primera sección de multiplicación con ejercicios básicos.",
                items: [
                  {
                    title: "Sesiones",
                    description: "Serie de sesiones prácticas.",
                    items: [
                      {
                        title: "Sesión 1",
                        description: "Primera sesión de práctica de multiplicación."
                      },
                      {
                        title: "Sesión 2",
                        description: "Segunda sesión de práctica de multiplicación."
                      },
                      {
                        title: "Sesión 3",
                        description: "Tercera sesión de práctica de multiplicación."
                      }
                    ]
                  },
                  {
                    title: "Practicamos las tablas",
                    description: "Ejercicios específicos para practicar las tablas de multiplicar."
                  },
                  {
                    title: "Practicamos XXXXXXXXXX",
                    description: "Ejercicios adicionales de práctica."
                  },
                  {
                    title: "Juego 'Preparamos una excursión!'",
                    description: "Actividad lúdica para practicar multiplicación.",
                    items: [
                      {
                        title: "Parada 1",
                        description: "Primera etapa del juego de la excursión."
                      },
                      {
                        title: "Parada 2",
                        description: "Segunda etapa del juego de la excursión."
                      },
                      {
                        title: "Parada 3",
                        description: "Tercera etapa del juego de la excursión."
                      },
                      {
                        title: "Parada 4",
                        description: "Cuarta etapa del juego de la excursión."
                      },
                      {
                        title: "Juego completo",
                        description: "Versión completa del juego de la excursión."
                      }
                    ]
                  }
                ]
              },
              {
                title: "C. Multiplicación B",
                description: "Segunda sección de multiplicación con ejercicios intermedios."
              },
              {
                title: "C. Multiplicación C",
                description: "Tercera sección de multiplicación con ejercicios avanzados."
              },
              {
                title: "C. Multiplicación D",
                description: "Cuarta sección de multiplicación con ejercicios especializados."
              }
            ]
          }
        ]
      },
      {
        title: "Fracciones y porcentajes",
        description: "Estudio de fracciones, decimales y cálculos porcentuales."
      },
      {
        title: "Sentido de la medida",
        description: "Comprensión y aplicación de diferentes unidades de medida."
      },
      {
        title: "Sentido espacial",
        description: "Desarrollo de la comprensión espacial y geometría."
      },
      {
        title: "Sentido algebraico",
        description: "Introducción a conceptos algebraicos básicos."
      },
      {
        title: "Sentido estocástico",
        description: "Introducción a la probabilidad y estadística básica."
      }
    ]
  }
];