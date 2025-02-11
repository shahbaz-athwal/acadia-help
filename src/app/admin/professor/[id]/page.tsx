import { getCoursesByDepartment, getProfessorById } from "@/lib/dbQueries";
import EditProfessor from "../../../../components/admin/EditProfessor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const professor = await getProfessorById(Number(params.id));
  const courses = await getCoursesByDepartment(professor?.departmentPrefix!); //XXXX

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Link href="/admin">
        <Button variant="outline" className="mb-12">
          /admin
        </Button>
      </Link>
      <EditProfessor professor={professor!} courses={courses} />
    </div>
  );
}

export default Page;
