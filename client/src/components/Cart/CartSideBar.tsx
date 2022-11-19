import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PromoContext } from '../../contexts/PromoContext';
import { UserContext } from '../../contexts/UserContext';
import { ICart } from '../../types/cart';
import { serverUrl } from '../../utils/constants';
import { AuthForm } from '../AuthForms/AuthForm';

interface Props {
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>;
  showCheckoutBtn?: boolean;
}

export const CartSideBar = ({ cart, setCart, showCheckoutBtn = true }: Props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const promoCtx = useContext(PromoContext);
  const [total, setTotal] = useState(0);
  const [addDiscount, setAddDiscount] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);

  useEffect(() => {
    const total = cart.reduce((prev, current) => prev + current.product_price * current.quanitity, 0).toFixed(2);
    +total > 60 && setFreeShipping(true);
    setTotal(+total);
  }, [cart, promoCtx]);

  const onApplyCouponClick = async () => {
    if (!coupon) return;
    setError('');
    try {
      const res = await fetch(`${serverUrl}/checkout/promo-check`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          value: coupon.toLowerCase(),
        }),
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.error);
      } else {
        promoCtx.setPromo({ apply: true, discount: result.discount });
        setAddDiscount(false);
      }
    } catch (error) {
      console.error('ERROR onApplyCouponClick: ', error);
      setError('Something went wrong, please try again later!');
    }
  };

  const onLoginClick = () => {
    const userIcon = document.querySelector('.header .user') as HTMLDivElement;
    userIcon.click();
  };

  return (
    <div className="cart-size-bar cart-items-total">
      {!userCtx.user.isLogin && (
        <div className="login-note">
          <p>Login for a faster checkout</p>
          <button onClick={() => onLoginClick()}>Login</button>
        </div>
      )}
      <div className="subtotal">
        <p>
          Value <strong>{total}</strong>
        </p>
        {promoCtx.promo.apply && (
          <p>
            Discount <strong>{promoCtx.promo.discount * 100}%</strong>
          </p>
        )}
        <p>
          Shipping <strong>{freeShipping ? 'FREE' : '15.00'}</strong>
        </p>
      </div>
      <p className="total">
        Total{' '}
        <strong>
          {promoCtx.promo.apply
            ? +total * (1 - promoCtx.promo.discount) + (freeShipping ? 0 : 15)
            : +total + (freeShipping ? 0 : 15)}
        </strong>
      </p>
      <div className="discount">
        Discount Code:{' '}
        <strong onClick={() => setAddDiscount(!addDiscount)}>{!addDiscount ? 'Apply Discount' : 'Cancel'}</strong>
        {addDiscount && (
          <div className="apply-discount">
            <input onChange={(e) => setCoupon(e.target.value)} type="text" placeholder="Enter Coupon Code" />
            {error && <p className="error-message">{error}</p>}
            <button onClick={onApplyCouponClick}>Apply</button>
          </div>
        )}
      </div>
      {showCheckoutBtn && (
        <button onClick={() => navigate('/checkout')}>
          {!userCtx.user.isLogin ? 'Checkout as Guest' : 'Checkout'}
        </button>
      )}
    </div>
  );
};
