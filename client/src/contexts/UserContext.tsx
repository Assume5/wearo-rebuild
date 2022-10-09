import React, { createContext, useState } from 'react';
import { IUser, UserContextType } from '../types/context';

interface Props {
  children: JSX.Element;
}

const contextState = {
  user: { isLogin: false, checked: false },
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(contextState);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>({ isLogin: false, checked: false });
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
