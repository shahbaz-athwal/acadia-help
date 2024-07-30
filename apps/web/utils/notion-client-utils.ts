import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

export async function getNotionPage(docId: string) {
  console.log(docId);
  return await notion.getPage(docId);
}


