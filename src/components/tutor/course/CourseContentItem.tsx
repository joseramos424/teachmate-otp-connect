import React from "react";
import { Folder, FileText } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

interface CourseContentItemProps {
  item: ContentItem;
  level: number;
  onSelect: (item: ContentItem) => void;
}

const CourseContentItem = ({ item, level, onSelect }: CourseContentItemProps) => {
  return (
    <AccordionItem 
      value={`${level}-${item.title}`}
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
        {item.items?.map((subItem, index) => (
          <CourseContentItem
            key={`${level}-${index}-${subItem.title}`}
            item={subItem}
            level={level + 1}
            onSelect={onSelect}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseContentItem;