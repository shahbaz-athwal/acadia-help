import { getAllCourses, getAllDepartments, getProfessorsByDepartment } from "@/lib/dbQueries";
import { SelectDemo } from "./Departments";
import AddCourse from "./AddCourse";
import CourseEditor from "./CourseEditor";

export default async function Page() {
  // const departments = await getAllDepartments();
  // const professors = await getProfessorsByDepartment("COMP");
  // console.log(departments);
  // console.log(professors);
  const courses = await getAllCourses();
  console.log(courses[4]?.professors);
  return (
    <>
      {/* <SelectDemo departments={departments} /> */}
      {/* <AddCourse /> */}
      <CourseEditor courses={courses} />
    </>
  );
}
