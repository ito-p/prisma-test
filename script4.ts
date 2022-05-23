import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here

  // 1) Delete All
  await prisma.post.deleteMany();

  // 2) Create Posts
  const date1 = new Date("2022-01-01 00:00:00");
  const date2 = new Date("2022-01-02 00:00:00");
  const date3 = new Date("2022-01-03 00:00:00");
  const date4 = new Date("2022-01-04 00:00:00");
  const date5 = new Date("2022-01-05 00:00:00");
  await prisma.post.create({
    data: {
      id: 1,
      title: "Post by sarah 1 (updatedAt: date1)",
      authorId: 1,
      updatedAt: date1,
      createdAt: date1,
    },
  });
  await prisma.post.create({
    data: {
      id: 2,
      title: "Post by sarah 2 (updatedAt: date3 -> date1)",
      authorId: 1,
      updatedAt: date1,
      createdAt: date2,
    },
  });
  await prisma.post.create({
    data: {
      id: 3,
      title: "Post by sarah 3 (updatedAt: date5 -> date1)",
      authorId: 1,
      updatedAt: date1,
      createdAt: date3,
    },
  });
  await prisma.post.create({
    data: {
      id: 4,
      title: "Post by sarah 4 (updatedAt: date4 -> date1)",
      authorId: 1,
      updatedAt: date1,
      createdAt: date4,
    },
  });
  await prisma.post.create({
    data: {
      id: 5,
      title: "Post by sarah 5 (updatedAt: date2 -> date1)",
      authorId: 1,
      updatedAt: date1,
      createdAt: date5,
    },
  });

  // 3) Delete First Post
  // await prisma.post.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        id: "asc",
      },
    ],
  });
  console.log("===== posts =====");
  console.log(posts);

  const page1 = await prisma.post.findMany({
    take: 2,
    orderBy: [
      {
        updatedAt: "desc",
      },
      { id: "asc" },
    ],
  });
  console.log("====== page1 =====");
  console.log(page1);

  const page2 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: page1[page1.length - 1].id,
    },
    take: 2,
    orderBy: [
      {
        updatedAt: "desc",
      },
      { id: "asc" },
    ],
  });
  console.log("====== page2 =====");
  console.log(page2);

  const page3 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: page2[page2.length - 1].id,
    },
    take: 2,
    orderBy: [
      {
        updatedAt: "desc",
      },
      { id: "asc" },
    ],
  });
  console.log("====== page3 =====");
  console.log(page3);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
