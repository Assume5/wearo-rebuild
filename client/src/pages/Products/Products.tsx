import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { Products } from '../../components/Products/Products';
import { IProduct } from '../../types/product';
import { serverUrl } from '../../utils/constants';

export const ProductsPage = () => {
  const { department, category } = useParams();
  const [products, setProducts] = useState<IProduct[]>();
  console.log(department, category);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${serverUrl}/product/${department}/${category}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.error('Error fetching product:', data);
      }

      console.log(data);

      setProducts(data ? data : []);
    };

    fetchProducts();
  }, [department, category]);

  if (!department || !category || !products) return null;

  return (
    <Page rootClass="product">
      <>
        <Products products={products} />
      </>
    </Page>
  );
};
