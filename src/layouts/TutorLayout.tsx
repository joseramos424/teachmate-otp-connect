import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Settings,
  Menu,
  ListTodo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-1">
            <NavItems />
          </nav>
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