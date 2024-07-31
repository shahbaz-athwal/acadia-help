import { Course, Prisma } from ".prisma/client";
import db from "@repo/db/client";

export async function getAllCourses() {
  try {
    const courses = await db.course.findMany();
    return courses;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getCourseById(id: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id,
      },
      include: {
        professors: true,
        feedbacks: true,
      },
    });
    return course;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getAllDepartments() {
  try {
    const departments = await db.department.findMany();
    return departments;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function createCourse(data: Prisma.CourseCreateInput) {
  return await db.course.create({
    data: data
  })
}
