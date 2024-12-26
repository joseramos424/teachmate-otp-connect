import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText } from "lucide-react";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

interface CourseStructureProps {
  content: ContentItem[];
  onSelect: (content: ContentItem) => void;
}

const CourseStructure = ({ content, onSelect }: CourseStructureProps) => {
  const renderContent = (items: ContentItem[], level = 0) => {
    return items.map((item, index) => (
      <AccordionItem 
        value={`${level}-${index}`} 
        key={`${level}-${index}`}
        className={`pl-${level * 4}`}
      >
        <AccordionTrigger 
          className="hover:no-underline"
          onClick={() => onSelect(item)}
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
          {item.items && (
            <Accordion type="multiple" className="w-full">
              {renderContent(item.items, level + 1)}
            </Accordion>
          )}
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <nav aria-label="Navegación del contenido del curso">
      <Accordion type="multiple" className="w-full">
        {renderContent(content)}
      </Accordion>
    </nav>
  );
};

export default CourseStructure;