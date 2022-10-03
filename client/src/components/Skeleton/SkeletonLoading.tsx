import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface Props {
  baseColor?: string;
  highlightColor?: string;
  count?: number;
  rootClassName?: string;
  className?: string;
  circle?: boolean;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  inline?: boolean;
}

export const SkeletonLoading: React.FC<Props> = (Props) => {
  return (
    <SkeletonTheme>
      <Skeleton
        containerClassName={`skeleton ${Props.rootClassName} ${Props.inline && 'inline'}`}
        {...Props}
        duration={1}
      />
    </SkeletonTheme>
  );
};
