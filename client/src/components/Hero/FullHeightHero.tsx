import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  bgImg: string;
  overlay?: boolean;
  text?: string;
  textLink?: string;
}

export const FullHeightHero: React.FC<Props> = ({ bgImg, overlay, text, textLink }) => {
  const navigate = useNavigate();
  return (
    <div className="full-height-hero">
      <LazyLoad src={bgImg} alt="" />
      {overlay && <div className="overlay"></div>}
      {text && textLink && <p onClick={() => navigate(textLink)}>{text}</p>}
    </div>
  );
};
