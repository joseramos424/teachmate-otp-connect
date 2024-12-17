import { Outlet, useNavigate } from "react-router-dom";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  BookText,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TutorLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear any stored session data
    localStorage.removeItem('tutorId');
    localStorage.removeItem('tutorData');
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    
    // Redirect to tutor login page
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/tutor/dashboard",
      ariaLabel: "Ir al panel de control",
    },
    {
      title: "Contenido del Curso",
      icon: BookOpen,
      url: "/tutor/course-content",
      ariaLabel: "Gestionar contenido del curso",
    },
    {
      title: "Clases",
      icon: GraduationCap,
      url: "/tutor/classes",
      ariaLabel: "Gestionar clases",
    },
    {
      title: "Alumnos",
      icon: Users,
      url: "/tutor/students",
      ariaLabel: "Gestionar alumnos",
    },
    {
      title: "Actividades",
      icon: BookText,
      url: "/tutor/activities",
      ariaLabel: "Gestionar actividades",
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
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleLogout}
                      aria-label="Cerrar sesión"
                    >
                      <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span>Cerrar Sesión</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-4" role="main">
          <div className="mb-4">
            <SidebarTrigger 
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              aria-label="Mostrar/Ocultar menú"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TutorLayout;