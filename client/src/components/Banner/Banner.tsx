import React from 'react';
import { IBanner } from '../../types/page-option';

interface Props {
  banner: IBanner;
}

export const Banner: React.FC<Props> = ({ banner }) => {
  return (
    <div className="banner">
      <h3>{banner.text}</h3>
      <p>
        Use Code: <strong>{banner.coupon_code}</strong>
      </p>
    </div>
  );
};
