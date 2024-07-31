"use server";
import { createCourse } from "@/lib/dbQueries";
import { createNotionPageInDatabase } from "@/lib/notion-hq";
import { Prisma } from "@repo/db";

export async function addCourse(data: Prisma.CourseCreateInput) {
  console.log(data);
  const { docId } = await createNotionPageInDatabase({
    code: data.courseCode,
    name: data.courseName,
  });
  const course = await createCourse({ ...data, docId });
  console.log(course)
}
