import RenderNotion from "../components/RenderNotion"
import getNotionpage from "../utils/getNotionpage"

async function Home() {
  const res = await getNotionpage()
  return (
    <>
     <RenderNotion recordMap={res} />
    </>
  )
}

export default Home