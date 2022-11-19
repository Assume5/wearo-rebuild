import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IHeader } from '../../types';
import { trimDash, trimSpace } from '../../utils/function';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';

interface Props {
  data: IHeader[] | undefined;
  className?: string;
}

export const HeaderLinks: React.FC<Props> = ({ data, className }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="links header-link-loading">
        <SkeletonLoading count={5} inline={true} />
      </div>
    );
  }

  return (
    <div className={`links ${className}`}>
      {data.map((item) => {
        return (
          <div className="links-container" key={item.text}>
            <h4>{item.text}</h4>
            <div className="categories">
              <div className="view-all">
                <button
                  onClick={() => {
                    navigate(`/products/${item.text}`);
                    const mobileNav = document.querySelector('.mobile-nav');
                    if (mobileNav) {
                      mobileNav.classList.toggle('active');
                    }
                  }}
                >
                  View All
                </button>
              </div>
              <div className="categories-container">
                {item.category.map((category) => {
                  return (
                    <div key={category.category}>
                      <a
                        className="animate-bottom"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`products/${item.text}/${trimSpace(category.category)}`);
                          const mobileNav = document.querySelector('.mobile-nav');
                          if (mobileNav) {
                            mobileNav.classList.toggle('active');
                          }
                        }}
                      >
                        {trimDash(category.category)}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
