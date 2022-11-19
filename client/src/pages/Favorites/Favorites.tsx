import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { Products } from '../../components/Products/Products';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ProductContainerLoading } from '../Products/ProductContainerLoading';
import { ProductsLoadingPage } from '../Products/ProductsLoadingPage';

export const Favorites = () => {
  const favoritesCtx = useContext(FavoritesContext);
  const navigate = useNavigate();

  if (!favoritesCtx || !favoritesCtx.favorites) return <ProductsLoadingPage isFavorites={true} />;

  return (
    <Page rootClass="product favorites-page">
      <>
        <h1 className="h1">Favorites</h1>
        {favoritesCtx.favorites.length ? (
          <Products products={favoritesCtx.favorites} />
        ) : (
          <div className="empty-cart">
            <p>There are no Favorite Item</p>
            <p>Click the heart on the product card to add items to your favorite</p>
          </div>
        )}
      </>
    </Page>
  );
};
