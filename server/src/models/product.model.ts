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

export const filterProductsDB = async (
  department: string,
  category: string,
  sortBy: string,
  pageSize: string,
  params: any,
  sizeParams: any,
  typeParams: any
) => {
  let orderBy: any;
  if (sortBy === "Most Popular") {
    orderBy = { checkout_count: "asc" };
  } else if (sortBy === "Newest") {
    orderBy = {
      create_at: "desc",
    };
  } else if (sortBy === "Lowest Price") {
    orderBy = {
      price: "desc",
    };
  } else {
    orderBy = {
      price: "asc",
    };
  }

  let where: any = {};
  if (sizeParams.length && params.length) {
    where = {
      AND: [...sizeParams, ...params],
    };
  } else if (sizeParams.length) {
    where = {
      AND: sizeParams,
    };
  } else if (params.length) {
    where = {
      AND: params,
    };
  }

  if (typeParams.length) {
    where["OR"] = typeParams;
  }

  return await prisma.parent_nav.findUnique({
    where: {
      text: department,
    },
    select: {
      category: {
        where: {
          category,
        },
        select: {
          products: {
            where,
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
            orderBy: orderBy,
          },
        },
      },
    },
  });
};
