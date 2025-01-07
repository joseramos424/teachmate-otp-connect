import React from 'react';
import { FolderOpen } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ActivityCard } from './ActivityCard';
import { Activity } from '../types';

interface ActivityGroupProps {
  path: string;
  activities: Activity[];
  getPathDisplay: (path: string) => string;
  onSelectActivity: (activity: Activity) => void;
}

export const ActivityGroup = ({ 
  path, 
  activities, 
  getPathDisplay,
  onSelectActivity 
}: ActivityGroupProps) => {
  return (
    <AccordionItem key={path} value={path || 'root'}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          <span className="font-medium">{getPathDisplay(path || 'General')}</span>
          <span className="text-sm text-muted-foreground ml-2">
            ({activities.length} actividades)
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 gap-4 pl-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              getPathDisplay={getPathDisplay}
              onSelect={() => onSelectActivity(activity)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};