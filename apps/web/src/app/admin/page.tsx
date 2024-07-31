import { getAllDepartments } from "@/lib/dbQueries";
import { SelectDemo } from "./Departments";
import AddCourse from "./CreateCourse";

export default async function Page() {
  const departments = await getAllDepartments();
  console.log(departments);
  return (
    <>
      <SelectDemo departments={departments} />
      <AddCourse />
    </>
  );
}
