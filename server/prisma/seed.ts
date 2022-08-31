import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl purus. Bibendum enim facilisis gravida neque convallis a. Faucibus nisl tincidunt eget nullam non nisi est sit. Sem fringilla ut morbi tincidunt.";
//type : apparel, accessories footwear, new
const productData: Prisma.ProductCreateInput[] = [
  {
    id: "09e769fc-fbbb-4e0c-b5b5-37532c3a01c5",
    name: "Product 1",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "new",
    brand: "brand",
    type: "Hoodies/Sweatshirts",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "S",
          stock: 500,
        },
        {
          size: "M",
          stock: 500,
        },
        {
          size: "L",
          stock: 500,
        },
        {
          size: "XL",
          stock: 500,
        },
      ],
    },
    Home_Screen_Promo: {
      create: {
        text: "Promo 1",
        name: "Product 1",
        price: 50.99,
        image: "public/uploads/bg-placeholder.jpg",
      },
    },
  },
  {
    id: "71507a65-6a0e-4bd3-8cba-614674958ff15",
    name: "Product 2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "red",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "new",
    brand: "brand two",
    type: "Hoodies/Sweatshirts",
    gender: "girl",
    Product_Size: {
      create: [
        {
          size: "S",
          stock: 500,
        },
        {
          size: "M",
          stock: 500,
        },
        {
          size: "L",
          stock: 500,
        },
        {
          size: "XL",
          stock: 500,
        },
      ],
    },
    Home_Screen_Promo: {
      create: {
        text: "Promo 2",
        name: "Product 2",
        price: 50.99,
        image: "public/uploads/bg-placeholder.jpg",
      },
    },
  },
  {
    id: "a0fd8676-1c78-468d-b5e5-d101b1f3178b",
    name: "Product 3",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "white",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "new",
    brand: "brand three",
    type: "Hoodies/Sweatshirts",
    gender: "boy",
    Product_Size: {
      create: [
        {
          size: "S",
          stock: 500,
        },
        {
          size: "M",
          stock: 500,
        },
        {
          size: "L",
          stock: 500,
        },
        {
          size: "XL",
          stock: 500,
        },
      ],
    },
    Home_Screen_Promo: {
      create: {
        text: "Promo 3",
        name: "Product 3",
        price: 50.99,
        image: "public/uploads/bg-placeholder.jpg",
      },
    },
  },
  {
    name: "Product 4",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "new",
    brand: "brand",
    type: "Hoodies/Sweatshirts",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "S",
          stock: 500,
        },
        {
          size: "M",
          stock: 500,
        },
        {
          size: "L",
          stock: 500,
        },
        {
          size: "XL",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Men Accessories",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "accessories",
    brand: "brand",
    type: "accessories",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Men Apparel",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Men Footwear",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
  {
    name: "Product Men Accessories2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "accessories",
    brand: "brand",
    type: "watch",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Men Apparel2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Men Footwear2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "men",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
  {
    name: "Product Women Accessories",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "accessories",
    brand: "brand",
    type: "accessories",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Women Apparel",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Women Footwear",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
  {
    name: "Product Women Accessories2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "accessories",
    brand: "brand",
    type: "watch",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Women Apparel2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Women Footwear2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "women",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
  {
    name: "Product Kid Apparel",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "boy",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Kid Footwear",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "boy",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
  {
    name: "Product Kid Apparel2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "apparel",
    brand: "brand",
    type: "bag",
    gender: "girl",
    Product_Size: {
      create: [
        {
          size: "onesize",
          stock: 500,
        },
      ],
    },
  },
  {
    name: "Product Kid Footwear2",
    img1: "/public/uploads/bg-placeholder.jpg",
    img2: "/public/uploads/bg-placeholder-2.jpg",
    color: "black",
    material: "cotton",
    description: description,
    price: 50.99,
    category: "footwear",
    brand: "brand",
    type: "sneaker",
    gender: "girl",
    Product_Size: {
      create: [
        {
          size: "3",
          stock: 500,
        },
        {
          size: "4",
          stock: 500,
        },
        {
          size: "5",
          stock: 500,
        },
        {
          size: "6",
          stock: 500,
        },
        {
          size: "7",
          stock: 500,
        },
        {
          size: "8",
          stock: 500,
        },
        {
          size: "9",
          stock: 500,
        },
        {
          size: "10",
          stock: 0,
        },
        {
          size: "11",
          stock: 0,
        },
        {
          size: "12",
          stock: 0,
        },
        {
          size: "13",
          stock: 0,
        },
      ],
    },
  },
];

const homescreenBanner: Prisma.Home_Screen_BannerCreateInput = {
  text: "20% off $60 + free shipping",
  coupon_code: "test coupon",
};

const coupon: Prisma.CouponsCreateInput = {
  value: "test coupon",
  status: "1",
  discount: 20,
};

async function main() {
  console.log("Start seeding...");
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created Product: ${product.name}`);
  }

  await prisma.home_Screen_Banner.create({
    data: homescreenBanner,
  });

  console.log(`Created Home Screen Banner`);

  await prisma.coupons.create({
    data: coupon,
  });

  console.log(`Created Coupons`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
