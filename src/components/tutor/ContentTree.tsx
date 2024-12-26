import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type ContentItem = {
  title: string;
  path?: string;
  description?: string;
  items?: ContentItem[];
};

type ContentTreeProps = {
  items: ContentItem[];
  onAssign: (content: { title: string; path: string; description: string }) => void;
};

const ContentTree = ({ items, onAssign }: ContentTreeProps) => {
  const renderContentItems = (items: ContentItem[], level = 0) => {
    return items.map((item, index) => (
      <AccordionItem key={`${item.path || index}`} value={`${item.path || index}`}>
        <AccordionTrigger className="hover:no-underline">
          <div className="text-left">
            <div className="font-medium">{item.title}</div>
            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {item.items ? (
            <div className="pl-4">
              <Accordion type="single" collapsible className="w-full">
                {renderContentItems(item.items, level + 1)}
              </Accordion>
            </div>
          ) : (
            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                onClick={() => item.path && onAssign({
                  title: item.title,
                  path: item.path,
                  description: item.description || ""
                })}
              >
                Asignar
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {renderContentItems(items)}
    </Accordion>
  );
};

export default ContentTree;