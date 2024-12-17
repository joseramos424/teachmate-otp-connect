import React from "react";
import { Card } from "@/components/ui/card";

interface ContentItem {
  title: string;
  description: string;
  items?: ContentItem[];
}

interface ContentDetailsProps {
  selectedContent: ContentItem | null;
}

const ContentDetails = ({ selectedContent }: ContentDetailsProps) => {
  return (
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
  );
};

export default ContentDetails;