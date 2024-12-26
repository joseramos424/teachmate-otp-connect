import { Link, Outlet } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, BookOpen, Award } from "lucide-react";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <nav className="bg-white border-b border-[#E5DEFF] shadow-sm">
        <div className="container mx-auto px-4">
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
        </div>
      </nav>
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;