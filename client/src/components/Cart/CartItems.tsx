import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ICart } from '../../types/cart';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../../utils/function';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>;
  showTrashBtn?: boolean;
  showQuantitySelect?: boolean;
}

export const CartItems = ({ cart, setCart, showTrashBtn = true, showQuantitySelect = true }: Props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onQuantityChange = async (id: number, quantity: string) => {
    setLoading(true);
    let url = '';
    let option = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        cartId: id,
        quanitity: quantity,
      }),
    };

    if (!userCtx.user.isLogin) {
      const guestId = Cookies.get('guest_cookie');
      if (!guestId) return;
      url = `${serverUrl}/cart/guest/${id}`;
    } else {
      url = `${serverUrl}/cart/${id}`;
      option.headers = headerOptionForToken();
    }

    const res = await fetch(url, option);
    const response = await res.json();
    if (!res.ok) {
      console.error(response);
    } else {
      if (userCtx.user.isLogin) {
        if (!response.success) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          await generateGuestCookie();
          userCtx.setUser({ isLogin: false, checked: true });
          setError('Session Expire Please Add to Cart Again');
          return;
        }
        if (response.accessToken) Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
      if (response.success) {
        const temp = [...cart];
        const index = temp.findIndex((item) => item.id === id);
        const tempItem = { ...temp[index] };
        tempItem.quanitity = +quantity;
        temp[index] = tempItem;
        setTimeout(() => {
          setCart([...temp]);
          setLoading(false);
        }, timeout);
      }
    }
  };

  const onItemDelete = async (id: number) => {
    setLoading(true);
    let url = '';
    let option = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        cartId: id,
      }),
    };

    if (!userCtx.user.isLogin) {
      const guestId = Cookies.get('guest_cookie');
      if (!guestId) return;
      url = `${serverUrl}/cart/guest/${id}`;
    } else {
      url = `${serverUrl}/cart/${id}`;
      option.headers = headerOptionForToken();
    }

    const res = await fetch(url, option);
    const response = await res.json();
    if (!res.ok) {
      console.error(response);
    } else {
      if (userCtx.user.isLogin) {
        if (!response.success) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          await generateGuestCookie();
          userCtx.setUser({ isLogin: false, checked: true });
          setError('Session Expire Please Add to Cart Again');
          return;
        }
        if (response.accessToken) Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
      if (response.success) {
        const temp = [...cart];
        const result = temp.filter((item) => item.id !== id);
        setTimeout(() => {
          setCart([...result]);
          setLoading(false);
        }, timeout);
      }
    }
  };

  return (
    <div className="cart-items-container">
      {cart.map((item) => {
        return (
          <div className="cart-item" key={item.id}>
            <div className="product-image" onClick={() => navigate(`/product/${item.product_id}`)}>
              <LazyLoad src={item.product_image} />
            </div>
            <div className="product-details">
              <h4 onClick={() => navigate(`/product/${item.product_id}`)}>{item.product_name}</h4>
              <p>Price: {item.product_price}</p>
              <p>Size: {item.selected_size === 'onesize' ? 'One Size' : item.selected_size}</p>
              <div className="quantity">
                <p>Quantity: </p>
                <div className="quantity-box">
                  {showQuantitySelect ? (
                    <select defaultValue={item.quanitity} onChange={(e) => onQuantityChange(item.id, e.target.value)}>
                      {Array.from(Array(20).keys()).map((i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    item.quanitity
                  )}
                </div>
              </div>
            </div>
            {showTrashBtn && (
              <FontAwesomeIcon icon={faTrash} className="trash-can" onClick={() => onItemDelete(item.id)} />
            )}
          </div>
        );
      })}

      {loading && <div className="loading-overlay"></div>}
    </div>
  );
};
