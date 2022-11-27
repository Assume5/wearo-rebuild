import { prisma } from "../services/db";

export const checkAccountExists = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      email: username,
    },
    select: {
      id: true,
      email: true,
      password: true,
      first_name: true,
      last_name: true,
    },
  });
};

export const registerAccountDB = async (
  email: string,
  password: string,
  fname: string,
  lname: string
) => {
  return await prisma.user.create({
    data: {
      email: email,
      password,
      first_name: fname,
      last_name: lname,
    },
  });
};

export const registerGuest = async (cookie: string) => {
  return await prisma.guest.create({
    data: {
      id: cookie,
      cookie_value: cookie,
    },
  });
};

export const removeGuestByCookie = async (cookie: string) => {
  return await prisma.guest.delete({
    where: {
      cookie_value: cookie,
    },
  });
};

export const getAccountOrdersDB = async (email: string) => {
  return await prisma.orders.findMany({
    where: {
      email,
    },
    select: {
      id: true,
      order_date: true,
      order_status: true,
      total_pirce: true,
    },
  });
};

export const getAccountDetailsDB = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      first_name: true,
      last_name: true,
      phone: true,
      shipping_first_name: true,
      shipping_last_name: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      payment: {
        select: {
          id: true,
          card_first_name: true,
          card_last_name: true,
          card_exp_date: true,
          billing_address1: true,
          billing_address2: true,
          city: true,
          state: true,
          zip: true,
          card_number: true,
        },
      },
    },
  });
};

export const updatePersonalDB = async (
  id: string,
  first_name: string,
  last_name: string,
  phone: string
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      first_name,
      last_name,
      phone,
    },
  });
};

export const updateAddressDB = async (
  id: string,
  shipping_first_name: string,
  shipping_last_name: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      shipping_first_name,
      shipping_last_name,
      address1,
      address2,
      city,
      state,
      zip,
    },
  });
};

export const updatePasswordDB = async (id: string, hashedPassword: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
};

export const checkCreditCardExists = async (id: string, cc: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      payment: {
        where: {
          card_number: cc,
        },
      },
    },
  });
};

export const editCreditCardDB = async (
  id: string,
  fName: string,
  lName: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  card: string,
  date: string
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      payment: {
        create: {
          card_first_name: fName,
          card_last_name: lName,
          card_number: card,
          card_exp_date: date,
          billing_address1: address1,
          billing_address2: address2,
          city,
          state,
          zip,
        },
      },
    },
    select: {
      payment: {
        select: {
          id: true,
        },
      },
    },
  });
};

export const deletePaymentDB = async (id: string, paymentId: number) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      payment: {
        delete: {
          id: paymentId,
        },
      },
    },
  });
};

export const getFavoriteProductDB = async (id: string) => {
  const favorites = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      favorites: {
        select: {
          product_id: true,
        },
      },
    },
  });

  const updatedFavoritesKey = favorites.favorites.map(({ product_id }) => ({
    id: product_id,
  }));

  return prisma.product.findMany({
    where: {
      OR: updatedFavoritesKey,
    },
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
  });
};
