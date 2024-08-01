import { getAllProfessors } from "@/lib/dbQueries";
import { Course, Professor } from "@prisma/client";

import React from "react";
import EditCourse from "./EditCourse";

interface CourseCardProps extends Course {
  professors: Professor[];
}
const CourseEditor = async ({ courses }: { courses: CourseCardProps[] }) => {
  const professorss = await getAllProfessors();
  return (
    <>
      <div>
        {courses.map((course, i) => {
          return <EditCourse key={i} course={course} professors={professorss} />;
        })}
      </div>
    </>
  );
};

export default CourseEditor;
