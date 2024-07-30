import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionDatabaseId = process.env.NOTION_DATABASE_ID as string;

export const createNotionPage = async (title: string) => {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: notionDatabaseId,
    },

    properties: {
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
    },
  });

  const docId = title + "-" + response.id;

  console.log(docId)

  return { success: true, docId };
};
