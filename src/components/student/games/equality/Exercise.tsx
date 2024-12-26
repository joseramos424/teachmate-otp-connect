import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from 'lucide-react';

interface ExerciseProps {
  exercise: {
    id: number;
    question: string;
    imageUrls: string[];
    correctAnswer: "equal" | "notEqual";
  };
  onAnswer: (answer: "equal" | "notEqual") => void;
  showResult: boolean;
  userAnswer: "equal" | "notEqual" | null;
}

export function Exercise({ exercise, onAnswer, showResult, userAnswer }: ExerciseProps) {
  const imageSize = exercise.imageUrls.length <= 3 ? "w-40 h-40" : "w-32 h-32";
  
  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-center">{exercise.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between min-h-[500px]">
        <div className="flex-1 w-full flex items-center justify-center py-8">
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-[580px]">
            {exercise.imageUrls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`Imagen ${index + 1}`} 
                className={`object-contain ${imageSize}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full space-y-6 pb-4">
          <RadioGroup
            onValueChange={(value) => onAnswer(value as "equal" | "notEqual")}
            value={userAnswer || ""}
            className="flex justify-center space-x-12"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id={`equal-${exercise.id}`} />
              <Label htmlFor={`equal-${exercise.id}`} className="text-lg">Iguales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notEqual" id={`notEqual-${exercise.id}`} />
              <Label htmlFor={`notEqual-${exercise.id}`} className="text-lg">No iguales</Label>
            </div>
          </RadioGroup>
          {showResult && (
            <div className="text-center text-lg">
              {userAnswer === exercise.correctAnswer ? (
                <CheckCircle className="inline-block text-green-500 mr-2 h-6 w-6" />
              ) : (
                <XCircle className="inline-block text-red-500 mr-2 h-6 w-6" />
              )}
              {userAnswer === exercise.correctAnswer ? "¡Correcto!" : "Incorrecto"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}