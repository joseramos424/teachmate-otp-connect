import React from "react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText } from "lucide-react";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

const CourseContent = () => {
  const [selectedContent, setSelectedContent] = React.useState<ContentItem | null>(null);

  const courseStructure: ContentItem[] = [
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

  const renderContent = (items: ContentItem[], level = 0) => {
    return items.map((item, index) => (
      <AccordionItem 
        value={`${level}-${index}`} 
        key={`${level}-${index}`}
        className={`pl-${level * 4}`}
      >
        <AccordionTrigger 
          className="hover:no-underline"
          onClick={() => setSelectedContent(item)}
          aria-label={`${item.items ? 'Carpeta' : 'Archivo'}: ${item.title}`}
        >
          <div className="flex items-center gap-2">
            {item.items ? (
              <Folder className="h-4 w-4" aria-hidden="true" />
            ) : (
              <FileText className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{item.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {item.items && renderContent(item.items, level + 1)}
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6" role="main">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">
        Contenido del Curso
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-3 md:p-4 h-[calc(100vh-12rem)] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">
            Estructura del Curso
          </h2>
          <nav aria-label="Navegación del contenido del curso">
            <Accordion type="multiple" className="w-full">
              {renderContent(courseStructure)}
            </Accordion>
          </nav>
        </Card>

        <Card className="p-3 md:p-4 h-[calc(100vh-12rem)] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">
            Detalles del Contenido
          </h2>
          <div role="region" aria-live="polite" aria-atomic="true">
            {selectedContent ? (
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2 text-foreground">
                  {selectedContent.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {selectedContent.description}
                </p>
              </div>
            ) : (
              <p className="text-sm md:text-base text-muted-foreground">
                Selecciona un elemento del directorio para ver su descripción.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseContent;