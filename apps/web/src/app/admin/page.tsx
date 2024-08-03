import { getAllDepartments } from "@/lib/dbQueries";
import CourseEditor from "./CourseEditor";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from "./AddCourse";
import AddProfessor from "./AddProfessor";
import AddDepartment from "./AddDepartment";

export default async function Page() {
  const departments = await getAllDepartments();
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="creator" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="creator">Creator</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creator">
          <AddCourse />
          <AddProfessor departments={departments}/>
          <AddDepartment/>

        </TabsContent>
        <TabsContent value="editor">
          
        </TabsContent>
      </Tabs>

      {/* {departments.map((department, i) => {
        return (
          <div key={i}>
            <h1 className="text-3xl p-2">{department.name}</h1>
            <div className="p-4">
              <CourseEditor prefix={department.prefix} />
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
