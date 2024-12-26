import { TutorOTPLogin } from "@/components/tutor/OTPLogin";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F6F6F7] to-[#E5DEFF]">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-[#1A1F2C] mb-8">
          Plataforma Educativa
        </h1>
        <TutorOTPLogin />
      </div>
    </div>
  );
};

export default Login;