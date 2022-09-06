import { faCircleUser, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IHeader } from '../../types';
import { serverUrl } from '../../utils/constants';
import { trimDash, trimSpace } from '../../utils/function';

export const Header = () => {
  const [data, setData] = useState<IHeader[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await fetch(`${serverUrl}/header`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Error Fetching Header Data: ${data.error}`);
      }

      setData(data.data);
    };
    fetchHeader();
  }, []);
  return (
    <div className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/logo.png" />
      </div>
      <div className="content">
        <div className="user">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>Login</span>
        </div>
        <div className="favorites">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="cart has-item">
          <FontAwesomeIcon icon={faShoppingCart} />
          <div className="dot"></div>
        </div>
      </div>
      {data && (
        <div className="links">
          {data.map((item) => {
            return (
              <div className="links-container" key={item.text}>
                <h4>{item.text}</h4>
                <div className="categories">
                  <div className="view-all">
                    <button
                      onClick={() => {
                        navigate(`/products/${item.text}`);
                      }}
                    >
                      View All
                    </button>
                  </div>
                  <div className="categories-container">
                    {item.category.map((category) => {
                      return (
                        <div key={category.category}>
                          <p
                            className="animate-bottom"
                            onClick={() => navigate(`products/${item.text}/${trimSpace(category.category)}`)}
                          >
                            {trimDash(category.category)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
