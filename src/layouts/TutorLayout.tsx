import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, Users, BookOpen, GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TutorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('tutorId');
    toast.success("Sesión cerrada correctamente");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <nav className="bg-white border-b border-[#E5DEFF] shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavigationMenu className="py-2">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link 
                  to="/tutor/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/tutor/students"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Estudiantes
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/tutor/classes"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <GraduationCap className="h-4 w-4" />
                  Clases
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/tutor/assigned-content"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Contenido Asignado
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-[#8E9196] hover:text-[#9b87f5] hover:bg-[#E5DEFF]/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </nav>
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorLayout;