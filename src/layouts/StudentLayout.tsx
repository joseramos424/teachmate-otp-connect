import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/student/Sidebar";

const StudentLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <StudentSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;