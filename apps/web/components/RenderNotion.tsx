"use client"
import * as React from "react";
import { NotionRenderer } from "react-notion-x";

export function RenderNotion({ recordMap }: any) {
  return (
  <NotionRenderer recordMap={recordMap} fullPage={true} />
    
  )
}

export default RenderNotion
