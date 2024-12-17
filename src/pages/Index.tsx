import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Plataforma Educativa
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un espacio dedicado al aprendizaje personalizado donde tutores y estudiantes
            pueden conectar y crecer juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/login")}
              className="text-lg px-8 py-6"
              variant="default"
            >
              Acceso Tutores
            </Button>
            <Button
              onClick={() => navigate("/student/login")}
              className="text-lg px-8 py-6"
              variant="outline"
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