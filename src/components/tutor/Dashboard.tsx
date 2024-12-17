import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const TutorDashboard = () => {
  const navigate = useNavigate();

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
      title: "Configuración",
      icon: Settings,
      url: "/tutor/settings",
    },
  ];

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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TutorDashboard;