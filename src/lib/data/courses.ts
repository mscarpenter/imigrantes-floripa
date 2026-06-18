import type { Course } from "./types";
import coursesData from "./courses.json";

/** Cursos gratuitos publicados no portal (após revisão humana). */
export const courses: Course[] = coursesData as Course[];
