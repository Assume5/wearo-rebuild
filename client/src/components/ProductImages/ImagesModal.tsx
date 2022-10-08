import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ImagesCarousel } from '../ImagesCrouasel/ImagesCarousel';
interface Props {
  images: string[];
  indexSelected: number;
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ImagesModal = ({ images, indexSelected, show, setShowModal }: Props) => {
  const [index, setIndex] = useState(indexSelected);

  return (
    <div className={`images-modal ${show && 'show'}`}>
      <ImagesCarousel images={images} />
      <FontAwesomeIcon
        icon={faTimes}
        className="close-button"
        onClick={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};
