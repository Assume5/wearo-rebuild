import React, { useState } from 'react';
import { IProductDetails } from '../../types/product';
import { trimDash } from '../../utils/function';
import { ProductSpecification } from './ProductSpecification';

interface Props {
  product: IProductDetails;
}

export const ProductDetails = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <hr />
      <ProductSpecification product={product} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      <button>Add to Cart</button>
    </div>
  );
};
