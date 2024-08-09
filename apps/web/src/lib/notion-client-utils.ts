import { NotionAPI } from "notion-client";
import { getNotionPageProperties } from "./notion";
const notion = new NotionAPI();

export async function getNotionPageMap(docId: string) {
  const showPage = await getNotionPageProperties(docId);
  if (showPage) {
    const pageData = await notion.getPage(docId);
    return pageData;
  }

  return null;
}
