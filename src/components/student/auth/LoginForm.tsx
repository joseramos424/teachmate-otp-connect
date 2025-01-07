import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  code: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({ code, isLoading, onChange, onSubmit }: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Ingresa tu código de acceso"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          required
          maxLength={6}
          className="text-center text-2xl tracking-wider bg-[#F6F6F7] border-[#E5DEFF] focus:border-[#9b87f5] focus:ring-[#9b87f5]"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Verificando..." : "Acceder"}
      </Button>
    </form>
  );
};