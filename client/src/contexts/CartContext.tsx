import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ICart } from '../types/cart';
import { serverUrl, timeout } from '../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../utils/function';
import { UserContext } from './UserContext';

interface Props {
  children: JSX.Element;
}

type contextType = {
  cart: ICart[] | null;
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>;
};

const contextState = {
  cart: null,
  setCart: () => {},
};

export const CartContext = createContext<contextType>(contextState);

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<ICart[] | null>(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    if (!userCtx.user.checked) return;
    const fetchCart = async () => {
      let url = ``;
      let option = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      };

      if (!userCtx.user.isLogin) {
        const guestId = Cookies.get('guest_cookie');
        console.log(guestId);
        if (!guestId) return;
        url = `${serverUrl}/cart/guest/${guestId}`;
      } else {
        url = `${serverUrl}/cart`;
        option.headers = headerOptionForToken();
      }
      const res = await fetch(url, option);
      const response = await res.json();
      console.log(response);

      if (!res.ok) {
        console.error(response);
      } else {
        if (userCtx.user.isLogin) {
          if (!response.success) {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            await generateGuestCookie();
            userCtx.setUser({ isLogin: false, checked: true });
          }
          if (response.accessToken) Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
        }

        setTimeout(() => {
          setCart(response.data);
        }, timeout);
      }
    };

    fetchCart();
  }, [userCtx]);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
