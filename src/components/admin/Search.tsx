"use client";
import { Clipboard, User } from "lucide-react";
import { useState } from "react";
import { Course, Professor } from "@prisma/client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type SearchResults = {
  courses: Course[];
  professors: Professor[];
};

interface SearchProps {
  setDialogOpen?: (open: boolean) => void;
  initialResults: SearchResults;
}

export function SearchBox({ setDialogOpen, initialResults }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const path = usePathname();
  const redirectPath = path.startsWith("/admin") ? "/admin" : "";

  return (
    <Command className="rounded-none sm:rounded-lg border shadow-md max-w-2xl mx-auto">
      <CommandInput
        placeholder="Search any course or professor"
        value={inputValue}
        onValueChange={(e) => setInputValue(e)}
        autoFocus
      />
      <CommandList className="h-fit overflow-y-auto">
        {inputValue.trim() ? (
          <>
            <CommandGroup heading="Courses">
              {initialResults.courses.map((course) => (
                <Link
                  href={`${redirectPath}/course/${course.id}`}
                  key={course.id}
                >
                  <CommandItem
                    onSelect={() => {
                      router.push(`${redirectPath}/course/${course.id}`);
                      setDialogOpen && setDialogOpen(false);
                    }}
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    <span>
                      {course.courseCode} - {course.courseName}
                    </span>
                    <div className="sr-only">{course.description}</div>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Professors">
              {initialResults.professors.map((professor) => (
                <Link
                  href={`${redirectPath}/professor/${professor.id}`}
                  key={professor.id}
                >
                  <CommandItem
                    onSelect={() => {
                      router.push(`${redirectPath}/professor/${professor.id}`);
                      setDialogOpen && setDialogOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{professor.name}</span>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </>
        ) : (
          <div className="flex flex-col items-center italic text-xs text-zinc-600 py-4">
            <div>{'Try: "Darcy Benoit"'}</div>
            <div>{'or "comp1113"'}</div>
          </div>
        )}
      </CommandList>
    </Command>
  );
}
