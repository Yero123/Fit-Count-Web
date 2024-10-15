import { getExercises } from "@/firebase/exercise.service";
import { getMuscles } from "@/firebase/muscles.service";
import { getRutines } from "@/firebase/rutine.service";
import { getSessions } from "@/firebase/sessions.service";
import { Exercise, Muscle, Rutine, Session } from "@/models";
import useMainStore from "@/store/MainStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export default function useGetMainData() {
  const updateRutines = useMainStore((state) => state.updateRutines);
  const updateExercices = useMainStore((state) => state.updateExercices);
  const updateMuscles = useMainStore((state) => state.updateMuscles);
  const updateSession = useMainStore((state) => state.updateSession);
  const updateLoading = useMainStore((state) => state.updateLoading);
  const updateRutineQuery = useMainStore((state) => state.updateRutineQuery);
  const updateExerciseQuery = useMainStore(
    (state) => state.updateExerciseQuery
  );
  const updateMuscleQuery = useMainStore((state) => state.updateMuscleQuery);
  const updateSessionQuery = useMainStore((state) => state.updateSessionQuery);
  let rutines = useQuery<Rutine[]>({
    queryKey: ["rutines"],
    queryFn: getRutines,
  });
  const exercises = useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
  const muscles = useQuery<Muscle[]>({
    queryKey: ["muscles"],
    queryFn: getMuscles,
  });
  const sessions = useQuery<Session[]>({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });

  useEffect(() => {
    if (rutines.data) {
      updateRutines(rutines.data);
      updateRutineQuery(rutines);
    }
  }, [rutines, rutines.data, updateRutineQuery, updateRutines]);
  useEffect(() => {
    if (exercises.data) {
      updateExercices(exercises.data);
      updateExerciseQuery(exercises);
      updateRutines(
        rutines.data?.map((rutine) => {
          return {
            ...rutine,
            exercises: (
              exercises?.data?.filter(
                (exercise) => exercise.idRutine === rutine.id
              ) ?? []
            ).map((exercise) => {
              return {
                ...exercise,
                rutine,
              };
            }),
          };
        }) as Rutine[]
      );
    }
  }, [
    exercises,
    exercises.data,
    rutines.data,
    updateExercices,
    updateExerciseQuery,
    updateRutines,
  ]);
  useEffect(() => {
    if (muscles.data) {
      updateMuscles(muscles.data);
      updateMuscleQuery(muscles);
    }
  }, [muscles, muscles.data, updateMuscleQuery, updateMuscles]);
  useEffect(() => {
    if (sessions.data) {
      updateSession(sessions.data);
      updateSessionQuery(sessions);
    }
  }, [sessions, sessions.data, updateSession, updateSessionQuery]);
  useEffect(() => {
    updateLoading(
      rutines.isLoading ||
        exercises.isLoading ||
        muscles.isLoading ||
        sessions.isLoading
    );
  }, [
    rutines.isLoading,
    exercises.isLoading,
    muscles.isLoading,
    updateLoading,
    sessions.isLoading,
  ]);
  useEffect(() => {
    if (
      rutines.isFetched &&
      exercises.isFetched &&
      muscles.isFetched &&
      sessions.isFetched
    ) {
      const newExercises = exercises.data?.map((exercise) => {
        return {
          ...exercise,
          sessions:
            sessions?.data?.filter(
              (session) => session.idExercise === exercise.id
            ) ?? [],
          muscles:
            muscles?.data?.filter((muscle) =>
              exercise?.idMuscles?.includes(muscle.id)
            ) ?? [],
          rutine: rutines.data?.find(
            (rutine) => rutine.id === exercise.idRutine
          ),
        };
      });
      const newRutines = rutines.data?.map((rutine) => {
        return {
          ...rutine,
          exercises: (
            exercises?.data?.filter(
              (exercise) => exercise.idRutine === rutine.id
            ) ?? []
          ).map((exercise) => {
            return {
              ...exercise,
              rutine,
            };
          }),
        };
      });
      updateRutines(newRutines as Rutine[]);
      updateExercices(newExercises as Exercise[]);
    }
  }, [
    exercises.data,
    exercises.isFetched,
    muscles?.data,
    muscles.isFetched,
    rutines.data,
    rutines.isFetched,
    sessions?.data,
    sessions.isFetched,
    updateExercices,
    updateRutines,
  ]);
}
