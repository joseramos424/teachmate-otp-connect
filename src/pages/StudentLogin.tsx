import { OTPLogin } from "@/components/student/OTPLogin";

const StudentLogin = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-end justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mr-0 ml-auto flex flex-col items-center gap-6 pr-4 sm:pr-8 lg:pr-16">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Bienvenido Estudiante
        </h1>
        <OTPLogin />
      </div>
    </div>
  );
};

export default StudentLogin;