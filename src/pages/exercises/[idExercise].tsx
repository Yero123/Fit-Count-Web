import FormSet from "@/components/FormSet";
import HistorialSection from "@/components/HistorialSection";
import SwitchExerciseView from "@/components/SwitchExerciseView";
import { LineChartExercise } from "@/components/charts/LineChartExercise";
import Layout from "@/components/layout";
import Title from "@/components/ui/Title";
import DoExerciseProvider, {
  useExerciseContext,
} from "@/contexts/DoExerciseContext";

import React from "react";

const ExercisePage = () => {
  return (
    <Layout>
      <div className=" flex flex-col ">
        <DoExerciseProvider>
          <Contenedor />
        </DoExerciseProvider>
      </div>
    </Layout>
  );
};

export default ExercisePage;

const Contenedor = ({ children }: any) => {
  const {
    loading,
    view,
    setview,
    sessionsByDate,
    data2,
    setloading,
    exercise,
    handleAddSession,
  } = useExerciseContext();
  return (
    <>
      <Title loading={loading}>{exercise?.name}</Title>
      <div className="w-full">
        <SwitchExerciseView />
        {"historial" === view && <HistorialSection />}
        {"estadisticas" === view && (
          <div className="h-[50vh]	flex pt-6 md:h-[65vh]">
            <LineChartExercise data={data2} />
          </div>
        )}
      </div>
      <FormSet />
    </>
  );
};
