import React from 'react';
import { IFavorites } from './account';
import { IProduct } from './product';

export interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export type IUser = {
  isLogin: boolean;
  checked: boolean;
  firstName?: string;
};

export type IPromo = {
  apply: boolean;
  discount: number;
};

export interface PromoContextType {
  promo: IPromo;
  setPromo: React.Dispatch<React.SetStateAction<IPromo>>;
}

export interface FavoritesContextType {
  favorites: IProduct[] | null;
  setFavorites: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
}
