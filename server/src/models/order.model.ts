import { prisma } from "../services/db";

export const getOrderByIdDB = async (id: string) => {
  return await prisma.orders.findFirst({
    where: {
      id,
    },
    select: {
      email: true,
      id: true,
      order_date: true,
      order_details: {
        select: {
          id: true,
          product_id: true,
          product_image: true,
          product_name: true,
          product_price: true,
          quanitity: true,
          selected_size: true,
        },
      },
      order_status: true,
      phone: true,
      shipping_address1: true,
      shipping_address2: true,
      shipping_city: true,
      shipping_first_name: true,
      shipping_last_name: true,
      shipping_state: true,
      shipping_zip: true,
      total_pirce: true,
      tracking_number: true,
      apply_coupon: true,
      discount: true,
    },
  });
};

export const searchOrderDB = async (email: string, id: string) => {
  return await prisma.orders.findFirst({
    where: {
      id,
      email,
    },
  });
};
