import { Role } from "./account";

export type IProductDetails = {
  product_id: string;
  selected_size: string;
  quanitity: number;
  product_image: string;
  product_name: string;
  product_price: number;
};

export type ICheckout = {
  email: string;
  cardFirst: string;
  cardLast: string;
  phone: string;
  card: string;
  shippingFirst: string;
  shippingLast: string;
  shippingAdd1: string;
  shippingAdd2: string;
  shippingCity: string;
  shippingZip: string;
  shippingState: string;
  billingFirst: string;
  billingLast: string;
  billingAdd1: string;
  billingAdd2: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  total: number;
  productDetails: IProductDetails[];
  role: Role;
  apply_coupon: boolean;
  discount: number;
  guestId: string;
};
