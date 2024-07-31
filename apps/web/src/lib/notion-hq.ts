import { Client } from "@notionhq/client";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const syllabusDatabaseId = process.env.NOTION_DATABASE_ID as string;

interface NotionResponse {
  url?: string;
  id: string;
  object: string;
}

export const createNotionPageInDatabase = async ({ code, name }: any) => {
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
    },
  });

  const docId = response.url!.split("notion.so/")[1];

  return { success: true, docId };
};

export const getNotionDatabase = async () => {
  const response = await notion.databases.retrieve({
    database_id: syllabusDatabaseId,
  });
  console.log(response);
};

export const queryNotionDatabase = async () => {
  const response = await notion.databases.query({
    database_id: syllabusDatabaseId,
  });
  console.log(response);
};
