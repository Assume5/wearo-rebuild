import React, { useContext } from 'react';
import { Page } from '../../components/Page/Page';
import { Products } from '../../components/Products/Products';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ProductContainerLoading } from '../Products/ProductContainerLoading';
import { ProductsLoadingPage } from '../Products/ProductsLoadingPage';

export const Favorites = () => {
  const favoritesCtx = useContext(FavoritesContext);

  if (!favoritesCtx || !favoritesCtx.favorites) return <ProductsLoadingPage isFavorites={true} />;

  return (
    <Page rootClass="product favorites-page">
      <>
        <h1 className="h1">Favorites</h1>

        {!favoritesCtx ? (
          <>
            <ProductContainerLoading />
          </>
        ) : (
          <Products products={favoritesCtx.favorites} />
        )}
      </>
    </Page>
  );
};
