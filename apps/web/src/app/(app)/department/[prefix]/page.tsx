import {
    getCoursesByDepartment,
    getProfessorsByDepartment,
  } from "@/lib/dbQueries";
  
  async function Page({ params }: { params: { prefix: string } }) {
    const courses = await getCoursesByDepartment(params.prefix);
    const professors = await getProfessorsByDepartment(params.prefix);
  
    return (
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        hi
      </div>
    );
  }
  
  export default Page;
  