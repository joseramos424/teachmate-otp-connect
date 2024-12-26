import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const TutorLayout = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <nav className="bg-white border-b border-[#E5DEFF] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center space-x-4 sm:space-x-8">
            <NavLink
              to="/tutor/dashboard"
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-[#9b87f5]",
                  isActive ? "text-[#1A1F2C]" : "text-[#8E9196]"
                )
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tutor/classes"
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-[#9b87f5]",
                  isActive ? "text-[#1A1F2C]" : "text-[#8E9196]"
                )
              }
            >
              Aula
            </NavLink>
            <NavLink
              to="/tutor/students"
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-[#9b87f5]",
                  isActive ? "text-[#1A1F2C]" : "text-[#8E9196]"
                )
              }
            >
              Estudiantes
            </NavLink>
            <NavLink
              to="/tutor/assigned-content"
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-[#9b87f5]",
                  isActive ? "text-[#1A1F2C]" : "text-[#8E9196]"
                )
              }
            >
              Contenido Asignado
            </NavLink>
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