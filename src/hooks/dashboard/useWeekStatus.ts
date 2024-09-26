import useMainStore from "@/store/MainStore";
import { getCurrentMondayDate } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useWeekStatus = () => {
  const [reportWeek, setreportWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const sessions = useMainStore((state) => state.session);
  useEffect(() => {
    const currentDate = getCurrentMondayDate();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sessionsByDay: any = [];
    const sessionsWeek = sessions.filter((session: any) => session.date.toDate() > currentDate);
    days.forEach((day) => {
      const sessionsByDayAux = sessionsWeek.some((session: any) => {
        //timestamp to date
        const nuevaFecha = new Date(session.date.seconds * 1000)
        return nuevaFecha.getDay() == days.indexOf(day)
      })
      sessionsByDay.push(sessionsByDayAux)
    })
    setreportWeek(sessionsByDay);
  }, [sessions]);

  return {
    reportWeek,
  };
};
