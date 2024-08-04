import React from "react";
import CourseList from "../../components/CourseList";
import CoursesHeader from "@/components/CoursesHeader";

export default function Home() {
  return (
    <>
      <div className="pt-10">
        <CoursesHeader />
        <div className="container mx-auto px-4 py-8">
          <CourseList />
        </div>
      </div>
    </>
  );
}
