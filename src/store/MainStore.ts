import { Exercise, Muscle, Rutine, Session } from "@/models";
import { UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";

type State = {
  rutines: Rutine[];
  rutineQuery: UseQueryResult<Rutine[], Error> | undefined;
  exercises: Exercise[];
  exerciseQuery: UseQueryResult<Exercise[], Error> | undefined;
  muscles: Muscle[];
  muscleQuery: UseQueryResult<Muscle[], Error> | undefined;
  session: Session[];
  sessionQuery: UseQueryResult<Session[], Error> | undefined;
  loading: boolean;
};

type Action = {
  updateRutines: (rutines: State["rutines"]) => void;
  updateExercices: (exercises: State["exercises"]) => void;
  updateMuscles: (muscles: State["muscles"]) => void;
  updateLoading: (loading: State["loading"]) => void;
  updateSession: (session: State["session"]) => void;
  updateRutineQuery: (rutineQuery: State["rutineQuery"]) => void;
  updateExerciseQuery: (exerciseQuery: State["exerciseQuery"]) => void;
  updateMuscleQuery: (muscleQuery: State["muscleQuery"]) => void;
  updateSessionQuery: (sessionQuery: State["sessionQuery"]) => void;
};

// Create your store, which includes both state and (optionally) actions
const useMainStore = create<State & Action>((set) => ({
  rutines: [],
  exercises: [],
  muscles: [],
  session: [],
  rutineQuery: undefined,
  exerciseQuery: undefined,
  muscleQuery: undefined,
  sessionQuery: undefined,
  loading: true,
  updateRutines: (rutines) => set(() => ({ rutines: rutines })),
  updateExercices: (exercises) => set(() => ({ exercises: exercises })),
  updateMuscles: (muscles) => set(() => ({ muscles: muscles })),
  updateSession: (session) => set(() => ({ session: session })),
  updateLoading: (loading) => set(() => ({ loading: loading })),
  updateRutineQuery: (rutineQuery) => set(() => ({ rutineQuery: rutineQuery })),
  updateExerciseQuery: (exerciseQuery) => set(() => ({ exerciseQuery: exerciseQuery })),
  updateMuscleQuery: (muscleQuery) => set(() => ({ muscleQuery: muscleQuery })),
  updateSessionQuery: (sessionQuery) => set(() => ({ sessionQuery: sessionQuery })),
}));

export default useMainStore;
