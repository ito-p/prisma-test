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

  // 1) Create Users
  // await prisma.user.create({
  //   data: {
  //     name: "User1",
  //     email: "email1@gmail.com",
  //   },
  // });
  // await prisma.user.create({
  //   data: {
  //     name: "User2",
  //     email: "email2@gmail.com",
  //   },
  // });

  // 2) Create Posts
  // const date1 = new Date("2022-01-01 00:00:00");
  // const date2 = new Date("2022-01-02 00:00:00");
  // const date3 = new Date("2022-01-03 00:00:00");
  // const date4 = new Date("2022-01-04 00:00:00");
  // const date5 = new Date("2022-01-05 00:00:00");
  // await prisma.post.create({
  //   data: {
  //     title: "Post by sarah 1 (updatedAt: date1)",
  //     authorId: 1,
  //     updatedAt: date1,
  //     createdAt: date1,
  //   },
  // });
  // await prisma.post.create({
  //   data: {
  //     title: "Post by sarah 2 (updatedAt: date3)",
  //     authorId: 1,
  //     updatedAt: date3,
  //     createdAt: date2,
  //   },
  // });
  // await prisma.post.create({
  //   data: {
  //     title: "Post by sarah 3 (updatedAt: date5)",
  //     authorId: 1,
  //     updatedAt: date5,
  //     createdAt: date3,
  //   },
  // });
  // await prisma.post.create({
  //   data: {
  //     title: "Post by sarah 4 (updatedAt: date4)",
  //     authorId: 1,
  //     updatedAt: date4,
  //     createdAt: date4,
  //   },
  // });
  // await prisma.post.create({
  //   data: {
  //     title: "Post by sarah 5 (updatedAt: date2)",
  //     authorId: 1,
  //     updatedAt: date2,
  //     createdAt: date5,
  //   },
  // });

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
      { id: "desc" },
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
      { id: "desc" },
    ],
  });
  console.log("====== page1 =====");
  console.log(page1);

  const page2 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: 5,
    },
    take: 2,
    orderBy: [
      {
        updatedAt: "desc",
      },
      { id: "desc" },
    ],
  });
  console.log("====== page2 =====");
  console.log(page2);

  const page3 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: 6,
    },
    take: 2,
    orderBy: [
      {
        updatedAt: "desc",
      },
      { id: "desc" },
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
