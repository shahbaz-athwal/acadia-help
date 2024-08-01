// this component is responsible for displaying a list of courses. It maps over the "courses" array and renders a "CourseCard" for each course.

import React from 'react';
import { courses } from '../lib/coursesData';
import CourseCard from './CourseCard';

const CourseList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          courseCode={course.courseCode}
          courseName={course.courseName}
          departmentId={course.departmentId}
          description={course.description}
        />
      ))}
    </div>
  );
};

export default CourseList;
