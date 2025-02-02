import { getCourseById, getProfessorsByDepartment } from "@/lib/dbQueries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditCourse from "../../../../components/admin/EditCourse";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const course = await getCourseById(params.id);
  const professors = await getProfessorsByDepartment(course?.departmentPrefix!); //XXXX

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Link href="/admin">
        <Button variant="outline" className="mb-12">
          /admin
        </Button>
      </Link>
      <EditCourse course={course!} professors={professors} />
    </div>
  );
}

export default Page;
