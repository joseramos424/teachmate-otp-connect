import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterTutorForm } from "@/components/auth/RegisterTutorForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterTutorForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}