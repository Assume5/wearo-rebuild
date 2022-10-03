import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import { PromoHero } from '../../components/Hero/PromoHero';
import { NewCollection } from '../../components/NewCollection/NewCollection';
import { Page } from '../../components/Page/Page';
import { IBanner, INew, IPromo } from '../../types/page-option';
import { serverUrl, timeout } from '../../utils/constants';

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

      setTimeout(() => {
        setBanner(banner ? banner[0] : {});
        setPromo(promo ? promo : []);
        setNewCollection(newCollection ? newCollection : []);
      }, timeout);
    };
    fetchData();
  }, []);
  return (
    <Page rootClass="home">
      <>
        <Banner banner={banner} />
        <PromoHero data={promo} />
        <NewCollection newCollection={newCollection} />
      </>
    </Page>
  );
};
