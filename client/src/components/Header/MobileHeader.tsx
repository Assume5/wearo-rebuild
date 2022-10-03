import React, { useEffect, useRef } from 'react';
import { IHeader } from '../../types';
import { HeaderLinks } from './HeaderLinks';

interface Props {
  data: IHeader[] | undefined;
}

export const MobileHeader = ({ data }: Props) => {
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (navRef.current) {
      const links = navRef.current.querySelectorAll('.links-container');
      links.forEach((link) => {
        link.addEventListener('click', () => {
          link.classList.toggle('active');
          const categories = link.querySelector<HTMLElement>('.categories');
          if (categories) {
            if (categories.style.maxHeight) {
              categories.style.maxHeight = '';
            } else {
              categories.style.maxHeight = categories.scrollHeight + 'px';
            }
          }
        });
      });
    }
  }, [navRef, data]);

  return (
    <div className="mobile-nav">
      <div
        className="hamburger-lines"
        onClick={(e) => {
          console.log(e.currentTarget.parentElement!.classList.toggle('active'));
        }}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <div className="mobile-menu-items" ref={navRef}>
        <HeaderLinks data={data} />
      </div>
    </div>
  );
};
