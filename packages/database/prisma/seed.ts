import { PrismaClient } from '../src/index';
const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const departments = await prisma.department.createMany({
    data: [
      { name: 'Computer Science' },
      { name: 'Mathematics' },
      { name: 'Physics' },
      { name: 'Chemistry' },
      { name: 'Biology' },
    ],
  });

  // Create Courses
  const courses = await prisma.course.createMany({
    data: [
      { courseCode: 'CS101', courseName: 'Introduction to Computer Science', departmentId: 1 },
      { courseCode: 'CS102', courseName: 'Data Structures', departmentId: 1 },
      { courseCode: 'MATH101', courseName: 'Calculus I', departmentId: 2 },
      { courseCode: 'PHYS101', courseName: 'General Physics I', departmentId: 3 },
      { courseCode: 'CHEM101', courseName: 'General Chemistry I', departmentId: 4 },
    ],
  });

  // Create Professors
  const professors = await prisma.professor.createMany({
    data: [
      { name: 'Dr. John Doe' },
      { name: 'Dr. Jane Smith' },
      { name: 'Dr. Alan Turing' },
      { name: 'Dr. Ada Lovelace' },
      { name: 'Dr. Isaac Newton' },
    ],
  });

  // Create Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      email: `user${i + 1}@example.com`,
      isVerified: Math.random() > 0.5,
    })),
  });

  // Create CourseFeedbacks
  const courseFeedbacks = await prisma.courseFeedback.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      userId: i + 1,
      professorName: `Professor ${i + 1}`,
      courseCode: `CS101`,
      message: `Course feedback message ${i + 1}`,
      grade: `A`,
      rating: Math.floor(Math.random() * 5) + 1,
    })),
  });

  // Create ProfessorFeedbacks
  const professorFeedbacks = await prisma.professorFeedback.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      userId: i + 1,
      courseCode: `CS101`,
      professorId: i % 5 + 1,
      message: `Professor feedback message ${i + 1}`,
      grade: `A`,
      wouldTakeAgain: Math.random() > 0.5,
      rating: Math.floor(Math.random() * 5) + 1,
    })),
  });

  console.log('Seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
