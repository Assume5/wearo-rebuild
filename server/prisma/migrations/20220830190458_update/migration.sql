/*
  Warnings:

  - Changed the type of `product_price` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_price` on the `Guest_Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `Home_Screen_Promo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "product_price",
ADD COLUMN     "product_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Guest_Cart" DROP COLUMN "product_price",
ADD COLUMN     "product_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Home_Screen_Promo" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
