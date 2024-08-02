import { getCoursesByDepartment, getProfessorsByDepartment } from "@/lib/dbQueries";
import React from "react";
import EditCourse from "./EditCourse";
import { unstable_noStore as noStore } from "next/cache";
import EditProfessor from "./EditProfessor";
import EDIRPROFSHAD from "./EditProfShadUI";


const CourseEditor = async ({ prefix }: { prefix: string }) => {
  noStore()
  const courses = await getCoursesByDepartment(prefix);
  const professors = await getProfessorsByDepartment(prefix);
  return (
      // <div>
      //   {courses.map((course, i) => {
      //     return (
      //       <div className="py-2" key={i}>
      //         <EditCourse  course={course} professors={professors} />
      //       </div>
      //     );
      //   })}
      // </div>
      // <div>
      //   {professors.map((professor, i) => {
      //     return (
      //       <div className="py-2" key={i}>
      //         <EditProfessor  courses={courses} professor={professor} />
      //       </div>
      //     );
      //   })}
      // </div>
      <div>
        {professors.map((professor, i) => {
          return (
            <div className="py-2" key={i}>
              <EDIRPROFSHAD  courses={courses} professor={professor} />
            </div>
          );
        })}
      </div>
  );
};

export default CourseEditor;
