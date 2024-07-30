import RenderNotion from "../components/RenderNotion";
import { createNotionPage } from "../utils/notion/createNotionPage";
import getNotionPage from "../utils/notion/getNotionPage";

async function Home() {
  // const res = await createNotionPage("Test")
  // console.log(res)
  const docId = await getNotionPage("Test-08dfddc2-3e98-4565-8e7f-dafe49cf9119");
  return (
    <>
      <RenderNotion recordMap={docId} />
    </>
  );
}

export default Home;
