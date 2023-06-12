/*
  Warnings:

  - You are about to drop the column `fullNameNew` on the `UserLog` table. All the data in the column will be lost.
  - You are about to drop the column `fullNameOld` on the `UserLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserLog" DROP COLUMN "fullNameNew",
DROP COLUMN "fullNameOld";
