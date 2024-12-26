import { Link, Outlet } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, BookOpen } from "lucide-react";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <NavigationMenu className="py-2">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link 
                  to="/student/dashboard"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/student/activities"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" />
                  Actividades
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;