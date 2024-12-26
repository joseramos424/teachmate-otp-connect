import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Actividades Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{pendingActivities.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividades Completadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{completedActivities.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total de Actividades</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{totalActivities}</p>
        </CardContent>
      </Card>
    </div>
  );
};