import { faHeart as NotFavorite } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { MouseEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { UserContext } from '../../contexts/UserContext';
import { IProduct } from '../../types/product';
import { serverUrl } from '../../utils/constants';
import { headerOptionForToken } from '../../utils/function';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  products: IProduct[];
}

export const Products: React.FC<Props> = ({ products }) => {
  const userCtx = useContext(UserContext);
  const favoritesCtx = useContext(FavoritesContext);

  const onFavoriteClicks = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string) => {
    e.preventDefault();

    if (!userCtx.user.isLogin) {
      const userIcon = document.querySelector('.header .user') as HTMLDivElement;
      userIcon.click();
      return;
    }

    const exists = favoritesCtx.favorites.find((favorite) => favorite.id === id);
    let add = false;
    if (!exists) {
      add = true;
    }

    try {
      const res = await fetch(`${serverUrl}/product/favorite/${id}`, {
        method: 'POST',
        headers: headerOptionForToken(),
        body: JSON.stringify({
          add,
        }),
      });

      const result = await res.json();

      console.log(result);

      if (result.accessToken) Cookies.set('access_token', result.accessToken, { expires: 7, secure: true });

      const temp = [...favoritesCtx.favorites];
      if (add) {
        favoritesCtx.setFavorites([...temp, result.data]);
      } else {
        favoritesCtx.setFavorites(temp.filter((favorite) => favorite.id !== id));
      }
    } catch (error) {
      console.error('Error on favoring: ', error);
    }
  };
  return (
    <div className="products-container">
      {products.map((item) => {
        return (
          <div className="product" key={item.id}>
            <Link className="product-img" to={`/product/${item.id}`}>
              <div className="img-container">
                <LazyLoad className="font-img" src={item.img1} alt="" />
                {item.img2 && <LazyLoad className="back-img" src={item.img2} alt="" />}
              </div>
              <div
                className={`heart-container ${
                  favoritesCtx.favorites.find((favorite) => favorite.id === item.id) ? 'favorite' : 'not-favorite'
                }`}
                onClick={(e) => onFavoriteClicks(e, item.id)}
              >
                <FontAwesomeIcon icon={NotFavorite} className="favorite-not" />
                <FontAwesomeIcon icon={faHeart} className="favorite-fill" fill="#a83f39" color="#a83f39" />
              </div>
            </Link>
            <div className="product-text">
              <h5>{item.name.toLowerCase()}</h5>
              <h5>$ {item.price}</h5>
              <div
                className="color-box"
                style={{ backgroundColor: item.color_hex ? item.color_hex : item.color }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
