import { getAllDepartments } from "@/lib/dbQueries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "../../components/admin/AddCourse";
import AddProfessor from "../../components/admin/AddProfessor";
import AddDepartment from "../../components/admin/AddDepartment";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();
  const departments = await getAllDepartments();
  return (
    <div className="flex flex-col justify-center items-center mt-24 mx-4">
      <Tabs defaultValue="creator" className="w-[800px] max-w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="creator">Creator</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>

        <TabsContent
          value="creator"
          className="flex flex-col items-center space-y-3 pt-4"
        >
          <AddCourse />
          <AddProfessor departments={departments} />
          <AddDepartment />
        </TabsContent>
        <TabsContent value="editor">
          <ScrollArea className="w-full h-[70vh] pt-4">
            <div className="space-y-4">
              {departments.map((department, i) => {
                return (
                  <div key={i}>
                    <Link href={`/admin/department/${department.prefix}`}>
                      <div className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700">
                        {department.name}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
