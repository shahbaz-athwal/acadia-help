"use server";
import db from "@repo/db/client";
import { Prisma } from "@repo/db";

export async function updateCourse(id: string, data: Prisma.CourseUpdateInput) {
  console.log(data);
  const updatedCourse = await db.course.update({
    where: {
      id,
    },
    data: data,
  });

  console.log(updatedCourse)

  return updatedCourse;
}
