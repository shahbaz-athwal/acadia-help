import { getAllDepartments } from "@/lib/dbQueries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "./AddCourse";
import AddProfessor from "./AddProfessor";
import AddDepartment from "./AddDepartment";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore()
  const departments = await getAllDepartments();
  return (
    <div className="flex justify-center mt-28">
      <Tabs defaultValue="editor" className="w-[800px] max-w-full mx-4">
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
            <div className="space-y-11">
              {departments.map((department, i) => {
                return (
                  <div key={i}>
                    <Link href={`/admin/departments/${department.prefix}`}>
                      <h1 className="text-3xl">{department.name}</h1>
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
