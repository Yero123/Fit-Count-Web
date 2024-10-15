import useMainStore from "@/store/MainStore";
import { getCurrentMondayDate, getRangeWeek } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useRutineStatus = () => {
  const [dataTable, setDataTable] = useState<any[]>([]);
  const rutines = useMainStore((state) => state.rutines);

  useEffect(() => {
    const getDataFormRutineTable = (): {
      name: string;
      link: string;
      status: string;
      lastModification: string;
      progress: number;
    }[] => {
      const currentDate = getCurrentMondayDate();

      return rutines?.map((rutine) => {
        let status = "No iniciado";
        let lastModification = "No encontrado";
        let progress = 0;
        let maxSessions = 16;
        let totalSessions = 0;

        const currentDate = getCurrentMondayDate();
        rutine.exercises.forEach((exercise) => {
          if (exercise.sessions) {
            exercise.sessions
              .filter((session) => {
                return session.date.toDate() > currentDate;
              })
              .forEach((session) => {
                if (session.date.seconds > currentDate.getTime() / 1000) {
                  status = "En progreso";
                  totalSessions++;
                }
                if (
                  session.date.seconds > lastModification ||
                  lastModification == "No encontrado"
                ) {
                  lastModification = new Date(
                    session.date.seconds * 1000
                  ).toLocaleDateString("en-GB");
                }
              });
          }
        });
        progress = (totalSessions / maxSessions) * 100;
        if (progress >= 100) {
          status = "Completado";
        }
        return {
          name: rutine.name,
          link: `/rutines/${rutine.id}`,
          status: status,
          lastModification: lastModification,
          progress: progress,
        };
      });
    };
    setDataTable(getDataFormRutineTable());
  }, [rutines]);
  return { dataTable };
};
