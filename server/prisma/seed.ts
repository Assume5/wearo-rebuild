import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl purus. Bibendum enim facilisis gravida neque convallis a. Faucibus nisl tincidunt eget nullam non nisi est sit. Sem fringilla ut morbi tincidunt.";
//type : apparel, accessories footwear, new

const navData: Prisma.parent_navCreateInput[] = [
  {
    text: "men",
    category: {
      create: [
        {
          category: "accessories",
          products: {
            create: [
              {
                name: "Product Men Accessories",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "accessories",
                gender: "men",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
              {
                name: "Product Men Accessories2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "watch",
                gender: "men",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
            ],
          },
          page_screen: {
            create: {
              background_image: "men-accessories.png",
              text: "Shop Men's Accessories",
            },
          },
        },
        {
          category: "apparel",
          products: {
            create: [
              {
                name: "Product Men Apparel",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "men",
                product_size: {
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
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "men",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
            ],
          },
          page_screen: {
            create: {
              background_image: "men-apparel.png",
              text: "Shop Men's Apparel",
            },
          },
        },
        {
          category: "footwear",
          products: {
            create: [
              {
                name: "Product Men Footwear",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "men",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "men-footwear.png",
              text: "Shop Men's Footwear",
            },
          },
        },
        {
          category: "new-arrivals",
          products: {
            create: [
              {
                id: "09e769fc-fbbb-4e0c-b5b5-37532c3a01c5",
                name: "Product 1",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "Hoodies/Sweatshirts",
                gender: "men",
                product_size: {
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
                name: "Product Men Footwear2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "men",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "men-new.png",
              text: "Shop Men's New Collection",
            },
          },
        },
      ],
    },
  },
  {
    text: "women",
    category: {
      create: [
        {
          category: "accessories",
          products: {
            create: [
              {
                name: "Product Women Accessories",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "accessories",
                gender: "women",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
              {
                name: "Product Women Accessories2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "watch",
                gender: "women",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
            ],
          },
          page_screen: {
            create: {
              background_image: "women-accessories.png",
              text: "Shop Women's Accessories",
            },
          },
        },
        {
          category: "apparel",
          products: {
            create: [
              {
                name: "Product Women Apparel",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "women",
                product_size: {
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
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "women",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
            ],
          },
          page_screen: {
            create: {
              background_image: "women-apparel.png",
              text: "Shop Women's Apparel",
            },
          },
        },
        {
          category: "footwear",
          products: {
            create: [
              {
                name: "Product Women Footwear",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "women",
                product_size: {
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
                name: "Product Women Footwear2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "women",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "women-footwear.png",
              text: "Shop Women's Footwear",
            },
          },
        },
        {
          category: "new-arrivals",
          products: {
            create: [
              {
                name: "Product 4",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "Hoodies/Sweatshirts",
                gender: "women",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "women-new.png",
              text: "Shop Women's New Collection",
            },
          },
        },
      ],
    },
  },
  {
    text: "kids",
    category: {
      create: [
        {
          category: "apparel",
          products: {
            create: [
              {
                name: "Product Kid Apparel",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "boy",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
              {
                name: "Product Kid Apparel2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "bag",
                gender: "girl",
                product_size: {
                  create: [
                    {
                      size: "onesize",
                      stock: 500,
                    },
                  ],
                },
              },
            ],
          },
          page_screen: {
            create: {
              background_image: "kids-apparel.png",
              text: "Shop Kids Apparel",
            },
          },
        },
        {
          category: "footwear",
          products: {
            create: [
              {
                name: "Product Kid Footwear",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "boy",
                product_size: {
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
                name: "Product Kid Footwear2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "black",
                color_hex: "#000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand",
                type: "sneaker",
                gender: "girl",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "kids-footwear.png",
              text: "Shop Kids Footwear",
            },
          },
        },
        {
          category: "new-arrivals",
          products: {
            create: [
              {
                id: "71507a65-6a0e-4bd3-8cba-614674958ff15",
                name: "Product 2",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "red",
                color_hex: "#FF0000",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand two",
                type: "Hoodies/Sweatshirts",
                gender: "girl",
                product_size: {
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
                id: "a0fd8676-1c78-468d-b5e5-d101b1f3178b",
                name: "Product 3",
                img1: "bg-placeholder.jpg",
                img2: "bg-placeholder-2.jpg",
                color: "white",
                color_hex: "#fff",
                material: "cotton",
                description: description,
                price: 50.99,
                brand: "brand three",
                type: "Hoodies/Sweatshirts",
                gender: "boy",
                product_size: {
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
            ],
          },
          page_screen: {
            create: {
              background_image: "kids-new.jpg",
              text: "Shop Kids New Collection",
            },
          },
        },
      ],
    },
  },
];

const homescrrenPrmo: Prisma.home_screen_promoCreateInput[] = [
  {
    text: "Promo 1",
    name: "Product 1",
    product_id: "09e769fc-fbbb-4e0c-b5b5-37532c3a01c5",
    price: 50.99,
    image: "/uploads/bg-placeholder.jpg",
  },
  {
    text: "Promo 2",
    name: "Product 2",
    product_id: "71507a65-6a0e-4bd3-8cba-614674958ff15",
    price: 50.99,
    image: "/uploads/bg-placeholder.jpg",
  },
  {
    text: "Promo 3",
    name: "Product 3",
    product_id: "a0fd8676-1c78-468d-b5e5-d101b1f3178b",
    price: 50.99,
    image: "/uploads/bg-placeholder-2.jpg",
  },
];

const homescreenBanner: Prisma.home_screen_bannerCreateInput = {
  text: "20% off $60 + free shipping",
  coupon_code: "test coupon",
};

const coupon: Prisma.couponsCreateInput = {
  value: "test coupon",
  status: "1",
  discount: 20,
};

async function main() {
  console.log("Start seeding...");
  for (const n of navData) {
    const nav = await prisma.parent_nav.create({
      data: n,
    });
    console.log(`Created Nav: ${nav.text}`);
  }

  for (const p of homescrrenPrmo) {
    const promo = await prisma.home_screen_promo.create({
      data: p,
    });
    console.log(`Created Promo: ${promo.text}`);
  }

  await prisma.home_screen_banner.create({
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
