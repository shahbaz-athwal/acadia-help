import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create departments
   await prisma.department.createMany({
    data: [
      {
        name: "Computer Science",
        prefix: "COMP",
      },
      {
        name: "Mathematics and Statistics",
        prefix: "MATH",
      },
      {
        name: "Business Administration",
        prefix: "BUSI",
      },
      {
        name: "Geology",
        prefix: "GEOL",
      },
    ],
  });

  // Create user
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      isVerified: true,
    },
  });

  // Create professors
  const darcy = await prisma.professor.create({
    data: {
      name: "Darcy Benoit",
      department: {
        connect: { prefix: "COMP" },
      },
    },
  });

  const greg = await prisma.professor.create({
    data: {
      name: "Greg Lee",
      department: {
        connect: { prefix: "COMP" },
      },
    },
  });

  const ian = await prisma.professor.create({
    data: {
      name: "Ian Beaton",
      department: {
        connect: { prefix: "MATH" },
      },
    },
  });

  const caro = await prisma.professor.create({
    data: {
      name: "Caroline Coachran",
      department: {
        connect: { prefix: "MATH"},
      },
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      courseCode: "COMP1113",
      courseName: "Computer Programming 1",
      docId: "COMP1113-Computer-Programming-1-7e847d61e6244af48205e9bbd91d2166",
      department: {
        connect: { prefix: "COMP" },
      },
      professors: {
        connect: [{ id: darcy.id }, { id: greg.id }],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      courseCode: "COMP2213",
      courseName: "Data Structures and Algorithms",
      docId: "COMP2213-Data-Structures-and-Algorithms-24bc04260fc24bac9606453d1ed44db8",
      department: {
        connect: { prefix: "COMP" },
      },
      professors: {
        connect: [{ id: darcy.id }, { id: greg.id }],
      },
    },
  });

  const course3 = await prisma.course.create({
    data: {
      courseCode: "COMP1123",
      courseName: "Computer Programming 2",
      docId: "COMP1123-Computer-Programming-2-3b8cd659b7d34f1ea7ea33be53b4a1e5",
      department: {
        connect: { prefix: "COMP" },
      },
      professors: {
        connect: [{ id: greg.id }],
      },
    },
  });

  const course4 = await prisma.course.create({
    data: {
      courseCode: "MATH1013",
      courseName: "Introductory Calculus 1",
      docId: "MATH1013-Introductory-Calculus-1-5d13f3f75cfb4de4bfebf9b44db08e1e",
      department: {
        connect: { prefix: "MATH" },
      },
      professors: {
        connect: [{ id: ian.id }, { id: caro.id }],
      },
    },
  });

  const course5 = await prisma.course.create({
    data: {
      courseCode: "MATH1253",
      courseName: "Statistics 1",
      docId: "MATH1253-Statistics-1-6e04cf0829f5433d82c24b603e9a7332",
      department: {
        connect: { prefix: "MATH" },
      },
      professors: {
        connect: { id: ian.id },
      },
    },
  });

  // Create feedbacks
  await prisma.feedback.createMany({
    data: [
      {
        userId: user.id,
        professorId: darcy.id,
        courseCode: course1.courseCode,
        message: "Great course!",
        grade: "A",
        quality: 5,
        difficulty: 3,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: greg.id,
        courseCode: course1.courseCode,
        message: "Very informative.",
        grade: "B",
        quality: 4,
        difficulty: 2,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: darcy.id,
        courseCode: course2.courseCode,
        message: "Challenging but rewarding.",
        grade: "A",
        quality: 5,
        difficulty: 4,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: greg.id,
        courseCode: course2.courseCode,
        message: "Well structured.",
        grade: "B",
        quality: 4,
        difficulty: 3,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: darcy.id,
        courseCode: course3.courseCode,
        message: "Excellent course.",
        grade: "A",
        quality: 5,
        difficulty: 3,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: greg.id,
        courseCode: course3.courseCode,
        message: "Highly recommend.",
        grade: "B",
        quality: 4,
        difficulty: 2,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: ian.id,
        courseCode: course4.courseCode,
        message: "Very clear explanations.",
        grade: "A",
        quality: 5,
        difficulty: 2,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: caro.id,
        courseCode: course4.courseCode,
        message: "Learned a lot.",
        grade: "B",
        quality: 4,
        difficulty: 3,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: ian.id,
        courseCode: course5.courseCode,
        message: "Enjoyed the course.",
        grade: "A",
        quality: 5,
        difficulty: 2,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        userId: user.id,
        professorId: caro.id,
        courseCode: course5.courseCode,
        message: "Good balance of theory and practice.",
        grade: "B",
        quality: 4,
        difficulty: 3,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
    ],
  });

  console.log("Database has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
