// this component represents an individual course card. it displays specific details about a course, like the course code and name.

import React from 'react';

interface CourseCardProps {
  courseCode: string;
  courseName: string;
  departmentId: number;
  description: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseCode, courseName, departmentId, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold">{courseName}</h3>
      <p className="text-gray-600">{courseCode}</p>
      <p className="text-gray-500">Department: {departmentId}</p>
      <p className="text-gray-400">{description || 'No description available'}</p>
    </div>
  );
};

export default CourseCard;
