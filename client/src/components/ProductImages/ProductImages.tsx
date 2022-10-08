import React, { useEffect, useRef, useState } from 'react';
import { IProductDetails } from '../../types/product';
import { ImagesCarousel } from '../ImagesCrouasel/ImagesCarousel';
import { LazyLoad } from '../LazyLoad/LazyLoad';
import { ImagesModal } from './ImagesModal';

interface Props {
  product: IProductDetails;
}

export const ProductImages = ({ product }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const imageClickEvent = (index: number) => {
    setIndex(index);
    setShowModal(true);
  };

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
    <>
      <ImagesCarousel images={images} imageClickEvent={imageClickEvent} expandIcon={true} />
      <ImagesModal images={images} indexSelected={index} show={showModal} setShowModal={setShowModal} />
    </>
  );
};
