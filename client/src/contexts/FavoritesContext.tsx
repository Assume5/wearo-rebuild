import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FavoritesContextType } from '../types/context';
import { IProduct } from '../types/product';
import { serverUrl } from '../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../utils/function';
import { UserContext } from './UserContext';
interface Props {
  children: JSX.Element;
}

const contextState = {
  favorites: null,
  setFavorites: () => {},
};

export const FavoritesContext = createContext<FavoritesContextType>(contextState);

export const FavoritesContextContextProvider: React.FC<Props> = ({ children }) => {
  const userCtx = useContext(UserContext);

  const [favorites, setFavorites] = useState<IProduct[] | null>(null);
  useEffect(() => {
    if (!userCtx.user.checked || !userCtx.user.isLogin) {
      setFavorites([]);
      return;
    }

    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/account/favorites`, {
        method: 'GET',
        headers: headerOptionForToken(),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Error On Getting Favorites', result);
      }

      if (!result.success) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        await generateGuestCookie();
        userCtx.setUser({ isLogin: false, checked: true });
      }

      if (result.accessToken) Cookies.set('access_token', result.accessToken, { expires: 7, secure: true });

      setFavorites(result.data);
    };

    fetchData();
  }, [userCtx]);
  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>;
};
