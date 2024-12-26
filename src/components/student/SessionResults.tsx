import { useStudentActivities } from "@/hooks/useStudentActivities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const SessionResults = () => {
  const studentId = sessionStorage.getItem('studentId');
  const { data: activities } = useStudentActivities(studentId);

  const completedActivities = activities?.filter(
    (activity) => activity.completed_at && activity.results
  ) || [];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F6F6F7] to-[#E5DEFF] p-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/student/dashboard" 
            className="text-sm text-[#9b87f5] hover:text-[#7E69AB] flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al panel
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">
          Resultados de Sesiones
        </h1>
        <p className="text-[#8E9196]">
          Revisa tu progreso y resultados de las actividades completadas
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {completedActivities.map((activity) => {
          const results = activity.results as { correct: number; total: number };
          const percentage = ((results.correct / results.total) * 100).toFixed(1);
          const isGoodScore = Number(percentage) >= 70;
          
          return (
            <Card 
              key={activity.id} 
              className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-semibold text-[#1A1F2C] flex items-center gap-2">
                    {activity.activity_title}
                    {isGoodScore && <Trophy className="h-5 w-5 text-[#9b87f5]" />}
                  </CardTitle>
                  <p className="text-sm text-[#8E9196]">
                    Completado: {new Date(activity.completed_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-lg font-bold px-4 py-1 rounded-full ${
                  isGoodScore 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {percentage}%
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-[#1A1F2C]">
                      Aciertos: <strong>{results.correct}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-500 h-5 w-5" />
                    <span className="text-[#1A1F2C]">
                      Fallos: <strong>{results.total - results.correct}</strong>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {completedActivities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-[#E5DEFF]">
            <p className="text-[#8E9196] text-lg">
              No hay sesiones completadas todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionResults;