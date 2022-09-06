import { prisma } from "../services/db";

export const getProductsByDepartmentDB = async (
  department: string,
  category: string
) => {
  return await prisma.parent_nav.findUnique({
    where: {
      text: department,
    },

    select: {
      category: {
        where: {
          category: category,
        },
        select: {
          products: {
            select: {
              brand: true,
              category: true,
              checkout_count: true,
              color: true,
              description: true,
              gender: true,
              id: true,
              img1: true,
              img2: true,
              img3: true,
              img4: true,
              material: true,
              color_hex: true,
              related_product_id: true,
              name: true,
              price: true,
              type: true,
              product_size: true,
            },
          },
        },
      },
    },
  });
};

export const getProductsByIDDB = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};
