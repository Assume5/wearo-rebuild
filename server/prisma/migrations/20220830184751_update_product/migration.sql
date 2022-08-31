/*
  Warnings:

  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Product_Stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "size";

-- DropTable
DROP TABLE "Product_Stocks";

-- CreateTable
CREATE TABLE "Product_Size" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_Size_pkey" PRIMARY KEY ("id")
);
