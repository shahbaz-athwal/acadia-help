import { getAllDepartments } from "@/lib/dbQueries";
import CourseEditor from "./CourseEditor";
import AddDepartment from "./AddDepartment";
import AddProfessor from "./AddProfessor";

export default async function Page() {

  const departments = await getAllDepartments();
  return (
    <div>
      {/* <AddDepartment />
      {departments.map((department, i) => {
        return (
          <div key={i}>
            <h1 className="text-3xl p-2">{department.name}</h1>
            <div className="p-4">
              <CourseEditor prefix={department.prefix} />
            </div>
          </div>
        );
      })} */}
      <AddProfessor departments={departments} />
    </div>
  );
}
