-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "product_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Guest_Cart" ALTER COLUMN "product_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Home_Screen_Promo" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_first_name" TEXT NOT NULL,
    "card_last_name" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_exp_date" TEXT NOT NULL,
    "billing_address1" TEXT NOT NULL,
    "billing_address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
