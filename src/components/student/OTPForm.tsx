import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OTPFormProps {
  onSubmit: (otp: string) => void;
  isLoading: boolean;
}

export const OTPForm = ({ onSubmit, isLoading }: OTPFormProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim()) {
      onSubmit(otp.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Ingresa tu código OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
          className="text-center py-6 text-lg border-gray-200"
          disabled={isLoading}
          autoComplete="off"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full py-6 text-base bg-blue-400 hover:bg-blue-500" 
        disabled={isLoading || !otp.trim()}
      >
        {isLoading ? "Verificando..." : "Acceder"}
      </Button>
    </form>
  );
};