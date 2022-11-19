import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { CartItems } from '../../components/Cart/CartItems';
import { CartSideBar } from '../../components/Cart/CartSideBar';
import { Page } from '../../components/Page/Page';
import { CartContext } from '../../contexts/CartContext';

export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const [showItems, setShowItems] = useState(false);

  if (!cartCtx || !cartCtx.cart || !cartCtx.setCart) return null;

  return (
    <Page rootClass="checkout-page">
      <>
        <div className="checkout-forms">
          <p>Form</p>
        </div>
        <div className="checkout-summary">
          <div className={`total-item-in-order ${showItems ? 'active' : 'hide'}`}>
            <p onClick={() => setShowItems(!showItems)}>
              Total Items in Order({cartCtx.cart.length}) <FontAwesomeIcon icon={faAngleRight} />
            </p>
            <CartItems cart={cartCtx.cart} setCart={cartCtx.setCart} showTrashBtn={false} showQuantitySelect={false} />
          </div>

          <CartSideBar cart={cartCtx.cart} setCart={cartCtx.setCart} showCheckoutBtn={false} />
        </div>
      </>
    </Page>
  );
};
