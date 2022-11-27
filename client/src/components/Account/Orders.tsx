import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IAccount } from '../../types/account';

interface Props {
  data: IAccount;
}

export const Orders = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="account-orders">
      {data.orders.length ? (
        <div className="orders-container">
          {data.orders.map((item) => {
            return (
              <div key={item.id} className="order" onClick={() => navigate(`/order/${item.id}`)}>
                <p className="order-id">{item.id}</p>
                <p className="order-date">{item.order_date.split('T')[0].replaceAll('-', '/')}</p>
                <p className="order-price">{item.total_pirce.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          No Orders Found. <Link to="/">Shop our Products</Link>
        </div>
      )}
    </div>
  );
};
