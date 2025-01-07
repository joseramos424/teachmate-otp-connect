import React from 'react';
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  getPathDisplay: (path: string) => string;
  onSelect: () => void;
}

export const ActivityCard = ({ activity, getPathDisplay, onSelect }: ActivityCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <CardTitle className="text-base">{activity.activity_title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{activity.activity_description}</p>
        <p className="text-sm text-muted-foreground mb-2">
          Ruta: {getPathDisplay(activity.activity_path)}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span>
            Asignado: {new Date(activity.assigned_at).toLocaleDateString()}
          </span>
          <span
            className={`px-2 py-1 rounded ${
              activity.completed_at
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {activity.completed_at ? "Completado" : "Pendiente"}
          </span>
        </div>
        {activity.completed_at && activity.results && (
          <div className="mt-2 text-sm text-gray-600">
            Resultado: {activity.results.correct} de {activity.results.total} correctas
          </div>
        )}
      </CardContent>
    </Card>
  );
};