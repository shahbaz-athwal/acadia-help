import React from 'react';
import { Navbar } from "../components/Navbar";
import CourseList from '../components/CourseList';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Courses</h1>
        <CourseList />
      </div>
    </>
  );
}
