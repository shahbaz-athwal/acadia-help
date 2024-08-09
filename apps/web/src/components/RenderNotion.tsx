"use client";
import * as React from "react";
import { NotionRenderer } from "react-notion-x";

export function RenderNotion({ recordMap }: any) {
  return (
    <NotionRenderer
      disableHeader
      pageTitle={false}
      className="rounded-3xl justify-center bg-zinc-700/50 h-fit"
      recordMap={recordMap}
      fullPage={false}
      darkMode
    />
  );
}

export default RenderNotion;
