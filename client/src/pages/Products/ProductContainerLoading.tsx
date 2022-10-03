import React from 'react';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';

export const ProductContainerLoading = () => {
  return (
    <>
      <div className="products-container">
        {new Array(10).fill(undefined).map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="product">
                <div className="product-img">
                  <SkeletonLoading height={'95%'} />
                </div>
                <div className="product-text">
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading circle={true} width={20} height={20} />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
