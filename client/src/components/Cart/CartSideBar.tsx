import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ICart } from '../../types/cart';
import { AuthForm } from '../Forms/AuthForm';

interface Props {
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>;
}

export const CartSideBar = ({ cart, setCart }: Props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [total, setTotal] = useState(0);
  const [addDiscount, setAddDiscount] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const total = cart.reduce((prev, current) => prev + current.product_price * current.quanitity, 0).toFixed(2);
    setTotal(+total);
  }, [cart]);

  const onApplyCouponClick = () => {
    if (!coupon) return;

    console.log(coupon);
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
        <p>
          Shipping <strong>{total > 60 ? 'FREE' : '15.00'}</strong>
        </p>
      </div>
      <p className="total">
        Total <strong>{total > 60 ? total : (total + 15).toFixed(2)}</strong>
      </p>
      <div className="discount">
        Discount Code:{' '}
        <strong onClick={() => setAddDiscount(!addDiscount)}>{!addDiscount ? 'Apply Discount' : 'Cancel'}</strong>
        {addDiscount && (
          <div className="apply-discount">
            <input onChange={(e) => setCoupon(e.target.value)} type="text" placeholder="Enter Coupon Code" />
            <button onClick={onApplyCouponClick}>Apply</button>
          </div>
        )}
      </div>
      <button onClick={() => navigate('/checkout')}>{!userCtx.user.isLogin ? 'Checkout as Guest' : 'Checkout'}</button>
    </div>
  );
};
