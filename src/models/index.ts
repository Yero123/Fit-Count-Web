export interface Rutine {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  idRutine: string;
  name: string;
  id: string;
  active: boolean;
  sessions: Session[];
}

export interface Session {
  date: any;
  weight: number;
  repetitions: number;
  idExercise: string;
  id: string;
}
