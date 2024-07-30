import RenderNotion from "../components/RenderNotion";
import { Course } from "@repo/db"
import { getAllCourses, getCourseById } from "../utils/dbQueries";
import { createNotionPage } from "../utils/notion/createNotionPage";
import getNotionPage from "../utils/notion/getNotionPage";

async function Home() {
  // const res = await createNotionPage("Test")
  // console.log(res)
  // const courses = await getAllCourses() 
  const courses: Course | null = await getCourseById("c990971c-8d4d-41ac-8b3a-bf984fffdc56") 
  console.log(courses?.notionDocId)
  const docId = await getNotionPage(courses?.notionDocId!);
  return (
    <>
      <RenderNotion recordMap={docId} />
    </>
  );
}

export default Home;
