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
import { usePathname, useRouter } from "next/navigation";

interface SearchResults {
  courses: Course[];
  professors: Professor[];
}

interface SearchProps {
  setDialogOpen?: (open: boolean) => void;
}

export function SearchBox({ setDialogOpen }: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchResults>({
    courses: [],
    professors: [],
  });

  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const path = usePathname();
  const redirectPath = path.startsWith("/admin") ? "/admin" : "";
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
        placeholder="Search any course or professor"
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
              {searchResults.professors.map((professor) => (
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
            <div>Try: "Darcy Benoit"</div>
            <div>or "comp1113"</div>
          </div>
        )}
      </CommandList>
    </Command>
  );
}
