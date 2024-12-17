import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Plataforma Educativa
          </h1>
          <p className="text-xl text-gray-600">
            Un espacio dedicado al aprendizaje personalizado donde tutores y estudiantes
            pueden conectar y crecer juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="text-lg"
            >
              Acceso Tutores
            </Button>
            <Button
              onClick={() => navigate("/student/login")}
              size="lg"
              variant="outline"
              className="text-lg"
            >
              Acceso Estudiantes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;