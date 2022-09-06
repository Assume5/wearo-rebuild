import { faHeart as NotFavorite } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types/product';

interface Props {
  products: IProduct[];
}

export const Products: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((item) => {
        console.log(item);

        return (
          <div className="product" key={item.id}>
            <Link className="product-img" to={`/product/${item.id}`}>
              <img className="font-img" src={item.img1} alt="" />
              {item.img2 && <img className="back-img" src={item.img2} alt="" />}
              <FontAwesomeIcon icon={NotFavorite} className="not-favorite" />
              <FontAwesomeIcon icon={faHeart} className="favorite" />
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
