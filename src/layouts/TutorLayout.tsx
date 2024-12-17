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
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  BookText,
  Settings,
  LogOut,
} from "lucide-react";
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
      icon: Home,
      onClick: () => navigate("/tutor/dashboard"),
    },
    {
      title: "Estudiantes",
      icon: Users,
      onClick: () => navigate("/tutor/students"),
    },
    {
      title: "Clases",
      icon: BookText,
      onClick: () => navigate("/tutor/classes"),
    },
    {
      title: "Configuración",
      icon: Settings,
      onClick: () => navigate("/tutor/settings"),
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={item.onClick}>
                        <item.icon className="h-4 w-4 mr-2" />
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
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TutorLayout;