import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const syllabusDatabaseId = process.env.NOTION_DATABASE_ID as string;

export const createPageInDatabase = async (title: string) => {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: syllabusDatabaseId,
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


