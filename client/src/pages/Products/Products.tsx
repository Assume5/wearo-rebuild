import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { Products } from '../../components/Products/Products';
import { SkeletonLoading } from '../../components/Skeleton/SkeletonLoading';
import { Sort } from '../../components/Sort/Sort';
import { IProduct, IFilter, ISearchParams, IParams, IParamsSize, IParamsType } from '../../types/product';
import { serverUrl, timeout } from '../../utils/constants';
import { setParams, trimDash } from '../../utils/function';
import { ProductContainerLoading } from './ProductContainerLoading';
import { ProductsLoadingPage } from './ProductsLoadingPage';

export const ProductsPage = () => {
  const { department, category } = useParams();
  const [products, setProducts] = useState<IProduct[]>();
  const [filter, setFilter] = useState<IFilter>();
  const [pageSize, setPageSize] = useState('10');
  const [sizeParams, setSizeParams] = useState<IParamsSize[]>([]);
  const [typeParams, setTypeParams] = useState<IParamsType[]>([]);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [searchParams, setSearchParams] = useState<IParams[]>([]);
  const [filterOnce, setFilterOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filterProducts = async () => {
      if (!filterOnce) return;
      setProducts(undefined);
      setIsLoading(true);
      const containers = Array.from(document.getElementsByClassName('filter-container'));
      containers.forEach((item) => {
        item.classList.remove('active');
      });
      const res = await fetch(`${serverUrl}/product/filter/${department}/${category}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ searchParams, sortBy, pageSize, sizeParams, typeParams }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(`Error fetching Data: ${result.error}`);
      }

      setTimeout(() => {
        setProducts(result ? result : []);
        setIsLoading(false);
      }, timeout);
      console.log(result);
    };

    filterProducts();
  }, [searchParams, pageSize, sortBy, sizeParams, typeParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(undefined);
      setFilter(undefined);
      setFilterOnce(false);
      setSearchParams([]);
      setPageSize('10');
      setSizeParams([]);
      setTypeParams([]);
      const res = await fetch(`${serverUrl}/product/${department}/${category}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data: IProduct[] = await res.json();

      if (!res.ok) {
        console.error('Error fetching product:', data);
        setProducts(data ? data : []);
        return;
      }

      const size: Set<string> = new Set();
      const brand: Set<string> = new Set();
      const color: Set<string> = new Set();
      const type: Set<string> = new Set();
      const material: Set<string> = new Set();

      data.forEach((item) => {
        type.add(item.type);
        item.material && material.add(item.material);
        brand.add(item.brand);
        color.add(item.color);
        item.product_size.forEach((productSize) => {
          size.add(productSize.size);
        });
      });

      setTimeout(() => {
        setFilter({
          size: Array.from(size),
          brand: Array.from(brand),
          color: Array.from(color),
          type: Array.from(type),
          material: Array.from(material),
          sortBy: ['Most Popular', 'Newest', 'Lowest Price', 'Highest Price'],
        });
        setProducts(data ? data : []);
      }, timeout);
    };

    fetchProducts();
  }, [department, category]);

  if (!department || !category || !filter) return <ProductsLoadingPage />;

  return (
    <Page rootClass="product">
      <>
        <h1 className="h1">{trimDash(category)}</h1>
        <Sort
          filter={filter}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sizeParams={sizeParams}
          setSizeParams={setSizeParams}
          typeParams={typeParams}
          setTypeParams={setTypeParams}
          setFilterOnce={setFilterOnce}
        />
        {!products ? (
          <>
            <ProductContainerLoading />
          </>
        ) : (
          <Products products={products} />
        )}

        {isLoading && <div className="overlay"></div>}
      </>
    </Page>
  );
};
