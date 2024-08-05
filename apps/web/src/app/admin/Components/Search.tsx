"use client";
import { Clipboard, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Course, Professor } from "@prisma/client";
import { getAllResults } from "@/actions/searchQuery";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResults {
  courses: Course[];
  professors: Professor[];
}

export function SearchBox() {
  const [searchResults, setSearchResults] = useState<SearchResults>({
    courses: [],
    professors: [],
  });

  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await getAllResults();
      setSearchResults(result);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "KeyK") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Command className="rounded-none sm:rounded-lg border shadow-md max-w-2xl mx-auto">
      <CommandInput
        placeholder="search..."
        value={inputValue}
        onValueChange={(e) => setInputValue(e)}
        ref={inputRef}
        autoFocus
      />
      <CommandList className="h-fit overflow-y-auto">
        {inputValue.trim() ? (
          <>
            <CommandGroup heading="Courses">
              {searchResults.courses.map((course) => (
                <Link href={"/admin/course/" + course.id} key={course.id}>
                  <CommandItem
                    onSelect={() => {
                      router.push(`/admin/course/${course.id}`);
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
              {searchResults.professors.map((professor) => (
                <Link
                  href={"/admin/professor/" + professor.id}
                  key={professor.id}
                >
                  <CommandItem
                    onSelect={() => {
                      router.push(`/admin/professor/${professor.id}`);
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
            <div>Try: "Darcy Benoit"</div>
            <div>or "comp1113"</div>
          </div>
        )}
      </CommandList>
    </Command>
  );
}
