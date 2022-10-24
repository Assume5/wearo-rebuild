import { faCircleUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { useCheckLogin } from '../../hooks/useCheckLogin';
import { IHeader } from '../../types';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie } from '../../utils/function';
import { AuthForm } from '../Forms/AuthForm';
import { LazyLoad } from '../LazyLoad/LazyLoad';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';
import { HeaderCartItems } from './HeaderCartItems';
import { HeaderLinks } from './HeaderLinks';
import { MobileHeader } from './MobileHeader';

export const Header = () => {
  useCheckLogin();
  const [data, setData] = useState<IHeader[]>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);

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
    if (!userCtx.user.checked) return;
    console.log(cartCtx);
  }, [cartCtx, userCtx]);

  const onUserClick = () => {
    if (userCtx.user.isLogin) {
      navigate('/account');
    } else {
      setShowModal(true);
    }
  };

  const onSignOutClick = async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    await generateGuestCookie();
    userCtx.setUser({ isLogin: false, checked: true });
  };

  return (
    <nav className="header">
      <div className="header-left">
        <MobileHeader data={data} />
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/logo.png" />
        </div>
      </div>

      <div className="content">
        <div className="user" onClick={() => onUserClick()}>
          <FontAwesomeIcon icon={faCircleUser} />
          {userCtx.user.checked ? (
            <>
              <span>{userCtx.user.isLogin ? userCtx.user.firstName : 'Login'}</span>
              {userCtx.user.isLogin && (
                <div className="user-drop-menu">
                  <Link className="animate-bottom" to={'/account'}>
                    My Account
                  </Link>
                  <p className="animate-bottom" onClick={onSignOutClick}>
                    Sign Out
                  </p>
                </div>
              )}
            </>
          ) : (
            <SkeletonLoading width={100} />
          )}
        </div>
        <div className="favorites">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={`cart ${cartCtx.cart && cartCtx.cart.length ? 'has-item' : ''}`}>
          {cartCtx.cart ? (
            <>
              <FontAwesomeIcon
                icon={faShoppingCart}
                onClick={() => {
                  navigate('/cart');
                }}
              />
              <div className="dot"></div>
              {cartCtx.cart && cartCtx.cart.length ? <HeaderCartItems cart={cartCtx.cart} /> : <></>}
            </>
          ) : (
            <SkeletonLoading width={30} height={20} style={{ margin: '0 8px 0 32px' }} />
          )}
        </div>
      </div>
      <HeaderLinks data={data} className="desktop" />
      <AuthForm setShowModal={setShowModal} show={showModal} />
    </nav>
  );
};
