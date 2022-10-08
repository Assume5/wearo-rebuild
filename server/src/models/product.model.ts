import { prisma } from "../services/db";
import { IObjParams } from "../types/product";

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

  const objParams: IObjParams = {
    brand: [],
    color: [],
    material: [],
  };

  params.forEach((obj: Object) => {
    const key = Object.keys(obj)[0] as keyof IObjParams;
    objParams[key].push(obj);
  });

  if (
    !objParams.brand.length &&
    !objParams.color.length &&
    !objParams.material.length &&
    !typeParams.length &&
    !sizeParams.length
  ) {
    where = {};
  } else {
    where = {
      AND: [],
    };

    if (objParams.color.length) {
      where["AND"].push({ OR: objParams.color });
    }

    if (objParams.brand.length) {
      where["AND"].push({ OR: objParams.brand });
    }

    if (objParams.material.length) {
      where["AND"].push({ OR: objParams.material });
    }

    if (typeParams.length) {
      where["AND"].push({ OR: typeParams });
    }

    if (sizeParams.length) {
      where["AND"].push({ OR: sizeParams });
    }
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

export const getProductByIdDB = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      img1: true,
      img2: true,
      img3: true,
      img4: true,
      color: true,
      material: true,
      color_hex: true,
      related_product_id: true,
      description: true,
      price: true,
      brand: true,
      category: {
        select: {
          category: true,
        },
      },
      type: true,
      gender: true,
      product_size: {
        select: {
          size: true,
          stock: true,
        },
      },
    },
  });
};
