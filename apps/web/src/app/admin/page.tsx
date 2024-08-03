import { getAllDepartments } from "@/lib/dbQueries";
import CourseEditor from "./CourseEditor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "./AddCourse";
import AddProfessor from "./AddProfessor";
import AddDepartment from "./AddDepartment";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page() {
  const departments = await getAllDepartments();
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Tabs defaultValue="creator" className="w-[800px] max-w-full mx-4">
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
            {departments.map((department, i) => {
              return (
                <div key={i}>
                  <h1 className="text-3xl p-2">{department.name}</h1>
                  <div className="p-4">
                    <CourseEditor prefix={department.prefix} />
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
