import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { CartItems } from '../../components/Cart/CartItems';
import { CartSideBar } from '../../components/Cart/CartSideBar';
import { CheckoutForms } from '../../components/CheckoutForms/CheckoutForms';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { IAccount } from '../../types/account';
import { timeout, serverUrl } from '../../utils/constants';
import { generateGuestCookie } from '../../utils/function';
import { CheckoutLoading } from './CheckoutLoading';

export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  const [showItems, setShowItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IAccount | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = Cookies.get('refresh_token');

      if (!accessToken || !refreshToken) {
        setTimeout(() => {
          setLoading(true);
        }, timeout);
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

        const data: IAccount = response.data;
        console.log(data);

        setTimeout(() => {
          setData(data);
          setLoading(true);
        }, timeout);
      }
    };

    fetchData();
  }, [userCtx]);

  if (!cartCtx || !cartCtx.cart || !cartCtx.setCart || !loading) return <CheckoutLoading />;

  return (
    <>
      <Page rootClass="checkout-page">
        <>
          <div className="checkout-forms">
            <CheckoutForms data={data} />
          </div>
          <div className="checkout-summary">
            <div className={`total-item-in-order ${showItems ? 'active' : 'hide'}`}>
              <p onClick={() => setShowItems(!showItems)}>
                Total Items in Order({cartCtx.cart.length}) <FontAwesomeIcon icon={faAngleRight} />
              </p>
              <CartItems
                cart={cartCtx.cart}
                setCart={cartCtx.setCart}
                showTrashBtn={false}
                showQuantitySelect={false}
              />
            </div>

            <CartSideBar cart={cartCtx.cart} setCart={cartCtx.setCart} showCheckoutBtn={false} />
          </div>
        </>
      </Page>
    </>
  );
};
