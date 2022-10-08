import React from 'react';
import { IProductDetails } from '../../types/product';
import { trimDash } from '../../utils/function';

interface Props {
  product: IProductDetails;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductSpecification = ({ product, selectedSize, setSelectedSize }: Props) => {
  return (
    <div className="specification">
      <h2>SPECIFICATION:</h2>
      <p>Type: {product.type}</p>
      <p>Brand: {product.brand}</p>
      <p>Color: {product.color}</p>
      <p>Material : {product.material}</p>
      <p>Category : {trimDash(product.category.category)}</p>
      {product.product_size.length === 1 ? (
        <p>Size: One Size</p>
      ) : (
        <>
          <p>Size: </p>
          <div className="size">
            {product.product_size.map((size) => {
              return (
                <span
                  key={size.size}
                  className={`single-size ${size.stock < 1 && 'oos'} ${selectedSize === size.size && 'active'}`}
                  onClick={() => {
                    size.stock > 0 && setSelectedSize(size.size);
                  }}
                >
                  {size.size}
                </span>
              );
            })}
          </div>
        </>
      )}
      <p>
        Price : <strong>${product.price}</strong>
      </p>
    </div>
  );
};
