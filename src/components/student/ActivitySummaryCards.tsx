import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, ListTodo } from "lucide-react";

type ActivitySummaryCardsProps = {
  pendingActivities: any[];
  completedActivities: any[];
  totalActivities: number;
};

export const ActivitySummaryCards = ({
  pendingActivities,
  completedActivities,
  totalActivities,
}: ActivitySummaryCardsProps) => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Resumen de actividades"
    >
      <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Actividades Pendientes</CardTitle>
          <Clock className="h-5 w-5 text-[#9b87f5]" />
        </CardHeader>
        <CardContent>
          <p 
            className="text-3xl font-bold text-[#1A1F2C]"
            aria-live="polite"
          >
            {pendingActivities.length}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Actividades Completadas</CardTitle>
          <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
        </CardHeader>
        <CardContent>
          <p 
            className="text-3xl font-bold text-[#1A1F2C]"
            aria-live="polite"
          >
            {completedActivities.length}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Total de Actividades</CardTitle>
          <ListTodo className="h-5 w-5 text-[#9b87f5]" />
        </CardHeader>
        <CardContent>
          <p 
            className="text-3xl font-bold text-[#1A1F2C]"
            aria-live="polite"
          >
            {totalActivities}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};