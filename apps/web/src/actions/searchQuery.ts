"use server";
import { Course, Professor } from "@prisma/client";
import db from "@repo/db/client";

interface SearchResults {
  courses: Course[];
  professors: Professor[];
}
export async function getAllResults(): Promise<SearchResults> {
  const courses = await db.course.findMany();
  const professors = await db.professor.findMany();
  return {
    courses,
    professors,
  };
}
