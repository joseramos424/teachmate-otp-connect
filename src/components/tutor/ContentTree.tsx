import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentTreeProps {
  items: any[];
  onAssign: (path: string, title: string, description: string | undefined) => void;
  basePath?: string;
}

const ContentTree = ({ items, onAssign, basePath = "" }: ContentTreeProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-base">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-4 space-y-2">
              {item.description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </p>
              )}
              {item.path ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAssign(item.path, item.title, item.description)}
                >
                  Asignar
                </Button>
              ) : item.items ? (
                <ContentTree
                  items={item.items}
                  onAssign={onAssign}
                  basePath={basePath ? `${basePath}/${item.title}` : item.title}
                />
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ContentTree;