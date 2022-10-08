import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { ProductDetails } from '../../components/ProductDetail/ProductDetails';
import { ProductImages } from '../../components/ProductImages/ProductImages';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { IProductDetails } from '../../types/product';
import { serverUrl, timeout } from '../../utils/constants';
import { ProductLoading } from './ProductLoading';

export const Product = () => {
  const { productID } = useParams();
  const [data, setData] = useState<IProductDetails>();

  useEffect(() => {
    const fetchProductData = async () => {
      const res = await fetch(`${serverUrl}/product/${productID}`);
      const response = await res.json();
      console.log(response);
      setTimeout(() => {
        setData(response);
      }, timeout);
    };

    fetchProductData();
  }, []);

  if (!productID || !data) return <ProductLoading />;

  return (
    <Page rootClass="product-page">
      <>
        <ProductImages product={data} />
        <ProductDetails product={data} />
      </>
    </Page>
  );
};
