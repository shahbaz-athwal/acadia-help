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
        professor: true,
        feedbacks: true,
      },
    });
    return course;
  } catch (e) {
    console.error(e);
    return null;
  }
}
