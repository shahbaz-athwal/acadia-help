"use server";
import { Prisma, Feedback } from "@prisma/client";
import db from "@repo/db/client";
import { createNotionPageInDatabase } from "./notion";
import { revalidateTag } from "next/cache";

export async function getAllCourses() {
  return await db.course.findMany();
}

export async function getAllProfessors() {
  return await db.professor.findMany();
}

export async function getAllDepartments() {
  return await db.department.findMany();
}

export async function getCoursesByDepartment(prefix: string) {
  return await db.course.findMany({
    where: {
      departmentPrefix: prefix,
    },
    include: {
      professors: true,
    },
  });
}

export async function getProfessorsByDepartment(prefix: string) {
  return await db.professor.findMany({
    where: {
      departmentPrefix: prefix,
    },
    include: {
      courses: true,
    },
  });
}

export async function getCourseById(id: string) {
  const course = await db.course.findUnique({
    where: {
      id,
    },
    include: {
      professors: true,
      feedbacks: {
        include: {
          professor: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return course;
}

export async function getProfessorById(id: number) {
  const professor = await db.professor.findUnique({
    where: {
      id,
    },
    include: {
      courses: true,
      feedbacks: {
        include: {
          course: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      department: true,
    },
  });
  return professor;
}

// "/rate" specific
export async function getCourseRateById(id: string) {
  return db.course.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      courseName: true,
      courseCode: true,
      professors: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

// "/rate" specific
export async function getProfessorRateById(id: number) {
  return db.professor.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      courses: {
        select: {
          id: true,
          courseCode: true,
          courseName: true,
        },
      },
    },
  });
}

export async function updateCourse(id: string, data: Prisma.CourseUpdateInput) {
  const updatedCourse = await db.course.update({
    where: {
      id,
    },
    data: data,
  });

  console.log(updatedCourse);
  return updatedCourse;
}

export async function updateProfessor(
  id: number,
  data: Prisma.ProfessorUpdateInput
) {
  const updatedProfessor = await db.professor.update({
    where: {
      id,
    },
    data,
  });

  console.log(updatedProfessor);
  return updatedProfessor;
}

export async function addCourse(data: Prisma.CourseCreateInput) {
  const { docId } = await createNotionPageInDatabase({
    code: data.courseCode,
    name: data.courseName,
  });
  const course = await db.course.create({
    data: { ...data, docId },
  });
  revalidateTag("search");
  return course;
}

export async function createProfessor(data: Prisma.ProfessorCreateInput) {
  await db.professor.create({ data });
  revalidateTag("search");
}

export async function createDepartment(data: Prisma.DepartmentCreateInput) {
  return await db.department.create({ data });
}

//Master Function
export async function getDetailedProfessorById(id: string) {
  const professor = await getProfessorById(Number(id));
  console.log(professor);
  const ratingCount = professor!.feedbacks.length;
  const ratingDistribution = await getRatingDistribution(professor, "quality");

  const avgDifficulty = (
    professor!.feedbacks.reduce((acc, { difficulty }) => acc + difficulty, 0) /
    ratingCount
  ).toFixed(1);

  const avgQuality = (
    professor!.feedbacks.reduce((acc, { quality }) => acc + quality, 0) /
    ratingCount
  ).toFixed(1);

  return {
    professor,
    ratingCount,
    ratingDistribution,
    avgDifficulty,
    avgQuality,
  };
}
//Master Function
export async function getDetailedCourseById(id: string) {
  const course = await getCourseById(id);
  const ratingCount = course!.feedbacks.length;
  const ratingDistribution = await getRatingDistribution(course, "difficulty");

  const avgDifficulty = (
    course!.feedbacks.reduce((acc, { difficulty }) => acc + difficulty, 0) /
    ratingCount
  ).toFixed(1);

  const avgQuality = (
    course!.feedbacks.reduce((acc, { quality }) => acc + quality, 0) /
    ratingCount
  ).toFixed(1);

  return {
    course,
    ratingCount,
    ratingDistribution,
    avgDifficulty,
    avgQuality,
  };
}
// Master Function Helper
export async function getRatingDistribution(
  entity: any,
  type: "quality" | "difficulty"
) {
  const ratingCounts: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (type === "quality") {
    entity.feedbacks.forEach((feedback: Feedback) => {
      ratingCounts[feedback.quality]!++;
    });
    return ratingCounts;
  } else {
    entity.feedbacks.forEach((feedback: Feedback) => {
      ratingCounts[6 - feedback.difficulty]!++;
    });
    return ratingCounts;
  }
}

export async function createRating(data: Prisma.FeedbackUncheckedCreateInput) {
  await db.feedback.create({
    data,
  });
}
