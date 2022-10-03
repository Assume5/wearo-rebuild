import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { ProductContainerLoading } from './ProductContainerLoading';
import { ProductFilterLoading } from './ProductFilterLoading';

export const ProductsLoadingPage = () => {
  return (
    <>
      <Page rootClass="product">
        <>
          <ProductFilterLoading />
          <ProductContainerLoading />
        </>
      </Page>
    </>
  );
};
