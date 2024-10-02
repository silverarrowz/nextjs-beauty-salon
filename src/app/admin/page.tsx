import { Progress } from "@/components/ui/progress";

export default async function Page() {
  const monthlyGoal = 60000;
  const earned = 30000;

  const progress = (earned / monthlyGoal) * 100;

  return (
    <div>
      <h1>Прибыль за период</h1>
      <Progress className="h-6" value={progress} />
    </div>
  );
}
