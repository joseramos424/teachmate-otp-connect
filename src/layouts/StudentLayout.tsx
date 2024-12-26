import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, BookOpen, Award, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('studentId');
    sessionStorage.removeItem('studentName');
    toast.success("Sesión cerrada correctamente");
    navigate('/student-login');
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <nav className="bg-white border-b border-[#E5DEFF] shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavigationMenu className="py-2">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link 
                  to="/student/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/student/activities"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Actividades
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/student/results"
                  className="flex items-center gap-2 text-sm font-medium text-[#8E9196] hover:text-[#9b87f5] transition-colors"
                >
                  <Award className="h-4 w-4" />
                  Resultados
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

export default StudentLayout;