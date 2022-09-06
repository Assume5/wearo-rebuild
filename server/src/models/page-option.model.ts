import { prisma } from "../services/db";

export const getHomeOptionDB = async () => {
  const banner = await prisma.home_screen_banner.findMany({
    select: {
      text: true,
      coupon_code: true,
    },
  });

  const promo = await prisma.home_screen_promo.findMany();

  const newCollection = await prisma.parent_nav.findMany({
    select: {
      text: true,
      category: {
        where: {
          category: "new-arrivals",
        },
        select: {
          category: true,
          page_screen: {
            select: {
              background_image: true,
              text: true,
            },
          },
        },
      },
    },
  });

  return {
    banner,
    promo,
    newCollection,
  };
};

export const getPageHeroDB = async () => {};

export const getPageOverDB = async (department: string) => {
  return await prisma.parent_nav.findUnique({
    where: {
      text: department,
    },
    select: {
      category: {
        select: {
          category: true,
          page_screen: {
            select: {
              background_image: true,
              text: true,
              id: true,
            },
          },
        },
      },
    },
  });
};
