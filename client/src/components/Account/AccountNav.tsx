import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { generateGuestCookie } from '../../utils/function';

interface Props {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountNav = ({ currentPage, setCurrentPage }: Props) => {
  const userCtx = useContext(UserContext);

  const onSignOutClick = async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    await generateGuestCookie();
    userCtx.setUser({ isLogin: false, checked: true });
  };

  return (
    <div className="account-nav">
      <p
        className={`animate-bottom ${currentPage === 'settings' && 'active'}`}
        onClick={() => setCurrentPage('settings')}
      >
        Settings
      </p>
      <p className={`animate-bottom ${currentPage === 'orders' && 'active'}`} onClick={() => setCurrentPage('orders')}>
        Orders
      </p>
      <p className="animate-bottom" onClick={() => onSignOutClick()}>
        Sign Out
      </p>
    </div>
  );
};
