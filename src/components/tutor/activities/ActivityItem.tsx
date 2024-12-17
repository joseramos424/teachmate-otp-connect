import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Folder, FileText } from "lucide-react";
import type { ContentItem } from "../course/courseData";

interface ActivityItemProps {
  item: ContentItem;
  level: number;
  onAssign: (activity: ContentItem) => void;
}

const ActivityItem = ({ item, level, onAssign }: ActivityItemProps) => {
  return (
    <AccordionItem 
      value={`${level}-${item.title}`} 
      className={`pl-${level * 4}`}
    >
      <AccordionTrigger className="hover:no-underline">
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
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">{item.description}</p>
          {!item.items && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAssign(item)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Asignar
            </Button>
          )}
        </div>
        {item.items?.map((subItem, index) => (
          <ActivityItem
            key={`${level}-${index}-${subItem.title}`}
            item={subItem}
            level={level + 1}
            onAssign={onAssign}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ActivityItem;