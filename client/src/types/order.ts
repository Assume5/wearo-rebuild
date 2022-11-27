import { ICart } from './cart';

export type IOrderDetail = {
  id: number;
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quanitity: number;
  selected_size: string;
};

export type IOrder = {
  apply_coupon?: boolean;
  discount?: number;
  email: string;
  id: string;
  order_date: string;
  order_details: ICart[];
  order_status: string;
  phone: string;
  shipping_address1: string;
  shipping_address2?: string;
  shipping_city: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_state: string;
  shipping_zip: string;
  total_pirce: number;
  tracking_number?: string;
};
