export interface Rutine {
  id: string;
  name: string;
  active: boolean;
  idExercises: string[];

  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  active: boolean;
  idRutines: string[];
  idMuscles: string[];

  sessions: Session[];
  muscles: Muscle[];
}

export interface Muscle {
  id: string;
  name: string;
  idExercises: string[];

  exercises: Exercise[];
}
export interface Session {
  id: string;
  date: any;
  weight: number;
  repetitions: number;
  idExercise: string;
  idRutine: string;

  exercise: Exercise;
  rutine: Rutine;
}
