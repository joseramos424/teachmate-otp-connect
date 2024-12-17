import { Activity, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Actividades",
      icon: Activity,
      onClick: () => navigate("/student/activities"),
    },
    {
      title: "Configuración",
      icon: Settings,
      onClick: () => navigate("/student/settings"),
    },
  ];

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menú Estudiante</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton onClick={item.onClick}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="p-4">
        <SidebarTrigger />
      </div>
    </>
  );
};

export default StudentSidebar;