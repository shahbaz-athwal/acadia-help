import {
  getCoursesByDepartment,
  getProfessorsByDepartment,
} from "@/lib/dbQueries";
import EditProfessor from "../../EditProfessor";
import EditCourse from "../../EditCourse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";
import { ScrollArea } from "@/components/ui/scroll-area";

async function Page({ params }: { params: { prefix: string } }) {
  noStore();
  const courses = await getCoursesByDepartment(params.prefix);
  const professors = await getProfessorsByDepartment(params.prefix);

  return (
    <div className="p-6 space-y-6">
      <Link href="/admin">
        <Button variant="outline" className="mb-4">
          Back
        </Button>
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <ScrollArea className="w-full max-w-2xl h-[70vh] bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Courses</h2>
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div
                className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md"
                key={i}
              >
                <EditCourse course={course} professors={professors} />
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="w-full max-w-2xl h-[70vh] bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Professors</h2>
          <div className="space-y-4">
            {professors.map((professor, i) => (
              <div
                className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md"
                key={i}
              >
                <EditProfessor courses={courses} professor={professor} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Page;
