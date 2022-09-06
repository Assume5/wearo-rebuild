import React from 'react';

interface Props {
  children: JSX.Element;
  rootClass?: string;
}
export const Page: React.FC<Props> = ({ children, rootClass }) => {
  return <div className={`page ${rootClass}`}>{children}</div>;
};
