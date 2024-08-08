"use client";
import * as React from "react";
import { NotionRenderer } from "react-notion-x";

export function RenderNotion({ recordMap }: any) {
  return (
    <NotionRenderer
      disableHeader
      className="rounded-3xl justify-center bg-zinc-700/50 m-4 h-[200px]"
      recordMap={recordMap}
      fullPage={false}
      darkMode
    />
  );
}

export default RenderNotion;
