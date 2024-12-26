import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const OTPLogin = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting to verify permanent code:', code);
      
      // First check if the code exists at all
      const { data: codeData, error: codeError } = await supabase
        .from("permanent_student_codes")
        .select(`
          *,
          students (
            id,
            first_name,
            last_name
          )
        `)
        .eq("code", code)
        .maybeSingle();

      console.log('Query result:', { codeData, codeError });

      if (codeError) {
        console.error('Error checking code:', codeError);
        toast.error("Error al verificar el código");
        return;
      }

      if (!codeData) {
        console.log('No code found');
        toast.error("Código inválido");
        return;
      }

      if (!codeData.is_assigned) {
        console.log('Code exists but is not assigned');
        toast.error("Código no asignado");
        return;
      }

      if (!codeData.students) {
        console.error('No student associated with code');
        toast.error("No se encontró el estudiante asociado al código");
        return;
      }

      // Store student information in sessionStorage
      sessionStorage.setItem('studentId', codeData.students.id);
      sessionStorage.setItem('studentName', `${codeData.students.first_name} ${codeData.students.last_name}`);

      toast.success("Acceso concedido");
      navigate("/student/dashboard");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Acceso Estudiante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Ingresa tu código de acceso"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              className="text-center text-2xl tracking-wider"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};