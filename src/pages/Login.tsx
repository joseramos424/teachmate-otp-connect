import { TutorOTPLogin } from "@/components/tutor/OTPLogin";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F6F6F7] to-[#E5DEFF]">
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-sm p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#1A1F2C] mb-6 sm:mb-8">
          Plataforma Educativa
        </h1>
        <TutorOTPLogin />
        <div className="mt-4 sm:mt-6 text-center">
          <Button
            variant="ghost"
            className="text-[#7E69AB] hover:text-[#9b87f5] hover:bg-[#E5DEFF]/50 flex items-center gap-2"
            onClick={() => navigate("/student-login")}
          >
            <GraduationCap className="w-4 h-4" />
            Acceder como estudiante
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;