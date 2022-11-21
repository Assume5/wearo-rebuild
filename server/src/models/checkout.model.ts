import { prisma } from "../services/db";
import { IProductDetails } from "../types/checkout";

export const promoCheckDB = async (code: string) => {
  return await prisma.coupons.findFirst({
    where: {
      value: code,
      status: "1",
    },
  });
};

export const createCheckout = async (
  email: string,
  cardFirst: string,
  cardLast: string,
  phone: string,
  card: string,
  shippingFirst: string,
  shippingLast: string,
  shippingAdd1: string,
  shippingAdd2: string,
  shippingCity: string,
  shippingZip: string,
  shippingState: string,
  billingFirst: string,
  billingLast: string,
  billingAdd1: string,
  billingAdd2: string,
  billingCity: string,
  billingState: string,
  billingZip: string,
  total: number,
  productDetails: IProductDetails[]
) => {
  return await prisma.orders.create({
    data: {
      billing_address1: billingAdd1,
      billing_city: billingCity,
      billing_first_name: billingFirst,
      billing_last_name: billingLast,
      billing_state: billingState,
      billing_zip: billingZip,
      card_holder_first_name: cardFirst,
      card_holder_last_name: cardLast,
      card_number: card,
      email: email,
      phone: phone,
      shipping_address1: shippingAdd1,
      shipping_city: shippingCity,
      shipping_first_name: shippingFirst,
      shipping_last_name: shippingLast,
      shipping_state: shippingState,
      shipping_zip: shippingZip,
      total_pirce: total,
      billing_address2: billingAdd2,
      shipping_address2: shippingAdd2,
      order_status: "1",
      order_details: {
        createMany: {
          data: productDetails,
        },
      },
    },
  });
};
