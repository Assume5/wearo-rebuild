import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FullHeightHero } from '../../components/Hero/FullHeightHero';
import { Page } from '../../components/Page/Page';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { IOverview } from '../../types/page-option';
import { serverUrl, timeout } from '../../utils/constants';
import { trimSpace } from '../../utils/function';

export const ProductsOverview = () => {
  const { department } = useParams();
  const [data, setData] = useState<IOverview[]>();

  useEffect(() => {
    setData(undefined);
    const fetchOverview = async () => {
      const res = await fetch(`${serverUrl}/page-option/overview/${department}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(`Error Fetching Overview ${department} Data: ${data.error}`);
      }

      setTimeout(() => {
        setData(data ? data : []);
      }, timeout);
    };

    fetchOverview();
  }, [department]);

  if (!department || !data)
    return (
      <Page>
        <>
          <SkeletonLoading rootClassName="full-height-hero" height={'100%'} count={3} />
        </>
      </Page>
    );

  return (
    <Page>
      <>
        {data.map((item) => {
          const pageScreen = item.page_screen[0];
          if (!pageScreen) return null;
          return (
            <FullHeightHero
              key={pageScreen.id}
              bgImg={pageScreen.background_image}
              overlay={true}
              text={pageScreen.text}
              textLink={`/products/${department}/${trimSpace(item.category)}`}
            />
          );
        })}
      </>
    </Page>
  );
};
