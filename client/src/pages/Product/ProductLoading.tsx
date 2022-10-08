import React from 'react';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const ProductLoading = () => {
  return (
    <Page rootClass="product-page">
      {
        <>
          <SkeletonLoading rootClassName="carousel" inline={true} />
          <div className="product-details">
            <SkeletonLoading height={32} />
            <SkeletonLoading height={150} />
            <SkeletonLoading height={10} />
            <SkeletonLoading height={35} />
            <SkeletonLoading count={7} height={20} />
            <SkeletonLoading count={5} height={35} inline={true} />
            <SkeletonLoading height={20} />
            <SkeletonLoading width={200} height={30} />
          </div>
        </>
      }
    </Page>
  );
};
