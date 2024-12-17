import { OTPLogin } from "@/components/student/OTPLogin";

const StudentLogin = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido Estudiante
        </h1>
        <OTPLogin />
      </div>
    </div>
  );
};

export default StudentLogin;