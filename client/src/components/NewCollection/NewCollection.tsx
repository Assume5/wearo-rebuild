import React from 'react';
import { INew } from '../../types/page-option';
import { trimSpace } from '../../utils/function';
import { FullHeightHero } from '../Hero/FullHeightHero';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';

interface Props {
  newCollection: INew[] | undefined;
}

export const NewCollection = ({ newCollection }: Props) => {
  if (!newCollection) {
    return (
      <>
        {new Array(3).fill(undefined).map((item, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonLoading rootClassName="full-height-hero" height={'100%'} />
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <>
      {newCollection.map((parent) => {
        const pageScreen = parent.category[0].page_screen[0];
        if (!pageScreen) return null;
        return (
          <FullHeightHero
            bgImg={pageScreen.background_image}
            overlay={true}
            text={pageScreen.text}
            key={parent.text}
            textLink={`/products/${parent.text}/${trimSpace(parent.category[0].category)}`}
          />
        );
      })}
    </>
  );
};
