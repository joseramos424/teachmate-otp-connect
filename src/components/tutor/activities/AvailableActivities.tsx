import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import ActivityItem from "./ActivityItem";
import { courseStructure } from "../course/courseData";
import type { ContentItem } from "../course/courseData";

interface AvailableActivitiesProps {
  onAssignActivity: (activity: ContentItem) => void;
}

const AvailableActivities = ({ onAssignActivity }: AvailableActivitiesProps) => {
  return (
    <>
      <h3 className="text-md font-medium mb-2">Contenido Disponible</h3>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Accordion type="multiple" className="w-full">
          {courseStructure.map((item, index) => (
            <ActivityItem
              key={`0-${index}-${item.title}`}
              item={item}
              level={0}
              onAssign={onAssignActivity}
            />
          ))}
        </Accordion>
      </ScrollArea>
    </>
  );
};

export default AvailableActivities;