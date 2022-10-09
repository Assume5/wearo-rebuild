import React from 'react';

interface Props {
  rootClassName?: string;
  children: JSX.Element;
}

export const Modal = ({ rootClassName, children }: Props) => {
  return (
    <div className={`modal ${rootClassName}`}>
      <div className="modal-inner">{children}</div>
    </div>
  );
};
