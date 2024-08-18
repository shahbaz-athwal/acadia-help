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
      docId: "7e847d61e6244af48205e9bbd91d2166",
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
      docId: "24bc04260fc24bac9606453d1ed44db8",
      department: {
        connect: { prefix: "COMP" },
      },
      professors: {
        connect: [{ id: darcy.id }],
      },
    },
  });

  const course3 = await prisma.course.create({
    data: {
      courseCode: "COMP1123",
      courseName: "Computer Programming 2",
      docId: "3b8cd659b7d34f1ea7ea33be53b4a1e5",
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
      docId: "5d13f3f75cfb4de4bfebf9b44db08e1e",
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
      docId: "6e04cf0829f5433d82c24b603e9a7332",
      department: {
        connect: { prefix: "MATH" },
      }
    },
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
