import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTutorAuth } from "@/hooks/useTutorAuth";

export const TutorOTPLogin = () => {
  const [otp, setOtp] = useState("");
  const { isLoading, verifyOTP } = useTutorAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOTP(otp);
  };

  return (
    <Card className="w-[350px] bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-[#1A1F2C]">
          Acceso Tutor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-label="Formulario de acceso tutor"
        >
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Ingresa tu código OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="text-center text-2xl tracking-wider bg-[#F6F6F7] border-[#E5DEFF] focus:border-[#9b87f5] focus:ring-[#9b87f5]"
              disabled={isLoading}
              aria-label="Código OTP"
              aria-required="true"
              aria-invalid={false}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Verificando..." : "Acceder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};