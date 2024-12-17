import React from "react";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import CourseContentItem from "./CourseContentItem";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

interface CourseStructureProps {
  courseStructure: ContentItem[];
  onSelectContent: (content: ContentItem) => void;
}

const CourseStructure = ({ courseStructure, onSelectContent }: CourseStructureProps) => {
  return (
    <Card className="p-3 md:p-4 h-[calc(100vh-12rem)] overflow-y-auto">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">
        Estructura del Curso
      </h2>
      <nav aria-label="Navegación del contenido del curso">
        <Accordion type="multiple" className="w-full">
          {courseStructure.map((item, index) => (
            <CourseContentItem
              key={`0-${index}-${item.title}`}
              item={item}
              level={0}
              onSelect={onSelectContent}
            />
          ))}
        </Accordion>
      </nav>
    </Card>
  );
};

export default CourseStructure;