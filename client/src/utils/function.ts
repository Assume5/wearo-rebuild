import { ISearchParams } from '../types/product';
import { v4 as uuidv4 } from 'uuid';
import { serverUrl } from './constants';
import Cookies from 'js-cookie';

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

export const generateGuestCookie = async () => {
  const cookie = uuidv4();
  const res = await fetch(`${serverUrl}/account/login/guest`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ cookie: cookie }),
  });

  const response = await res.json();

  if (!res.ok) console.error(response);
  else Cookies.set('guest_cookie', cookie, { expires: 7, path: '', secure: true });
};
