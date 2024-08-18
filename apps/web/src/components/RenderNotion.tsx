"use client";
import * as React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

export function RenderNotion({ recordMap }: { recordMap: ExtendedRecordMap }) {
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
