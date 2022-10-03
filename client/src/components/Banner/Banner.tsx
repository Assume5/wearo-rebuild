import React from 'react';
import { IBanner } from '../../types/page-option';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';

interface Props {
  banner: IBanner | undefined;
}

export const Banner: React.FC<Props> = ({ banner }) => {
  if (!banner) return <SkeletonLoading rootClassName="banner" height={120} />;

  return (
    <div className="banner">
      <h3>{banner.text}</h3>
      <p>
        Use Code: <strong>{banner.coupon_code}</strong>
      </p>
    </div>
  );
};
