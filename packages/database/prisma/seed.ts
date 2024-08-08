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
      image: "https://res.cloudinary.com/dqss5unvd/image/upload/v1722666748/Professors/uqwyqkacj3h1vqbz59bq.jpg",
      department: {
        connect: { prefix: "COMP" },
      },
    },
  });

  const greg = await prisma.professor.create({
    data: {
      name: "Greg Lee",
      image: "https://res.cloudinary.com/dqss5unvd/image/upload/v1722667884/Professors/iluheukc0jwyhpdfsota.png",
      department: {
        connect: { prefix: "COMP" },
      },
    },
  });

  const ian = await prisma.professor.create({
    data: {
      name: "Ian Beaton",
      image: "https://res.cloudinary.com/dqss5unvd/image/upload/v1722668848/Professors/wondtxqjmdoahigj9sut.jpg",
      department: {
        connect: { prefix: "MATH" },
      },
    },
  });

  const caro = await prisma.professor.create({
    data: {
      name: "Caroline Coachran",
      image: "https://res.cloudinary.com/dqss5unvd/image/upload/v1722669641/Professors/jlztpcnfchpi2u2jr4w4.jpg",
      department: {
        connect: { prefix: "MATH"},
      },
    },
  });

  const elhadi = await prisma.professor.create({
    data: {
      name: "Elhadi Shakshuki",
      image: "https://res.cloudinary.com/dqss5unvd/image/upload/v1722682712/Professors/n3qva4wcd5b0efm8pa2y.jpg",
      department: {
        connect: { prefix: "COMP"},
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
        professorId: darcy.id,
        courseId: course1.id,
        message: "Great course!",
        grade: "A",
        quality: 5,
        difficulty: 3,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: greg.id,
        courseId: course1.id,
        message: "Very informative.",
        grade: "B",
        quality: 4,
        difficulty: 2,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: darcy.id,
        courseId: course2.id,
        message: "Challenging but rewarding.",
        grade: "A",
        quality: 5,
        difficulty: 4,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: greg.id,
        courseId: course2.id,
        message: "Well structured.",
        grade: "B",
        quality: 4,
        difficulty: 3,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: darcy.id,
        courseId: course3.id,
        message: "Excellent course.",
        grade: "A",
        quality: 5,
        difficulty: 3,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: greg.id,
        courseId: course3.id,
        message: "Highly recommend.",
        grade: "B",
        quality: 4,
        difficulty: 2,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: ian.id,
        courseId: course4.id,
        message: "Very clear explanations.",
        grade: "A",
        quality: 5,
        difficulty: 2,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: caro.id,
        courseId: course4.id,
        message: "Learned a lot.",
        grade: "B",
        quality: 4,
        difficulty: 3,
        bookRequired: false,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: ian.id,
        courseId: course5.id,
        message: "Enjoyed the course.",
        grade: "A",
        quality: 5,
        difficulty: 2,
        bookRequired: true,
        attendance: true,
        wouldTakeAgain: true,
      },
      {
        professorId: caro.id,
        courseId: course5.id,
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
