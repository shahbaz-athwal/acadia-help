"use client";
import { updateCourse } from "@/lib/dbQueries";
import { Professor, Course } from "@prisma/client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CourseCardProps extends Course {
  professors: Professor[];
}

const EditCourse = ({
  course,
  professors,
}: {
  course: CourseCardProps;
  professors: Professor[];
}) => {
  const [courseCode, setCourseCode] = useState(course.courseCode);
  const [courseName, setCourseName] = useState(course.courseName);
  const [description, setDescription] = useState(course.description);
  const [selectedProfessors, setSelectedProfessors] = useState<Professor[]>(
    course.professors
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfessorToggle = (id: number) => {
    setSelectedProfessors((alreadySelected) =>
      alreadySelected.some((prof) => prof.id === id)
        ? alreadySelected.filter((prof) => prof.id !== id)
        : [...alreadySelected, professors.find((prof) => prof.id === id)!]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const connectProfessors = selectedProfessors.map((professor) => ({
      id: professor.id,
    }));

    const disconnectProfessors = course.professors
      .filter((checkProf) =>
        selectedProfessors.every((prof) => prof.id !== checkProf.id)
      )
      .map((professor) => ({
        id: professor.id,
      }));

    await updateCourse(course.id, {
      courseCode,
      courseName,
      description,
      professors: {
        connect: connectProfessors,
        disconnect: disconnectProfessors,
      },
    });
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div>
        <p className="text-lg font-medium">
          {course.courseCode} - {course.courseName}
        </p>
        <p className="text-md text-gray-400">{course.description}</p>
        <p className="font-medium pt-1">Instructors:</p>
        <div className="grid grid-cols-2 p-2">
          {selectedProfessors.map((professor) => (
            <div key={professor.id}>- {professor.name}</div>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogTitle>Edit Course</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
              <div>
                <Label htmlFor="courseCode">Course Code</Label>
                <Input
                  id="courseCode"
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="text-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="text-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description ? description : ""}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Professors</Label>
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Search professor..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {professors.map((professor) => (
                      <CommandItem key={professor.id}>
                        <Checkbox
                          checked={selectedProfessors.some(
                            (selected) => selected.id === professor.id
                          )}
                          onCheckedChange={() =>
                            handleProfessorToggle(professor.id)
                          }
                        />
                        <span className="ml-2">{professor.name}</span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </div>
              <div className="w-full flex justify-end gap-8 pt-6">
                <DialogClose asChild>
                  <Button variant={"outline"} disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditCourse;
