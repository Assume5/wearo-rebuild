import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const OrderLoading = () => {
  return (
    <Page rootClass="order-page">
      <div className="order-page-container">
        <SkeletonLoading height={50} />
        <hr />
        <SkeletonLoading height={50} />
        <hr />
        <div className={`order-status`}>
          <SkeletonLoading height={75} />
        </div>
        <hr />
        <div className="shipping-information">
          <SkeletonLoading height={50} />
          <SkeletonLoading height={30} />
          <SkeletonLoading height={30} />
          <SkeletonLoading height={30} />
          <SkeletonLoading height={50} />
          <SkeletonLoading height={30} />
          <SkeletonLoading height={30} />
        </div>
        <hr />
        <div className="order-summary">
          <SkeletonLoading height={175} />
          <SkeletonLoading height={175} />
          <SkeletonLoading height={175} />
        </div>
        <div className="order-price-summary">
          <div className="cart-size-bar cart-items-total">
            <SkeletonLoading height={200} />
          </div>
        </div>
      </div>
    </Page>
  );
};
