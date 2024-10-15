import Title from "@/components/ui/Title";
import { useAllRutinesContext } from "@/contexts/AllRutinesContext";
import { BarChartExample3 } from "@/components/charts/BarChart";
import {
  DayWorkout,
  ExerciceTable,
  RutineTable,
  WeekActivity,
} from "@/components/pages/Dashboard";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const {user} = useUser()
  return (
    <div>
      <div className="hidden md:block pt-5">
        <Title loading={false}>Rutines</Title>
      </div>
      <div className="xl:flex-nowrap flex gap-8 flex-wrap pt-5 md:pt-0">
        <RutineTable />
        <WeekActivity />
      </div>
      <div className=" flex-wrap flex lg:flex-nowrap gap-8 min-h-[40vh]">
        <BarChartExample3 />
        <ExerciceTable />
      </div>
    </div>
  );
}
