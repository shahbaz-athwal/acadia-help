import { NotionAPI } from "notion-client";

export async function getNotionpage() {
  const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2
  })
  const recordMap = await notion.getPage("Syllabus-c111363b9d1c4bbca85797cae13caa9c");
  return recordMap;
}

export const dynamic = "auto";

export default getNotionpage;
