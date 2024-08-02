"use client";
import { updateProfessor } from "@/lib/dbQueries";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const handleSubmit = async () => {
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
  };

  return (
    <div>
      <div>
        <h3>{professorName}</h3>
        <p>{department}</p>
        <p>{bio}</p>
        <p>Courses:</p>
        <ul>
          {selectedCourses.map((course) => (
            <li key={course.id}>
              {course.courseCode} - {course.courseName}
            </li>
          ))}
        </ul>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Professor</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio!}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Courses</Label>
                {courses.map((course) => (
                  <div key={course.id} className="space-x-2 flex items-center ">
                    <Checkbox
                      checked={selectedCourses.some(
                        (selected) => selected.id === course.id
                      )}
                      onCheckedChange={() =>
                        handleCourseToggle(course.courseCode)
                      }
                    />
                    <div>
                      {course.courseCode} - {course.courseName}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end gap-8 pt-6">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditProfessor;
