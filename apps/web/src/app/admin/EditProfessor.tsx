"use client";
import { updateProfessor } from "@/lib/dbQueries";
import { Professor, Course } from "@prisma/client";
import React, { useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);
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
        : [...alreadySelected, courses.find((course) => course.courseCode === courseCode)!]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="professorName">Name</label>
            <input
              id="professorName"
              type="text"
              value={professorName}
              onChange={(e) => setProfessorName(e.target.value)}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio!}
              onChange={(e) => setBio(e.target.value)}
              className="text-black"
            />
          </div>
          <div>
            <label>Courses</label>
            {courses.map((course) => (
              <div key={course.id}>
                <input
                  type="checkbox"
                  checked={selectedCourses.some(
                    (selected) => selected.id === course.id
                  )}
                  onChange={() => handleCourseToggle(course.courseCode)}
                />
                <span>{course.courseCode} - {course.courseName}</span>
              </div>
            ))}
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
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
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditProfessor;
