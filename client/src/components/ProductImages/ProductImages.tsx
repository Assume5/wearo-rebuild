import React, { useEffect, useRef, useState } from 'react';
import { IProductDetails } from '../../types/product';
import { LazyLoad } from '../LazyLoad/LazyLoad';

interface Props {
  product: IProductDetails;
}

export const ProductImages = ({ product }: Props) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const carouselContainer = useRef<HTMLDivElement>(null);
  let down = false;
  let startPositionX = 0;
  let mouseLeaveX = 0;
  let element: Element;

  //helper
  const stopEvent = () => {
    carousel.current!.style.transitionDuration = '500ms';
    if (mouseLeaveX > 0) {
      if (index === 0) {
        carousel.current!.style.transform = `translateX(${0}%)`;
      } else {
        setIndex(index - 1);
      }
    } else if (mouseLeaveX < 0) {
      if (index === images.length - 1) {
        carousel.current!.style.transform = `translateX(${-index * 100}%)`;
      } else {
        setIndex(index + 1);
      }
    }

    mouseLeaveX = 0;
    down = false;
    startPositionX = 0;
  };

  const movingEvent = (positionX: number) => {
    const transformX = index * 100;
    mouseLeaveX = positionX - startPositionX;
    const computedValue = (mouseLeaveX / carousel.current!.clientWidth) * 100;
    carousel.current!.style.transitionDuration = '0ms';
    carousel.current!.style.transform = `translateX(${-transformX + computedValue}%)`;
  };

  const dragging = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as Element;
    if (target.classList.contains('navigator')) return;

    down = true;
    startPositionX = e.clientX;
  };

  //desktop
  const stopDragging = (e: MouseEvent) => {
    e.preventDefault();
    stopEvent();
  };

  const moving = (e: MouseEvent) => {
    e.preventDefault();
    if (!down) return;
    movingEvent(e.clientX);
  };

  //mobile
  const touching = (e: TouchEvent) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains('navigator')) {
      target.click();
      return;
    }
    down = true;
    startPositionX = e.changedTouches[0].clientX;
    element = document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)!;
  };

  const touchMoving = (e: TouchEvent) => {
    e.preventDefault();
    if (!down) return;
    movingEvent(e.changedTouches[0].clientX);
    if (element !== document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY)) {
      endTouching(e);
      return;
    }
  };

  const endTouching = (e: TouchEvent) => {
    e.preventDefault();
    stopEvent();
  };

  useEffect(() => {
    if (!carousel.current || !carouselContainer.current) return;
    setWidth(carousel.current.clientWidth);

    const onResizeChange = () => {
      setWidth(carousel.current!.clientWidth);
    };

    addEventListener('resize', onResizeChange);
    carouselContainer.current.addEventListener('mousedown', dragging);
    carouselContainer.current.addEventListener('mousemove', moving, false);
    carouselContainer.current.addEventListener('mouseleave', stopDragging);
    carouselContainer.current.addEventListener('mouseout', stopDragging);
    carouselContainer.current.addEventListener('mouseup', stopDragging);
    carouselContainer.current.addEventListener('touchmove', touchMoving);
    carouselContainer.current.addEventListener('touchstart', touching);
    carouselContainer.current.addEventListener('touchend', endTouching);

    return () => {
      removeEventListener('resize', onResizeChange);
      carouselContainer.current?.removeEventListener('mousedown', dragging);
      carouselContainer.current?.removeEventListener('mousemove', moving);
      carouselContainer.current?.removeEventListener('mouseleave', stopDragging);
      carouselContainer.current?.removeEventListener('mouseout', stopDragging);
      carouselContainer.current?.removeEventListener('mouseup', stopDragging);
      carouselContainer.current?.removeEventListener('touchmove', touchMoving);
      carouselContainer.current?.removeEventListener('touchstart', touching);
      carouselContainer.current?.removeEventListener('touchend', endTouching);
    };
  }, [carousel, index, images, carouselContainer]);

  useEffect(() => {
    const images = [product.img1];
    product.img2 && images.push(product.img2);
    images.push(product.img1);
    product.img2 && images.push(product.img2);

    product.img3 && images.push(product.img3);
    product.img4 && images.push(product.img4);

    setImages(images);
  }, [product]);

  return (
    <div className="product-images" ref={carouselContainer}>
      <div className="image-carousel" ref={carousel} style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.length === 1 ? (
          <LazyLoad src={images[0]} />
        ) : (
          <>
            {images.map((key, i) => {
              return (
                <div className="image-container" key={i}>
                  <img src={key} style={{ width: width }} />
                  <div className="overlay"></div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="images-navigator">
        {images.map((_, i) => {
          return <div className={`navigator ${i === index && 'active'}`} key={i} onClick={() => setIndex(i)}></div>;
        })}
      </div>
    </div>
  );
};
