import Title from "@/components/ui/Title";
import { useAllRutinesContext } from "@/contexts/AllRutinesContext";
import { BarChartExample3 } from "@/components/charts/BarChart";
import {
  DayWorkout,
  ExerciceTable,
  RutineTable,
  WeekActivity,
} from "@/components/pages/Dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1>Landing Fitcount</h1>
      <Link href="/login">
        <Button>Log in</Button>
      </Link>
    </div>
  );
}
