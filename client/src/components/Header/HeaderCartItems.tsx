import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICart } from '../../types/cart';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  cart: ICart[];
}

export const HeaderCartItems = ({ cart }: Props) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((prev, current) => prev + current.product_price * current.quanitity, 0).toFixed(2);
    setTotal(+total);
  }, [cart]);

  return (
    <div className="cart-items-container">
      <div className="cart-items">
        {cart.map((item) => {
          return (
            <div key={item.id} onClick={() => navigate(`/product/${item.product_id}`)} className="cart-item">
              <div className="product-image">
                <LazyLoad src={item.product_image} />
              </div>
              <div className="product-details">
                <h4>{item.product_name}</h4>
                <p>Price: {item.product_price}</p>
                <p>Size: {item.selected_size === 'onesize' ? 'One Size' : item.selected_size}</p>
                <p>Quantity: {item.quanitity}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-items-total">
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
        <button onClick={() => navigate('/checkout')}>Checkout</button>
        <button onClick={() => navigate('/cart')}>Cart</button>
      </div>
    </div>
  );
};
