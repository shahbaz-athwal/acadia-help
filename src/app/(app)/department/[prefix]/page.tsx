import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  getCoursesByDepartment,
  getProfessorsByDepartment,
} from "@/lib/dbQueries";
import Link from "next/link";

async function Page(props: { params: Promise<{ prefix: string }> }) {
  const params = await props.params;
  const courses = await getCoursesByDepartment(params.prefix); // Cache and revalidate on course update
  const professors = await getProfessorsByDepartment(params.prefix);

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="courses" className="max-w-5xl p-4 mt-6">
        <TabsList className="grid max-w-2xl mx-auto grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="professors">Professors</TabsTrigger>
        </TabsList>
        <TabsContent
          value="courses"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8"
        >
          {courses.map((course) => (
            <Card key={course.id} className="hover:bg-zinc-800">
              <Link
                href={`/course/${course.id}`}
                className="h-full flex-col flex justify-between"
              >
                <CardHeader>
                  <CardTitle className="text-lg">
                    {course.courseCode} - {course.courseName}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Explore</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value="professors"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8"
        >
          {professors.map((professor) => (
            <Card key={professor.id} className="hover:bg-zinc-800">
              <Link
                href={`/professor/${professor.id}`}
                className="h-full flex-col flex justify-between"
              >
                <CardHeader className="flex flex-row gap-4">
                  <div>
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={professor.image!}
                        alt={professor.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {professor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{professor.name}</CardTitle>
                    <CardDescription>{professor.bio}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button>Explore</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
