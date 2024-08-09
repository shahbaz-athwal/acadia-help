"use server";
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notionx = new NotionAPI();
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const syllabusDatabaseId = process.env.NOTION_DATABASE_ID as string;

interface NotionResponse {
  id: string;
}

export async function getNotionPage(docId: string) {
  const { checkbox: showPage }: any = await notion.pages.properties.retrieve({
    page_id: docId,
    property_id: "uvOQ",
  });

  if (showPage) {
    const pageData = await notionx.getPage(docId);
    return pageData;
  }

  return null;
}

export const createNotionPageInDatabase = async ({
  code,
  name,
}: {
  code: string;
  name: string;
}) => {
  const response: NotionResponse = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: syllabusDatabaseId,
    },

    properties: {
      Name: {
        title: [
          {
            text: {
              content: code + " - " + name,
            },
          },
        ],
      },
      "Show Page": {
        checkbox: false,
      },
    },

    // children: [
    //   {
    //     object: "block",
    //     type: "heading_3",
    //     heading_3: {
    //       rich_text: [
    //         {
    //           type: "text",
    //           text: {
    //             content:
    //               "We are working to get the material for this course. Sorry for the inconvenience.",
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ],
  });

  return { success: true, docId: response.id };
};

export const getNotionDatabase = async () => {
  return await notion.databases.retrieve({
    database_id: syllabusDatabaseId,
  });
};
