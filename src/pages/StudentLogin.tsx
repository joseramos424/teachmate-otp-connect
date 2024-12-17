import { OTPLogin } from "@/components/student/OTPLogin";

const StudentLogin = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido Estudiante
        </h1>
        <OTPLogin />
      </div>
    </div>
  );
};

export default StudentLogin;