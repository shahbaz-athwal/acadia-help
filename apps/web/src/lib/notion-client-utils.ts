import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export async function getNotionPage(docId: string) {
  return await notion.getPage(docId);
}
