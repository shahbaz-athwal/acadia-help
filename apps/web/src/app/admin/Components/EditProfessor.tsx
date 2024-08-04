"use client";
import { updateProfessor } from "@/lib/dbQueries";
import { Professor, Course } from "@prisma/client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
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
import { uploadProfilePicture } from "@/actions/uploadFile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfessorCardProps extends Professor {
  courses: Course[];
}

const EditProfessor = ({
  courses,
  professor,
}: {
  professor: ProfessorCardProps;
  courses: Course[];
}) => {
  const [professorName, setProfessorName] = useState(professor.name);
  const [department, setDepartment] = useState(professor.departmentPrefix);
  const [bio, setBio] = useState(professor.bio);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>(
    professor.courses
  );
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCourseToggle = (courseCode: string) => {
    setSelectedCourses((alreadySelected) =>
      alreadySelected.some((course) => course.courseCode === courseCode)
        ? alreadySelected.filter((course) => course.courseCode !== courseCode)
        : [
            ...alreadySelected,
            courses.find((course) => course.courseCode === courseCode)!,
          ]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e?.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await uploadProfilePicture(formData, professor.id);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }

    const connectCourses = selectedCourses.map((course) => ({
      courseCode: course.courseCode,
    }));

    const disconnectCourses = professor.courses
      .filter((checkCourse) =>
        selectedCourses.every(
          (course) => course.courseCode !== checkCourse.courseCode
        )
      )
      .map((course) => ({
        courseCode: course.courseCode,
      }));

    await updateProfessor(professor.id, {
      name: professorName,
      department: { connect: { prefix: department } },
      bio,
      courses: {
        connect: connectCourses,
        disconnect: disconnectCourses,
      },
    });
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={professor.image!}
              alt={professor.name}
              className="object-cover"
            />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
          <h3>{professorName}</h3>
        </div>
        <p className="text-md text-gray-400">{professor.bio}</p>
        <ul className="p-2">
          {selectedCourses.map((course) => (
            <li key={course.id}>
              {course.courseCode} - {course.courseName}
            </li>
          ))}
        </ul>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex justify-end pt-3">
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
            </DialogTrigger>
          </div>
          <DialogContent>
          <DialogTitle className="hidden">Edit Professor</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Label htmlFor="professorPicture">Picture</Label>
                <Input
                  id="professorPicture"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="file:text-zinc-400"
                />
              </div>
              <div className="flex gap-8">
                <div>
                  <Label htmlFor="professorName">Name</Label>
                  <Input
                    id="professorName"
                    type="text"
                    value={professorName}
                    onChange={(e) => setProfessorName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={bio ? bio : ""}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Courses</Label>
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Search course..." />
                  <CommandList className="max-h-[150px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {courses.map((course) => (
                      <CommandItem key={course.id}>
                        <Checkbox
                          checked={selectedCourses.some(
                            (selected) => selected.id === course.id
                          )}
                          onCheckedChange={() =>
                            handleCourseToggle(course.courseCode)
                          }
                        />
                        <span className="ml-2">
                          {course.courseCode} - {course.courseName}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </div>
              <div className="w-full flex justify-end gap-8 pt-2">
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

export default EditProfessor;
