import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { IFilter, IParams, IParamsSize, IParamsType, IProduct, ISearchParams } from '../../types/product';
import { setParams } from '../../utils/function';
import { SortItem } from './SortItem';

interface Props {
  filter: IFilter | undefined;
  searchParams: IParams[];
  setSearchParams: React.Dispatch<React.SetStateAction<IParams[]>>;
  sizeParams: IParamsSize[];
  setSizeParams: React.Dispatch<React.SetStateAction<IParamsSize[]>>;
  typeParams: IParamsType[];
  setTypeParams: React.Dispatch<React.SetStateAction<IParamsType[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setFilterOnce: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sort = ({
  filter,
  searchParams,
  setSearchParams,
  setSortBy,
  sortBy,
  sizeParams,
  setSizeParams,
  setFilterOnce,
  typeParams,
  setTypeParams,
}: Props) => {
  const onChange = async (name: string, root: string, status: boolean) => {
    const searchObj = [...searchParams];
    const sizeObj = [...sizeParams];
    const typeObj = [...typeParams];
    setFilterOnce(true);
    if (root === 'sort-by') {
      const filterItems = document.querySelector('.sort-by .filter-items');
      if (!filterItems) return;
      if (name === sortBy) return;

      const labels = Array.from(filterItems.querySelectorAll('.filter-item label'));
      labels.forEach((label) => {
        const text = label.textContent;
        if (text !== name) {
          label.classList.remove('active');
        } else {
          label.classList.toggle('active');
          setSortBy(name);
        }
      });
    } else {
      const key = root;
      if (status) {
        if (key === 'size') {
          sizeObj.push({ product_size: { some: { size: { contains: name } } } });
        } else if (key === 'type') {
          typeObj.push({ type: { contains: name } });
        } else {
          searchObj.push({ [key]: { contains: name } });
        }
      } else {
        if (key === 'size') {
          const index = sizeObj.findIndex((obj) => {
            return obj.product_size.some.size.contains === name;
          });
          sizeObj.splice(index, 1);
        } else if (key === 'type') {
          const index = typeObj.findIndex((obj) => {
            return obj[key].contains === name;
          });
          typeObj.splice(index, 1);
        } else {
          const index = searchObj.findIndex((obj) => {
            if (obj[key]) {
              return obj[key].contains === name;
            }
          });
          searchObj.splice(index, 1);
        }
      }
      if (key === 'size') {
        setSizeParams(sizeObj);
      } else if (key === 'type') {
        setTypeParams(typeObj);
      } else {
        setSearchParams(searchObj);
      }
    }
  };

  if (!filter) return null;

  return (
    <div className="product-filter">
      <SortItem items={filter.sortBy} rootClass={'sort-by'} header={'Sort By'} onChange={onChange} />
      {Object.keys(filter).map((key) => {
        const filterItem = filter[key as keyof IFilter];
        if (key === 'sortBy') return null;
        return (
          <React.Fragment key={key}>
            <SortItem items={filterItem} rootClass={key} header={key} onChange={onChange} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
