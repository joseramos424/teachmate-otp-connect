import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Settings,
  Menu,
  ListTodo,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TutorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada correctamente");
      navigate("/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
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
      icon: ListTodo,
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

  const NavItems = ({ className }: { className?: string }) => (
    <div className={cn("flex gap-1", className)}>
      {menuItems.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate(item.url)}
          aria-label={item.ariaLabel}
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          <span>{item.title}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-2 mt-4">
                <NavItems className="flex-col items-start" />
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 w-full justify-start"
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Cerrar Sesión</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-1">
            <NavItems />
          </nav>

          {/* Logout Button (Desktop) */}
          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorLayout;