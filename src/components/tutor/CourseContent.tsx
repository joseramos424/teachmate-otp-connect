import React from "react";
import { Card } from "@/components/ui/card";
import CourseStructure from "./course/CourseStructure";
import ContentDetails from "./course/ContentDetails";
import { courseContent } from "@/data/courseContent";

const CourseContent = () => {
  const [selectedContent, setSelectedContent] = React.useState<{
    title: string;
    description: string;
    items?: any[];
  } | null>(null);

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
          <CourseStructure
            content={courseContent}
            onSelect={setSelectedContent}
          />
        </Card>

        <Card className="p-3 md:p-4 h-[calc(100vh-12rem)] overflow-y-auto">
          <ContentDetails selectedContent={selectedContent} />
        </Card>
      </div>
    </div>
  );
};

export default CourseContent;