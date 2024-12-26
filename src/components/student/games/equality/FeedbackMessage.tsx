import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackMessageProps {
  isCorrect: boolean;
}

export function FeedbackMessage({ isCorrect }: FeedbackMessageProps) {
  return (
    <div className={`mt-4 p-6 rounded-md text-lg w-[600px] mx-auto ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {isCorrect ? (
        <>
          <CheckCircle className="inline-block mr-2 h-6 w-6" />
          ¡Muy bien! Tu respuesta es correcta.
        </>
      ) : (
        <>
          <XCircle className="inline-block mr-2 h-6 w-6" />
          Lo siento, tu respuesta no es correcta. Inténtalo de nuevo en el siguiente ejercicio.
        </>
      )}
    </div>
  );
}