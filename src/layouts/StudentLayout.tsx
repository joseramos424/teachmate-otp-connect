import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/student/Sidebar";
import { useToast } from "@/hooks/use-toast";

const StudentLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear any stored session data
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentData');
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    
    // Redirect to student login page
    navigate("/student/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <StudentSidebar onLogout={handleLogout} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;