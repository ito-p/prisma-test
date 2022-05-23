/*
  Warnings:

  - A unique constraint covering the columns `[id,updatedAt]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_id_createdAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_updatedAt_key" ON "Post"("id", "updatedAt");
