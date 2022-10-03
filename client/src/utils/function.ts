import { ISearchParams } from '../types/product';

export const helper = () => {};

export const trimSpace = (text: string) => {
  return text.replaceAll(' ', '-');
};

export const trimDash = (text: string) => {
  return text.replaceAll('-', ' ');
};

export const setParams = (searchParams: ISearchParams) => {
  const url = new URL(window.location.href);
  const search = Object.keys(searchParams)
    .map((key) => {
      const param = searchParams[key as keyof typeof searchParams];
      return `${key}=${param}`;
    })
    .join('&');
  url.search = search;
  window.history.pushState({}, '', url.toString());
};
