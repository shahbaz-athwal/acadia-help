import { getCoursesByDepartment, getProfessorsByDepartment } from "@/lib/dbQueries";
import React from "react";
import EditCourse from "./EditCourse";
import { unstable_noStore as noStore } from "next/cache";


const CourseEditor = async ({ prefix }: { prefix: string }) => {
  noStore()
  const courses = await getCoursesByDepartment(prefix);
  const professorss = await getProfessorsByDepartment(prefix);
  return (
      <div>
        {courses.map((course, i) => {
          return (
            <div className="py-2" key={i}>
              <EditCourse  course={course} professors={professorss} />
            </div>
          );
        })}
      </div>
  );
};

export default CourseEditor;
