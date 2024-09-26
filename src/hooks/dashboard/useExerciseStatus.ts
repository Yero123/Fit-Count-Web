import useMainStore from "@/store/MainStore";
import { getCurrentMondayDate, getRangeWeek } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useExerciseStatus = () => {
    const [dataTable, setDataTable] = useState<any[]>([]);
  const rutines = useMainStore((state) => state.rutines);

  useEffect(() => {
    const getDataFromExerciseTable = () => {
      const currentDate = getCurrentMondayDate();
      let data: any[] = [];
      rutines.forEach((rutine) => {
        rutine.exercises.forEach((exercise) => {
          let status = "No iniciado";
          let lastModification = "No encontrado";
          let lastModification2 = "No encontrado";
          let progress = 0;
          let maxSessions = 16;
          let totalSessions = 0;
          let range1: any;
          let range2: any;
          let record1 = 0;
          let record2 = 0;
          if (exercise.sessions) {
            if (exercise.id == "8MmaQZSrP7EWZuwsDbut") {
            }
            exercise.sessions
              .sort((a, b) => {
                return b.date.seconds - a.date.seconds;
              })
              .filter((session) => {
                return session.date.toDate() > currentDate;
              })
              .forEach((session) => {
                const dateSession = new Date(session.date.seconds * 1000);

                const [start, end] = getRangeWeek(dateSession);
                if (range1 == undefined) {
                  range1 = [start, end];
                }
                if (exercise.id == "8MmaQZSrP7EWZuwsDbut") {
                }
                if (range1[0] == start && range1[1] == end) {
                  record1 = record1 + session.weight * session.repetitions;
                  if (exercise.id == "8MmaQZSrP7EWZuwsDbut") {
                  }
                } else {
                  if (range2 == undefined) {
                    range2 = [start, end];
                  }
                  if (range2[0] == start && range2[1] == end) {
                    record2 = record2 + session.weight * session.repetitions;
                  }
                }
              });
          }
          progress = (totalSessions / maxSessions) * 100;
          data.push({
            name: exercise.name,
            link: `/exercises/${exercise.id}`,
            record1: record1,
            record2: record2,
          });
        });
      });
      return data;
    };
    setDataTable(getDataFromExerciseTable());
  }, [rutines]);
  return { dataTable };
}