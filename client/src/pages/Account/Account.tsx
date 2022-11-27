import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountNav } from '../../components/Account/AccountNav';
import { Orders } from '../../components/Account/Orders';
import { Settings } from '../../components/Account/Settings';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { UserContext } from '../../contexts/UserContext';
import { useCheckLogin } from '../../hooks/useCheckLogin';
import { IAccount } from '../../types/account';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie } from '../../utils/function';

export const Account = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('settings');
  const [data, setData] = useState<IAccount | null>(null);

  useEffect(() => {
    if (!userCtx.user.checked) return;

    if (!userCtx.user.isLogin) {
      navigate('/');
    }
  }, [userCtx]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = Cookies.get('refresh_token');
      if (!accessToken || !refreshToken) {
        userCtx.setUser({ isLogin: false, checked: true });
        navigate('/');
        return;
      }

      const res = await fetch(`${serverUrl}/account/details`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          AuthorizationAccessToken: `Bearer ${accessToken}`,
          AuthorizationRefreshToken: `Bearer ${refreshToken}`,
        },
      });

      const response = await res.json();

      if (!res.ok) {
        console.error(`Error on getting Account Information: ${response}`);
      }

      if (!response.success) {
        //if token expires
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        await generateGuestCookie();
        userCtx.setUser({ isLogin: false, checked: true });
      } else {
        if (response.accessToken) {
          Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
        }
        console.log(response.data);

        setTimeout(() => {
          setData(response.data);
        }, timeout);
      }
    };

    fetchData();
  }, []);

  if (!data)
    return (
      <Page rootClass="account-page">
        <div className="account-settings-container">
          <SkeletonLoading rootClassName="account-nav" height={80} inline />
          <SkeletonLoading height={400} count={4} style={{ marginBottom: 50 }} />
        </div>
      </Page>
    );

  return (
    <Page rootClass="account-page">
      <>
        <AccountNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="account-settings-container">
          {currentPage === 'settings' ? <Settings data={data} setData={setData} /> : <Orders data={data} />}
        </div>
      </>
    </Page>
  );
};
