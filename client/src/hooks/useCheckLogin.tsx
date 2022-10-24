import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { serverUrl, timeout } from '../utils/constants';
import { generateGuestCookie } from '../utils/function';

export const useCheckLogin = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const handler = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = Cookies.get('refresh_token');
      const guestCookie = Cookies.get('guest_cookie');
      if (!accessToken || !refreshToken) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        if (guestCookie) {
          userCtx.setUser({ isLogin: false, checked: true });
          return;
        } else {
          await generateGuestCookie();
          userCtx.setUser({ isLogin: false, checked: true });
        }
      } else {
        const res = await fetch(`${serverUrl}/account/check/token`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            AuthorizationAccessToken: `Bearer ${accessToken}`,
            AuthorizationRefreshToken: `Bearer ${refreshToken}`,
          },
        });

        const response = await res.json();

        if (!response.success) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          await generateGuestCookie();
          userCtx.setUser({ isLogin: false, checked: true });
        } else {
          if (response.accessToken) {
            Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
          }
          setTimeout(() => {
            userCtx.setUser({ isLogin: true, checked: true, firstName: response.fName });
          }, timeout);
        }
      }
    };

    handler();
  }, []);
};
