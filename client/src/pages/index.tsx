import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import { Account } from './Account/Account';
import { Cart } from './Cart/Cart';
import { Checkout } from './Checkout/Checkout';
import { Favorites } from './Favorites/Favorites';
import { Home } from './Home/Home';
import { Order } from './Order/Order';
import { Product } from './Product/Product';
import { ProductsPage } from './Products/Products';
import { ProductsOverview } from './ProductsOverview/ProductsOverview';
import { Admin } from './Admin/Admin';
import { AdminDashboard } from './Admin/Dashboard';
import { NotFound } from './NotFound/NotFound';

export const Page = () => {
  const isAdmin = window.location.pathname.includes('admin');

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isAdmin ? <></> : <Header />}
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
        <Route path="/products/:department/" element={<ProductsOverview />} />
        <Route path="/products/:department/:category" element={<ProductsPage />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {isAdmin ? <></> : <Footer />}
    </BrowserRouter>
  );
};
