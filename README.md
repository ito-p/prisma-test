# prisma-test

## code

```ts
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log("===== posts =====");
  console.log(posts);

  const page1 = await prisma.post.findMany({
    take: 2,
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log("====== page1 =====");
  console.log(page1);

  const page2 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: 5,
    },
    take: 2,
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log("====== page2 =====");
  console.log(page2);

  const page3 = await prisma.post.findMany({
    skip: 1,
    cursor: {
      id: 6,
    },
    take: 2,
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log("====== page3 =====");
  console.log(page3);
```

## result

```bash
main % yarn dev
yarn run v1.22.18
$ ts-node ./script.ts
===== posts =====
[
  {
    id: 4,
    title: 'Post by sarah 3 (updatedAt: date5)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-02T15:00:00.000Z,
    updatedAt: 2022-01-04T15:00:00.000Z
  },
  {
    id: 5,
    title: 'Post by sarah 4 (updatedAt: date4)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-03T15:00:00.000Z,
    updatedAt: 2022-01-03T15:00:00.000Z
  },
  {
    id: 3,
    title: 'Post by sarah 2 (updatedAt: date3)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-01T15:00:00.000Z,
    updatedAt: 2022-01-02T15:00:00.000Z
  },
  {
    id: 6,
    title: 'Post by sarah 5 (updatedAt: date2)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-04T15:00:00.000Z,
    updatedAt: 2022-01-01T15:00:00.000Z
  },
  {
    id: 2,
    title: 'Post by sarah 1 (updatedAt: date1)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2021-12-31T15:00:00.000Z,
    updatedAt: 2021-12-31T15:00:00.000Z
  }
]
====== page1 =====
[
  {
    id: 4,
    title: 'Post by sarah 3 (updatedAt: date5)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-02T15:00:00.000Z,
    updatedAt: 2022-01-04T15:00:00.000Z
  },
  {
    id: 5,
    title: 'Post by sarah 4 (updatedAt: date4)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-03T15:00:00.000Z,
    updatedAt: 2022-01-03T15:00:00.000Z
  }
]
====== page2 =====
[
  {
    id: 3,
    title: 'Post by sarah 2 (updatedAt: date3)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-01T15:00:00.000Z,
    updatedAt: 2022-01-02T15:00:00.000Z
  },
  {
    id: 6,
    title: 'Post by sarah 5 (updatedAt: date2)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2022-01-04T15:00:00.000Z,
    updatedAt: 2022-01-01T15:00:00.000Z
  }
]
====== page3 =====
[
  {
    id: 2,
    title: 'Post by sarah 1 (updatedAt: date1)',
    content: null,
    published: false,
    authorId: 1,
    createdAt: 2021-12-31T15:00:00.000Z,
    updatedAt: 2021-12-31T15:00:00.000Z
  }
]
✨  Done in 0.76s.
```

## SQL

```sqlite
/* ===== posts ===== */

SELECT
  `main`.`Post`.`id`,
  `main`.`Post`.`title`,
  `main`.`Post`.`content`,
  `main`.`Post`.`published`,
  `main`.`Post`.`authorId`,
  `main`.`Post`.`createdAt`,
  `main`.`Post`.`updatedAt`
FROM `main`.`Post`
WHERE 1=1
ORDER BY `main`.`Post`.`updatedAt` DESC
LIMIT ? OFFSET ?

/* ===== page1 ===== */

SELECT
  `main`.`Post`.`id`,
  `main`.`Post`.`title`,
  `main`.`Post`.`content`,
  `main`.`Post`.`published`,
  `main`.`Post`.`authorId`,
  `main`.`Post`.`createdAt`,
  `main`.`Post`.`updatedAt`
FROM `main`.`Post`
WHERE 1=1
ORDER BY `main`.`Post`.`updatedAt` DESC
LIMIT ? OFFSET ?

/* ===== page2 ===== */

SELECT
  `main`.`Post`.`id`,
  `main`.`Post`.`title`,
  `main`.`Post`.`content`,
  `main`.`Post`.`published`,
  `main`.`Post`.`authorId`,
  `main`.`Post`.`createdAt`,
  `main`.`Post`.`updatedAt`
FROM `main`.`Post`, (
  SELECT
    `main`.`Post`.`updatedAt` AS `Post_updatedAt_0`
  FROM `main`.`Post`
    WHERE (`main`.`Post`.`id`) = (?)
) AS `order_cmp`
WHERE `main`.`Post`.`updatedAt` <= `order_cmp`.`Post_updatedAt_0`
ORDER BY `main`.`Post`.`updatedAt` DESC
LIMIT ? OFFSET ?
```
