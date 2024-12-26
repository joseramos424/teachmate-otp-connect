import { Input } from "@/components/ui/input";

interface NumberInputProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  isCorrect: boolean | null;
}

export const NumberInput = ({ id, value, onChange, isCorrect }: NumberInputProps) => {
  return (
    <Input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className={`w-16 mx-2 text-center ${
        isCorrect === true ? 'border-green-500 bg-green-50' : 
        isCorrect === false ? 'border-red-500 bg-red-50' : ''
      }`}
    />
  );
};