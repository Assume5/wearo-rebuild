import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const CartLoading = () => {
  return (
    <Page rootClass="cart-page">
      <>
        <div className="cart-items-container">
          <SkeletonLoading height={400} />
          <SkeletonLoading height={400} />
          <SkeletonLoading height={400} />
          <SkeletonLoading height={400} />
        </div>
        <div className="cart-size-bar cart-items-total">
          <SkeletonLoading height={300} />
        </div>
      </>
    </Page>
  );
};
