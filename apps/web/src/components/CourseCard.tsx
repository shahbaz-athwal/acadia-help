// this component represents an individual course card. it displays specific details about a course, like the course code and name.
'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  courseCode: string;
  courseName: string;
  departmentId: number;
  description: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseCode, courseName, departmentId, description }) => {
  return (
    <motion.div
      className="bg-white/80 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{courseCode} - {courseName}</h3>
      <p className="text-gray-600 mb-1">Department: {departmentId}</p>
      <p className="text-gray-500">{description || 'No description available'}</p>
    </motion.div>
  );
};

export default CourseCard;
