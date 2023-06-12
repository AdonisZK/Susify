-- AlterTable
ALTER TABLE "ListingLog" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UserLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "usernameOld" TEXT,
    "usernameNew" TEXT,
    "fullNameOld" TEXT,
    "fullNameNew" TEXT,
    "descriptionOld" TEXT,
    "descriptionNew" TEXT,
    "addressOld" TEXT,
    "addressNew" TEXT,
    "noOld" TEXT,
    "noNew" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);
