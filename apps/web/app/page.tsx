import RenderNotion from "../components/RenderNotion";
import { Course } from "@repo/db";
import { getAllCourses, getCourseById } from "../utils/dbQueries";
import { getNotionPage } from "../utils/notion-client-utils";
import { unstable_noStore } from "next/cache";

async function Home() {
  // const res = await createNotionPage("Test")
  // console.log(res)
  // await getNotionDatabase()
  unstable_noStore()
  const courses = await getAllCourses();
  console.log(courses);

  const course: Course | null = await getCourseById(
    "c990971c-8d4d-41ac-8b3a-bf984fffdc56"
  );
  console.log(course?.notionDocId);
  const docId = await getNotionPage(course?.notionDocId!);
  return (
    <>
      <RenderNotion recordMap={docId} />
    </>
  );
}

export default Home;
