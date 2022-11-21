import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const CheckoutLoading = () => {
  return (
    <Page rootClass="checkout-page">
      <>
        <div className="checkout-forms">
          <div className="checkout-form-container">
            <div className="check-out-form">
              <div className="checkout-form-header">
                <SkeletonLoading height={35} />
              </div>
              <SkeletonLoading height={55} count={9} />
            </div>
            <div className="check-out-form">
              <div className="checkout-form-header">
                <SkeletonLoading height={35} />
              </div>
            </div>
            <div className="check-out-form">
              <div className="checkout-form-header">
                <SkeletonLoading height={35} />
              </div>
            </div>
            <div className="check-out-form">
              <div className="checkout-form-header">
                <SkeletonLoading height={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-summary">
          <SkeletonLoading rootClassName="total-item-in-order" height={60} />
          <div className="cart-size-bar cart-items-total">
            <SkeletonLoading height={20} count={4} />
          </div>
        </div>
      </>
    </Page>
  );
};
