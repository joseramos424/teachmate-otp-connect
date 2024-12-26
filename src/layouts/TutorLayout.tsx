import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const TutorLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { to: "/tutor/dashboard", label: "Dashboard" },
    { to: "/tutor/classes", label: "Aula" },
    { to: "/tutor/students", label: "Estudiantes" },
    { to: "/tutor/assigned-content", label: "Contenido Asignado" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <nav className="bg-white border-b border-[#E5DEFF] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="relative flex h-16 items-center justify-between">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}

            <div
              className={cn(
                "absolute top-full left-0 right-0 bg-white border-b border-[#E5DEFF] md:relative md:top-auto md:left-auto md:right-auto md:border-none",
                "flex flex-col md:flex-row md:items-center md:space-x-8",
                {
                  "hidden md:flex": !isMenuOpen,
                }
              )}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-[#9b87f5] px-4 py-3 md:px-3 md:py-2 rounded-md block",
                      isActive ? "text-[#1A1F2C] bg-[#E5DEFF]" : "text-[#8E9196]"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorLayout;