import { IProduct } from './product';

export type IPayment = {
  id: string;
  city: string;
  state: string;
  zip: string;
  card_first_name: string;
  card_last_name: string;
  card_exp_date: string;
  billing_address1: string;
  billing_address2?: string;
  card_number: string;
};

export type IOrders = {
  id: string;
  order_date: string;
  order_status?: string;
  total_pirce: number;
};

export type IAccount = {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  shipping_first_name?: string;
  shipping_last_name?: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  payment: IPayment[];
  orders: IOrders[];
};

export type IFavorites = {
  product: IProduct;
};
