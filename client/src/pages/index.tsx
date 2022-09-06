import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import { Home } from './Home/Home';
import { Product } from './Product/Product';
import { ProductsPage } from './Products/Products';
import { ProductsOverview } from './ProductsOverview/ProductsOverview';

export const Page = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:department/" element={<ProductsOverview />} />
        <Route path="/products/:department/:category" element={<ProductsPage />} />
        <Route path="/product/:productID" element={<Product />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
