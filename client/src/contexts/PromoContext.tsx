import React, { createContext, useContext, useState } from 'react';
import { PromoContextType } from '../types/context';

interface Props {
  children: JSX.Element;
}

const contextState = {
  promo: { apply: false, discount: 1 },
  setPromo: () => {},
};

export const PromoContext = createContext<PromoContextType>(contextState);

export const PromoContextProvider: React.FC<Props> = ({ children }) => {
  const [promo, setPromo] = useState({ apply: false, discount: 1 });
  return <PromoContext.Provider value={{ promo, setPromo }}>{children}</PromoContext.Provider>;
};
