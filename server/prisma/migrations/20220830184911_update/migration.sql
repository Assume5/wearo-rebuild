/*
  Warnings:

  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "coupons";

-- CreateTable
CREATE TABLE "Coupons" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product_Size" ADD CONSTRAINT "Product_Size_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
