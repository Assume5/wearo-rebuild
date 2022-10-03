import { faCircleUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IHeader } from '../../types';
import { serverUrl, timeout } from '../../utils/constants';
import { HeaderLinks } from './HeaderLinks';
import { MobileHeader } from './MobileHeader';
export const Header = () => {
  const [data, setData] = useState<IHeader[]>();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await fetch(`${serverUrl}/header`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Error Fetching Header Data: ${data.error}`);
      }

      setTimeout(() => {
        setData(data.data);
      }, timeout);
    };
    fetchHeader();
  }, []);

  return (
    <nav className="header">
      <div className="header-left">
        {isMobile && <MobileHeader data={data} />}
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/logo.png" />
        </div>
      </div>

      <div className="content">
        <div className="user">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>Login</span>
        </div>
        <div className="favorites">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="cart has-item">
          <FontAwesomeIcon icon={faShoppingCart} />
          <div className="dot"></div>
        </div>
      </div>
      {!isMobile && <HeaderLinks data={data} />}
    </nav>
  );
};
