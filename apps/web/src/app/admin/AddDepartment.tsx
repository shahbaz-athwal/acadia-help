"use client";
import { createDepartment } from "@/lib/dbQueries";
import { useState } from "react";

const AddDepartment = () => {
  const [prefix, setPrefix] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async () => {
    createDepartment({
      prefix,
      name: departmentName,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl justify-center flex flex-col bg-zinc-600 text-black"
    >
      <input
        type="text"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        placeholder="Department Prefix"
        required
      />
      <input
        type="text"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
        placeholder="Department Name"
        required
      />
      <button type="submit">Add Department</button>
    </form>
  );
};

export default AddDepartment;
