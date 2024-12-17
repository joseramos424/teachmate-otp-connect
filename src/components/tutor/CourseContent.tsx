import React from "react";
import CourseStructure from "./course/CourseStructure";
import ContentDetails from "./course/ContentDetails";
import { courseStructure } from "./course/courseData";
import type { ContentItem } from "./course/courseData";

const CourseContent = () => {
  const [selectedContent, setSelectedContent] = React.useState<ContentItem | null>(null);

  return (
    <div className="w-full min-h-screen p-4 md:p-6" role="main">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">
        Contenido del Curso
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <CourseStructure 
          courseStructure={courseStructure} 
          onSelectContent={setSelectedContent} 
        />
        <ContentDetails selectedContent={selectedContent} />
      </div>
    </div>
  );
};

export default CourseContent;