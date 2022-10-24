import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { IProductDetails } from '../../types/product';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie, headerOptionForToken, trimDash } from '../../utils/function';
import { ProductSpecification } from './ProductSpecification';

interface Props {
  product: IProductDetails;
}

export const ProductDetails = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState(product.product_size.length === 1 ? 'onesize' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);

  const onATC = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    if (!cartCtx.cart) {
      setLoading(false);
      return;
    }

    const exists = cartCtx.cart.find((item) => item.product_id === product.id && item.selected_size === selectedSize);

    if (exists && exists.quanitity >= 20) {
      setError('You have reached the maximum quantity of items allowed');
      setLoading(false);
      return;
    }
    setError('');
    if (!selectedSize) {
      setError('Please Select a Size');
      setLoading(false);
      return;
    }

    let url = ``;
    let option = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product.id,
        product_image: product.img1,
        product_price: product.price,
        selected_size: selectedSize,
        product_name: product.name,
        quanitity: 1,
      }),
    };

    if (!userCtx.user.isLogin) {
      const guestId = Cookies.get('guest_cookie');
      if (!guestId) return;
      url = `${serverUrl}/cart/guest/${guestId}`;
    } else {
      url = `${serverUrl}/cart`;
      option.headers = headerOptionForToken();
    }

    const res = await fetch(url, option);
    const response = await res.json();
    if (!res.ok) {
      console.error(response);
      setError('Internal Server Error, Please try again later');
      setLoading(false);
      return;
    } else {
      if (userCtx.user.isLogin) {
        if (!response.success) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          await generateGuestCookie();
          userCtx.setUser({ isLogin: false, checked: true });
          setError('Session Expire Please Add to Cart Again');
          setLoading(false);
          return;
        }
        if (response.accessToken) Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
    }
    const temp = [...cartCtx.cart];

    const index = temp.findIndex((item) => item.product_id === product.id && item.selected_size === selectedSize);
    if (index !== -1) {
      const tempItem = { ...temp[index] };
      tempItem.quanitity = tempItem.quanitity + 1;
      temp[index] = tempItem;
      setTimeout(() => {
        cartCtx.setCart([...temp]);
        setLoading(false);
      }, timeout);
    } else {
      setTimeout(() => {
        cartCtx.setCart([
          ...temp,
          {
            id: response.cartID,
            product_id: product.id,
            product_image: product.img1,
            product_price: product.price,
            selected_size: selectedSize,
            product_name: product.name,
            quanitity: 1,
          },
        ]);
        setLoading(false);
      }, timeout);
    }
  };

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <hr />
      <ProductSpecification product={product} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={(e) => onATC(e)}>Add to Cart</button>
      {loading && <div className="loading-overlay"></div>}
    </div>
  );
};
