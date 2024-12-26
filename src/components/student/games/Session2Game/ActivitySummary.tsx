import { Button } from "@/components/ui/button";
import { ActivityResult } from "./types";

type ActivitySummaryProps = {
  activityResults: ActivityResult[];
};

export const ActivitySummary = ({ activityResults }: ActivitySummaryProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">¡Fenomenal! Has terminado</h1>
      <p className="text-lg mb-4">Aquí tienes un resumen de tu desempeño en cada actividad:</p>
      {activityResults.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-start">
          <h2 className="text-lg font-semibold mr-4 w-32">Actividad {index + 1}</h2>
          <div>
            <p className="text-sm mb-1">
              Secuencia: {result.start}, {result.answers.join(", ")}
            </p>
            <p className="text-sm mb-1">
              Resultado: {result.success ? (
                <span className="text-green-600 font-semibold">Correcto</span>
              ) : (
                <span className="text-red-600 font-semibold">Incorrecto</span>
              )}
            </p>
            <p className="text-sm">
              Número de intentos: <span className="font-semibold">{result.attempts}</span>
            </p>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Button onClick={() => window.location.reload()} className="text-lg bg-gray-500 hover:bg-gray-600 text-white">
          Volver a empezar
        </Button>
      </div>
    </div>
  );
};