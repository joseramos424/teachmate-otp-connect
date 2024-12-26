import { useStudentActivities } from "@/hooks/useStudentActivities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SessionResults = () => {
  const studentId = sessionStorage.getItem('studentId');
  const { data: activities } = useStudentActivities(studentId);

  const completedActivities = activities?.filter(
    (activity) => activity.completed_at && activity.results
  ) || [];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to="/student/dashboard" 
          className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al panel
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          Resultados de Sesiones
        </h1>
      </div>

      <div className="grid gap-6">
        {completedActivities.map((activity) => {
          const results = activity.results as { correct: number; total: number };
          const percentage = ((results.correct / results.total) * 100).toFixed(1);
          
          return (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{activity.activity_title}</span>
                  <span className={`text-lg ${
                    Number(percentage) >= 70 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {percentage}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>Aciertos: {results.correct}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-500 h-5 w-5" />
                    <span>Fallos: {results.total - results.correct}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Completado: {new Date(activity.completed_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {completedActivities.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No hay sesiones completadas todavía.
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionResults;