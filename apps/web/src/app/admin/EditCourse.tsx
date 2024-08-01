"use client";

import { updateCourse } from "@/actions/updateCourse";
import { Professor, Course } from "@prisma/client";
import React, { useState } from "react";

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
  const filteredProfessors = professors.filter(
    (professor) => professor.departmentPrefix === course.departmentPrefix
  );

  const [isEditing, setIsEditing] = useState(false);
  const [courseCode, setCourseCode] = useState(course.courseCode);
  const [courseName, setCourseName] = useState(course.courseName);
  const [description, setDescription] = useState(course.description);
  const [selectedProfessors, setSelectedProfessors] = useState<Professor[]>(
    course.professors
  );

  const handleProfessorSelect = (id: number) => {
    setSelectedProfessors((prevSelected) =>
      prevSelected.some((prof) => prof.id === id)
        ? prevSelected.filter((prof) => prof.id !== id)
        : [...prevSelected, professors.find((prof) => prof.id === id)!]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const connectProfessors = selectedProfessors.filter((prof) =>
      course.professors.every((cProf) => cProf.id !== prof.id)
    );

    const disconnectProfessors = course.professors.filter((cProf) =>
      selectedProfessors.every((prof) => prof.id !== cProf.id)
    );

    await updateCourse(course.id, {
      courseCode,
      courseName,
      description,
      professors: {
        connect: connectProfessors.map((professor) => ({
          id: professor.id,
        })),
        disconnect: disconnectProfessors.map((professor) => ({
          id: professor.id,
        })),
      },
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="courseCode">Course Code</label>
            <input
              id="courseCode"
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="courseName">Course Name</label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description!}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Professors</label>
            {filteredProfessors.map((professor) => (
              <div key={professor.id}>
                <input
                  type="checkbox"
                  checked={selectedProfessors.some(
                    (prof) => prof.id === professor.id
                  )}
                  onChange={() => handleProfessorSelect(professor.id)}
                />
                <span>{professor.name}</span>
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
          <h3>{course.courseName}</h3>
          <p>{course.courseCode}</p>
          <p>{course.description}</p>
          <p>Professors:</p>
          <ul>
            {selectedProfessors.map((professor) => (
              <li key={professor.id}>{professor.name}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
