"use client";
import { addCourse } from "@/actions/addCourse";
import { useState } from "react";

const AddCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    addCourse({
      courseCode,
      courseName,
      department: { connect: { prefix: courseCode.slice(0,4) } },
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl justify-center flex flex-col bg-zinc-600 text-black">
      <input
        type="text"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        placeholder="Course Code"
        required
      />
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
