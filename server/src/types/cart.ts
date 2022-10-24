export type UserUpdateInfo = {
  where: {
    id: string;
  };
  data: CartCreateInfo;
};

export type GuestUpdateInfo = {
  where: {
    cookie_value: string;
  };
  data: CartCreateInfo;
};

export type CartCreateInfo = {
  cart: {
    create: {
      product_id: string;
      product_image: string;
      product_name: string;
      product_price: number;
      selected_size: string;
      quanitity: number;
    };
  };
};
