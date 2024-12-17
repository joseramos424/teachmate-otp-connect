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
        >
          <div className="flex items-center gap-2">
            {item.items ? (
              <Folder className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contenido del Curso</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Directorio del curso */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Estructura del Curso</h2>
          <Accordion type="single" collapsible className="w-full">
            {renderContent(courseStructure)}
          </Accordion>
        </Card>

        {/* Panel de explicación */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Detalles del Contenido</h2>
          {selectedContent ? (
            <div>
              <h3 className="text-lg font-medium mb-2">{selectedContent.title}</h3>
              <p className="text-gray-600">{selectedContent.description}</p>
            </div>
          ) : (
            <p className="text-gray-500">
              Selecciona un elemento del directorio para ver su descripción.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CourseContent;