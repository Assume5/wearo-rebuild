import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import { FullHeightHero } from '../../components/Hero/FullHeightHero';
import { PromoHero } from '../../components/Hero/PromoHero';
import { Page } from '../../components/Page/Page';
import { IBanner, INew, IPromo } from '../../types/page-option';
import { serverUrl } from '../../utils/constants';
import { trimSpace } from '../../utils/function';

export const Home = () => {
  const [banner, setBanner] = useState<IBanner>();
  const [promo, setPromo] = useState<IPromo[]>();
  const [newCollection, setNewCollection] = useState<INew[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/page-option/home`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Error Fetching Home Data: ${data.error}`);
      }

      const { banner, promo, newCollection } = data;
      setBanner(banner ? banner[0] : {});
      setPromo(promo ? promo : []);
      setNewCollection(newCollection ? newCollection : []);
    };
    fetchData();
  }, []);
  return (
    <Page rootClass="home">
      <>
        {promo && banner && newCollection && (
          <>
            <Banner banner={banner} />
            <PromoHero data={promo} />
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
        )}
      </>
    </Page>
  );
};
