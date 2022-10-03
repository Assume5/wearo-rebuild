export type ISize = {
  id: number;
  product_id: string;
  size: string;
  stock: number;
};

export type IProduct = {
  brand: string;
  checkout_count: number;
  color: string;
  color_hex: string | null;
  description: string | null;
  related_product_id: string | null;
  gender: string;
  id: string;
  img1: string;
  img2: string | null;
  img3: string | null;
  img4: string | null;
  material: string | null;
  name: string;
  price: number;
  type: string;
  product_size: ISize[];
};

export type IFilterColor = {
  [key: string]: string;
};

export type IFilter = {
  size: string[];
  brand: string[];
  color: string[];
  type: string[];
  material: string[];
  sortBy: string[];
};

export type ISearchParams = {
  pageSize: string;
  sortBy: string;
  product_size: string;
  brand: string;
  color: string;
  type: string;
  material: string;
};

export type IParamsSize = {
  product_size: {
    some: {
      size: {
        contains: string;
      };
    };
  };
};

export type IParamsType = {
  type: {
    contains: string;
  };
};

export type IParams = {
  [key: string]: {
    contains: string;
  };
};
