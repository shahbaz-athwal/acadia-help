import React from 'react';
import { Navbar } from "../components/Navbar";
import CourseList from '../components/CourseList';
import CoursesHeader from '@/components/CoursesHeader';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='pt-10'>
        <CoursesHeader />
        <div className='container mx-auto px-4 py-8'>
          <CourseList />
        </div>
      </div>
    </>
  );
}
