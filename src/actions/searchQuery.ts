"use server";
import { Course, Professor } from "@prisma/client";
import db from "../lib/db";

interface SearchResults {
  courses: Course[];
  professors: Professor[];
}
export async function getAllResults(): Promise<SearchResults> {
  console.log("HIT");
  const [courses, professors] = await Promise.all([
    db.course.findMany(),
    db.professor.findMany(),
  ]);
  return {
    courses,
    professors,
  };
}
