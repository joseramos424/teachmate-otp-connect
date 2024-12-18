import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Activities = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Actividades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividades Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold" aria-live="polite">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividades Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold" aria-live="polite">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold" aria-live="polite">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activities;