import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItems } from '../../components/Cart/CartItems';
import { CartSideBar } from '../../components/Cart/CartSideBar';
import { Page } from '../../components/Page/Page';
import { CartContext } from '../../contexts/CartContext';
import { CartLoading } from './CartLoading';

export const Cart = () => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  if (!cartCtx.cart) return <CartLoading />;

  return (
    <Page rootClass="cart-page">
      <>
        {cartCtx.cart.length ? (
          <>
            <CartItems cart={cartCtx.cart} setCart={cartCtx.setCart} />
            <CartSideBar cart={cartCtx.cart} setCart={cartCtx.setCart} />
          </>
        ) : (
          <div className="empty-cart">
            <p>Cart is empty</p>
            <button onClick={() => navigate('/')}>Shop our product</button>
          </div>
        )}
      </>
    </Page>
  );
};
