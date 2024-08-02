"use server";
import { Prisma } from ".prisma/client";
import db from "@repo/db/client";
import { createNotionPageInDatabase } from "./notion-hq";

export async function getAllCourses() {
  return await db.course.findMany();
}

export async function getCoursesByDepartment(prefix: string) {
  const courses = await db.course.findMany({
    where: {
      departmentPrefix: prefix,
    },
    include: {
      professors: true,
    },
  });
  return courses;
}

export async function getCourseById(id: string) {
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

export async function getAllDepartments() {
  return await db.department.findMany();
}

export async function addCourse(data: Prisma.CourseCreateInput) {
  const { docId } = await createNotionPageInDatabase({
    code: data.courseCode,
    name: data.courseName,
  });
  const course = await db.course.create({
    data: { ...data, docId },
  });

  return course;
}

export async function getProfessorsByDepartment(prefix: string) {
  const professors = await db.professor.findMany({
    where: {
      departmentPrefix: prefix,
    },
  });

  return professors;
}

export async function createProfessor(data: Prisma.ProfessorCreateInput) {
  console.log(data)
  return await db.professor.create({ data });
}

export async function getAllProfessors() {
  return await db.professor.findMany();
}

export async function createDepartment(data: Prisma.DepartmentCreateInput) {
  return await db.department.create({ data });
}
