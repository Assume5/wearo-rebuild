import { faCircleUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { IHeader } from '../../types';
import { serverUrl, timeout } from '../../utils/constants';
import { AuthForm } from '../Forms/AuthForm';
import { HeaderLinks } from './HeaderLinks';
import { MobileHeader } from './MobileHeader';
export const Header = () => {
  const [data, setData] = useState<IHeader[]>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userCtx = useContext(UserContext);

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

  useEffect(() => {
    //if has token check expires
    //if no set guest cookie
  }, [userCtx]);

  return (
    <nav className="header">
      <div className="header-left">
        <MobileHeader data={data} />
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/logo.png" />
        </div>
      </div>

      <div className="content">
        {userCtx.user.isLogin ? (
          <div className="user" onClick={() => navigate('/account')}>
            <FontAwesomeIcon icon={faCircleUser} />
            <span>{userCtx.user.firstName}</span>
          </div>
        ) : (
          <div className="user" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faCircleUser} />
            <span>Login</span>
          </div>
        )}
        <div className="favorites">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="cart has-item">
          <FontAwesomeIcon icon={faShoppingCart} />
          <div className="dot"></div>
        </div>
      </div>
      <HeaderLinks data={data} className="desktop" />
      <AuthForm setShowModal={setShowModal} show={showModal} />
    </nav>
  );
};
