//notion-client causes build error if used in server actions.
import { getNotionPageProperties } from "@/lib/notion";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export async function POST(req: Request) {
  const { docId } = await req.json();

  const showPage = await getNotionPageProperties(docId);
  if (showPage) {
    const data = await notion.getPage(docId);
    return Response.json({
      success: true,
      data,
    });
  }
  return Response.json({
    success: false,
    data: null,
  });
}
