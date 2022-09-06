export type IBanner = {
  text: string;
  coupon_code: string;
};

export type IPromo = {
  id: number;
  text: string;
  product_id: string;
  price: string;
  image: string;
};

export type INew = {
  text: string;
  category: {
    category: string;
    page_screen: {
      text: string;
      background_image: string;
    }[];
  }[];
};

export type IOverview = {
  category: string;
  page_screen: {
    text: string;
    id: number;
    background_image: string;
  }[];
};
