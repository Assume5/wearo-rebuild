import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { ProductContainerLoading } from './ProductContainerLoading';
import { ProductFilterLoading } from './ProductFilterLoading';

interface Props {
  isFavorites?: boolean;
}

export const ProductsLoadingPage = ({ isFavorites }: Props) => {
  return (
    <>
      <Page rootClass={`product ${isFavorites && 'favorites-loading'}`}>
        <>
          <ProductFilterLoading />
          <ProductContainerLoading />
        </>
      </Page>
    </>
  );
};
