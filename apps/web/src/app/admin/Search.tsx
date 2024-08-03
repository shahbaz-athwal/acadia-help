"use client";
import { Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
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
interface SearchResults {
  courses: Course[];
  professors: Professor[];
}

export function CommandDemo() {
  const [searchResults, setSearchResults] = useState<SearchResults>({
    courses: [],
    professors: [],
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await getAllResults();
      setSearchResults(result);
    };

    fetchInitialData();
  }, []);

  return (
    <Command className="rounded-lg border shadow-md max-w-2xl mx-auto mb-8">
      <CommandInput
        placeholder="search..."
        value={inputValue}
        onValueChange={(e) => setInputValue(e)}
      />
      <CommandList>
        {inputValue.trim() ? (
          <>
            <CommandGroup heading="Courses">
              {searchResults.courses.map((course) => (
                <CommandItem key={course.id}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{course.courseName}</span>
                  <div className="sr-only">{course.description} {course.courseCode}</div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Professors">
              {searchResults.professors.map((professor) => (
                <CommandItem key={professor.id}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{professor.name}</span>
                </CommandItem>
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
