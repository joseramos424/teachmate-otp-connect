import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import CourseContent from "./CourseContent";
import Students from "./Students";

const TutorDashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/tutor/course-content":
        return <CourseContent />;
      case "/tutor/students":
        return <Students />;
      case "/tutor/dashboard":
        return (
          <main className="container mx-auto p-6" role="main" aria-label="Panel de control">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Panel de Control del Tutor</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clases Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold" aria-live="polite">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alumnos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold" aria-live="polite">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividades Asignadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold" aria-live="polite">0</p>
                </CardContent>
              </Card>
            </div>
          </main>
        );
      default:
        return (
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Página en construcción</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex-1" role="main">
      {renderContent()}
    </div>
  );
};

export default TutorDashboard;