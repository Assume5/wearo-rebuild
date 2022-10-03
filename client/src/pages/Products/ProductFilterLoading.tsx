import React from 'react';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const ProductFilterLoading = () => {
  return (
    <>
      <SkeletonLoading height={50} rootClassName={'h1'} />
      <div className="product-filter">
        <SkeletonLoading inline={true} width={100} count={5} />
      </div>
    </>
  );
};
