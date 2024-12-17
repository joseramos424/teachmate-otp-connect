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
    },
    {
      title: "Alumnos",
      icon: Users,
      url: "/tutor/students",
    },
    {
      title: "Clases",
      icon: GraduationCap,
      url: "/tutor/classes",
    },
    {
      title: "Actividades",
      icon: BookOpen,
      url: "/tutor/activities",
    },
    {
      title: "Contenido del Curso",
      icon: Book,
      url: "/tutor/course-content",
    },
    {
      title: "Configuración",
      icon: Settings,
      url: "/tutor/settings",
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
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Control del Tutor</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clases Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alumnos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividades Asignadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">0</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Página en construcción</h1>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={() => navigate(item.url)}>
                        <item.icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TutorDashboard;