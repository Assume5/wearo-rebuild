import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { serverUrl } from '../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
export const useCheckAdminLogin = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = async () => {
      const accessToken = Cookies.get('access_token_admin');
      const refreshToken = Cookies.get('refresh_token_admin');

      if (!accessToken || !refreshToken) {
        if (pathname === '/admin' || pathname === '/admin/') return;
        navigate('/');
      } else {
        const res = await fetch(`${serverUrl}/admin/check/token`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            AuthorizationAccessToken: `Bearer ${accessToken}`,
            AuthorizationRefreshToken: `Bearer ${refreshToken}`,
          },
        });

        const response = await res.json();

        if (!response.success) {
          Cookies.remove('access_token_admin');
          Cookies.remove('refresh_token_admin');
          if (pathname === '/admin' || pathname === '/admin/') return;
          navigate('/');
        } else {
          if (response.accessToken) {
            Cookies.set('access_token_admin', response.accessToken, { secure: true });
          }
          if (pathname === '/admin' || pathname === '/admin/') navigate('/admin/dashboard');
        }
      }
    };

    handler();
  }, []);
};
