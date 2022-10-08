export type ISearchParams = {
  pageSize: string;
  sortBy: string;
  size: string;
  brand: string;
  color: string;
  type: string;
  material: string;
};

export type ISearchParamsDB = {
  size: {
    contains: string;
  }[];
  brand: {
    contains: string;
  }[];
  color: {
    contains: string;
  }[];
  type: {
    contains: string;
  }[];
  material: {
    contains: string;
  }[];
};

export type IObjParams = {
  brand: any[];
  color: any[];
  material: any[];
};
