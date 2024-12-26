import { Button } from "@/components/ui/button";
import { ActivityResult } from "./types";

type ActivitySummaryProps = {
  activityResults: ActivityResult[];
};

export const ActivitySummary = ({ activityResults }: ActivitySummaryProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] bg-clip-text text-transparent">
        ¡Fenomenal! Has terminado
      </h1>
      <p className="text-lg mb-6 text-[#8E9196]">
        Aquí tienes un resumen de tu desempeño en cada actividad:
      </p>
      {activityResults.map((result, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-4 flex items-start">
          <h2 className="text-lg font-semibold mr-4 w-32 bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] bg-clip-text text-transparent">
            Actividad {index + 1}
          </h2>
          <div>
            <p className="text-sm mb-2 text-[#8E9196]">
              Secuencia: <span className="font-medium text-[#1A1F2C]">{result.start}, {result.answers.join(", ")}</span>
            </p>
            <p className="text-sm mb-2">
              Resultado: {result.success ? (
                <span className="text-green-600 font-semibold px-2 py-1 bg-green-100 rounded-full">
                  Correcto
                </span>
              ) : (
                <span className="text-red-600 font-semibold px-2 py-1 bg-red-100 rounded-full">
                  Incorrecto
                </span>
              )}
            </p>
            <p className="text-sm text-[#8E9196]">
              Número de intentos: <span className="font-semibold text-[#1A1F2C]">{result.attempts}</span>
            </p>
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-[#1A1F2C] to-[#1EAEDB] text-white hover:opacity-90 transition-opacity"
        >
          Volver a empezar
        </Button>
      </div>
    </div>
  );
};