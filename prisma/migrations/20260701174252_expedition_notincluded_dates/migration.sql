-- AlterTable
ALTER TABLE "Expedition" ADD COLUMN     "availableDates" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "notIncluded" TEXT[] DEFAULT ARRAY[]::TEXT[];
