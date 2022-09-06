import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { IPromo } from '../../types/page-option';

interface Props {
  data: IPromo[];
}

export const PromoHero: React.FC<Props> = ({ data }) => {
  const [currentSlideData, setCurrentSlideData] = useState('');
  const [slideIndexData, setSlideIndexData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length) {
      setCurrentSlideData(data[0].text);
      setSlideIndexData(0);
    }
  }, [data]);

  useEffect(() => {
    if (window.innerWidth >= 768) {
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

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      const container: HTMLDivElement | null = document.querySelector('.slider-lists');

      if (container && container.scrollWidth > container.clientWidth) {
        let mouseDown = false;
        let startX: number, scrollLeft: number;

        const dragging = (e: any) => {
          mouseDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        };

        const stopDragging = (e: any) => {
          mouseDown = false;
        };

        container.addEventListener('mousemove', (e: any) => {
          e.preventDefault();
          if (!mouseDown) {
            return;
          }
          const x = e.pageX - container.offsetLeft;
          const scroll = x - startX;
          container.scrollLeft = scrollLeft - scroll;
        });
        container?.addEventListener('mousedown', dragging, false);
        container?.addEventListener('mouseup', stopDragging, false);
        container?.addEventListener('mouseleave', stopDragging, false);
      }
    }
  });

  const onSliderClick = (key: string, i: number) => {
    setCurrentSlideData(key);
    setSlideIndexData(i);
  };

  const onHeroImageClick = (key: string, id: string) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/item/${keyWithDash}/${id}`);
  };

  return (
    <div className="promo-hero">
      <div className="promo">
        <div className="image-container">
          {data.map((item) => {
            return (
              <div
                className={`carousel-item ${currentSlideData === item.text ? 'active' : ''}`}
                key={item.id}
                onClick={() => onHeroImageClick(item.text, item.text)}
              >
                <img src={item.image} alt="" />
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
