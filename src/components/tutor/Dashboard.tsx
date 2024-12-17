import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  Book,
} from "lucide-react";
import CourseContent from "./CourseContent";
import Students from "./Students";

const TutorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/tutor/dashboard",
      ariaLabel: "Ir al panel de control",
    },
    {
      title: "Alumnos",
      icon: Users,
      url: "/tutor/students",
      ariaLabel: "Gestionar alumnos",
    },
    {
      title: "Clases",
      icon: GraduationCap,
      url: "/tutor/classes",
      ariaLabel: "Gestionar clases",
    },
    {
      title: "Actividades",
      icon: BookOpen,
      url: "/tutor/activities",
      ariaLabel: "Gestionar actividades",
    },
    {
      title: "Contenido del Curso",
      icon: Book,
      url: "/tutor/course-content",
      ariaLabel: "Gestionar contenido del curso",
    },
    {
      title: "Configuración",
      icon: Settings,
      url: "/tutor/settings",
      ariaLabel: "Ajustes de la aplicación",
    },
  ];

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar aria-label="Menú principal">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.url)}
                        aria-label={item.ariaLabel}
                      >
                        <item.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1" role="main">
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TutorDashboard;