"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProfessor } from "@/lib/dbQueries";
import { Department } from "@prisma/client";
import { useState } from "react";

const AddProfessor = ({ departments }: { departments: Department[] }) => {
  const [professorName, setProfessorName] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    await createProfessor({
      name: professorName,
      department: { connect: { prefix: department } },
      bio,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl justify-center flex flex-col bg-zinc-600 text-black"
    >
      <input
        type="text"
        value={professorName}
        onChange={(e) => setProfessorName(e.target.value)}
        placeholder="Professor Name"
        required
      />

      <Select onValueChange={setDepartment}>
        <SelectTrigger className="w-[180px] text-white">
          <SelectValue placeholder="Select a department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Departments</SelectLabel>
            {departments.map((department) => (
              <SelectItem key={department.prefix} value={department.prefix}>
                {department.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Professor</button>
    </form>
  );
};

export default AddProfessor;
