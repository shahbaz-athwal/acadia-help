import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create departments
  const compSciDept = await prisma.department.create({
    data: {
      name: "Computer Science",
    },
  });

  const mathDept = await prisma.department.create({
    data: {
      name: "Math",
    },
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
    },
  });

  const greg = await prisma.professor.create({
    data: {
      name: "Greg Lee",
    },
  });

  const ian = await prisma.professor.create({
    data: {
      name: "Ian Beaton",
    },
  });

  const caro = await prisma.professor.create({
    data: {
      name: "Caroline Coachran",
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      courseCode: "COMP1113",
      courseName: "Computer Programming 1",
      docId: "COMP1113-Computer-Programming-1-7e847d61e6244af48205e9bbd91d2166",
      department: {
        connect: { id: compSciDept.id },
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
        connect: { id: compSciDept.id },
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
        connect: { id: compSciDept.id },
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
        connect: { id: mathDept.id },
      },
      professors: {
        connect: [{ id: ian.id }, {id: caro.id}],
      },
    },
  });

  const course5 = await prisma.course.create({
    data: {
      courseCode: "MATH1253",
      courseName: "Statistics 1",
      docId: "MATH1253-Statistics-1-6e04cf0829f5433d82c24b603e9a7332",
      department: {
        connect: { id: mathDept.id },
      },
      professors: {
        connect: { id: ian.id },
      },
    },
  });

  // Create course feedbacks
  await prisma.courseFeedback.createMany({
    data: [
      {
        userId: user.id,
        professorName: darcy.name,
        courseCode: course1.courseCode,
        message: "Great course!",
        rating: 5,
      },
      {
        userId: user.id,
        professorName: greg.name,
        courseCode: course1.courseCode,
        message: "Very informative.",
        rating: 4,
      },
      {
        userId: user.id,
        professorName: darcy.name,
        courseCode: course2.courseCode,
        message: "Challenging but rewarding.",
        rating: 5,
      },
      {
        userId: user.id,
        professorName: greg.name,
        courseCode: course2.courseCode,
        message: "Well structured.",
        rating: 4,
      },
      {
        userId: user.id,
        professorName: darcy.name,
        courseCode: course3.courseCode,
        message: "Excellent course.",
        rating: 5,
      },
      {
        userId: user.id,
        professorName: greg.name,
        courseCode: course3.courseCode,
        message: "Highly recommend.",
        rating: 4,
      },
      {
        userId: user.id,
        professorName: ian.name,
        courseCode: course4.courseCode,
        message: "Very clear explanations.",
        rating: 5,
      },
      {
        userId: user.id,
        professorName: ian.name,
        courseCode: course4.courseCode,
        message: "Learned a lot.",
        rating: 4,
      },
      {
        userId: user.id,
        professorName: ian.name,
        courseCode: course5.courseCode,
        message: "Enjoyed the course.",
        rating: 5,
      },
      {
        userId: user.id,
        professorName: ian.name,
        courseCode: course5.courseCode,
        message: "Good balance of theory and practice.",
        rating: 4,
      },
    ],
  });

  // Create professor feedbacks
  await prisma.professorFeedback.createMany({
    data: [
      {
        userId: user.id,
        courseCode: course1.courseCode,
        professorId: darcy.id,
        message: "Darcy Benoit is amazing!",
        wouldTakeAgain: true,
        rating: 5,
      },
      {
        userId: user.id,
        courseCode: course1.courseCode,
        professorId: greg.id,
        message: "Greg Lee is very knowledgeable.",
        wouldTakeAgain: true,
        rating: 4,
      },
      {
        userId: user.id,
        courseCode: course2.courseCode,
        professorId: darcy.id,
        message: "Darcy Benoit explains well.",
        wouldTakeAgain: true,
        rating: 5,
      },
      {
        userId: user.id,
        courseCode: course2.courseCode,
        professorId: greg.id,
        message: "Greg Lee is very organized.",
        wouldTakeAgain: true,
        rating: 4,
      },
      {
        userId: user.id,
        courseCode: course3.courseCode,
        professorId: darcy.id,
        message: "Darcy Benoit is fantastic!",
        wouldTakeAgain: true,
        rating: 5,
      },
      {
        userId: user.id,
        courseCode: course3.courseCode,
        professorId: greg.id,
        message: "Greg Lee knows the subject well.",
        wouldTakeAgain: true,
        rating: 4,
      },
      {
        userId: user.id,
        courseCode: course4.courseCode,
        professorId: ian.id,
        message: "Ian Beaton is very clear.",
        wouldTakeAgain: true,
        rating: 5,
      },
      {
        userId: user.id,
        courseCode: course4.courseCode,
        professorId: ian.id,
        message: "Ian Beaton is very clear.",
        wouldTakeAgain: true,
        rating: 5,
      },
      {
        userId: user.id,
        courseCode: course5.courseCode,
        professorId: ian.id,
        message: "Ian Beaton is very clear.",
        wouldTakeAgain: true,
        rating: 5,
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
