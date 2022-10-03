import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const LazyLoad: React.FC<Props> = (Props) => {
  return <LazyLoadImage {...Props} effect="opacity" />;
};
