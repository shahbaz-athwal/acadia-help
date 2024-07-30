import { NotionAPI } from "notion-client";

export async function getNotionPage(docId: string) {
  const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
  });
  
  return await notion.getPage(docId);
}

export default getNotionPage;
