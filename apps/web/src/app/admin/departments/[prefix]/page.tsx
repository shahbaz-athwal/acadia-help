import {
  getCoursesByDepartment,
  getProfessorsByDepartment,
} from "@/lib/dbQueries";
import EditProfessor from "../../EditProfessor";
import EditCourse from "../../EditCourse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";

async function Page({ params }: { params: { prefix: string } }) {
  noStore();
  const courses = await getCoursesByDepartment(params.prefix);
  const professors = await getProfessorsByDepartment(params.prefix);
  
  return (
    <>
      <Link href="/admin">
        <Button variant={"outline"}>Back</Button>
      </Link>
      <div>{params.prefix}</div>
      {/* <div>
        {courses.map((course, i) => {
          return (
            <div className="py-2" key={i}>
              <EditCourse course={course} professors={professors} />
            </div>
          );
        })}
      </div> */}
      <div>
        {professors.map((professor, i) => {
          return (
            <div className="py-2" key={i}>
              <EditProfessor courses={courses} professor={professor} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Page;
