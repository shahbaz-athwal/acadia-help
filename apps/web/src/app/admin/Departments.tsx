"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department } from "@repo/db";

interface SelectDemoProps {
  departments: Department[];
}

export const SelectDemo: React.FC<SelectDemoProps> = ({ departments }) => {
  const handleValueChange = (val: string) => {
    console.log(val);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departments</SelectLabel>
          {departments.map((department) => (
            <SelectItem key={department.prefix} value={department.name}>
              {department.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
