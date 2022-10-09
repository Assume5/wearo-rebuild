import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { IPromo } from '../../types/page-option';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  data: IPromo[] | undefined;
}

export const PromoHero: React.FC<Props> = ({ data }) => {
  const [currentSlideData, setCurrentSlideData] = useState('');
  const [slideIndexData, setSlideIndexData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length) {
      setCurrentSlideData(data[0].text);
      setSlideIndexData(0);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const len = data.length;
      const nextSlide = setTimeout(() => {
        if (slideIndexData + 1 === len) {
          setCurrentSlideData(data[0].text);
          setSlideIndexData(0);
        } else {
          setCurrentSlideData(data[slideIndexData + 1].text);
          setSlideIndexData(slideIndexData + 1);
        }
      }, 5000);

      return () => clearTimeout(nextSlide);
    }
  }, [slideIndexData, currentSlideData, data]);

  const onSliderClick = (key: string, i: number) => {
    setCurrentSlideData(key);
    setSlideIndexData(i);
  };

  const onHeroImageClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  if (!data) return <SkeletonLoading rootClassName="full-height-hero" height={'100%'} />;

  return (
    <div className="promo-hero">
      <div className="promo">
        <div className="image-container">
          {data.map((item) => {
            return (
              <div
                className={`carousel-item ${currentSlideData === item.text ? 'active' : ''}`}
                key={item.id}
                onClick={() => onHeroImageClick(item.product_id)}
              >
                <LazyLoad src={item.image} alt="" />
                <div className="overlay-text">
                  <p>{item.text}</p>
                </div>
                <div className="overlay"></div>
              </div>
            );
          })}
        </div>
        <div className="slider-lists">
          {data.map((item, i) => {
            return (
              <div
                className={`slider-list ${currentSlideData === item.text ? 'active' : ''}`}
                key={item.id}
                onClick={() => onSliderClick(item.text, i)}
              >
                <img src={item.image} alt="" />
                <p>{item.text}</p>
                <div className="overlay"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
