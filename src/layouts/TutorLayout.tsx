import { Outlet } from "react-router-dom";
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
  Book,
} from "lucide-react";

const TutorLayout = () => {
  const navigate = useNavigate();

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
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TutorLayout;