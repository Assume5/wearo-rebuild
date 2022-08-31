-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "cookie_value" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home_Screen_Banner" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "coupon_code" TEXT NOT NULL,

    CONSTRAINT "Home_Screen_Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home_Screen_Promo" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Home_Screen_Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest_Cart" (
    "id" SERIAL NOT NULL,
    "owner_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_image" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "selected_size" TEXT NOT NULL,
    "quanitity" INTEGER NOT NULL,

    CONSTRAINT "Guest_Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "owner_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_image" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "selected_size" TEXT NOT NULL,
    "quanitity" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img1" TEXT NOT NULL,
    "img2" TEXT,
    "img3" TEXT,
    "img4" TEXT,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "material" TEXT,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "checkout_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Stocks" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "card_holder_first_name" TEXT NOT NULL,
    "card_holder_last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "shipping_first_name" TEXT NOT NULL,
    "shipping_last_name" TEXT NOT NULL,
    "shipping_address1" TEXT NOT NULL,
    "shipping_address2" TEXT,
    "shipping_city" TEXT NOT NULL,
    "shipping_zip" TEXT NOT NULL,
    "shipping_state" TEXT NOT NULL,
    "billing_first_name" TEXT NOT NULL,
    "billing_last_name" TEXT NOT NULL,
    "billing_address1" TEXT NOT NULL,
    "billing_address2" TEXT,
    "billing_city" TEXT NOT NULL,
    "billing_state" TEXT NOT NULL,
    "billing_zip" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tracking_number" TEXT,
    "order_status" TEXT,
    "total_pirce" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Details" (
    "id" SERIAL NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "selected_size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Order_Details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Home_Screen_Promo" ADD CONSTRAINT "Home_Screen_Promo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest_Cart" ADD CONSTRAINT "Guest_Cart_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "Order_Details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "Order_Details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
