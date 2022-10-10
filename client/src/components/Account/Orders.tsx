import React from 'react';
import { IAccount } from '../../types/account';

interface Props {
  data: IAccount;
}

export const Orders = ({ data }: Props) => {
  return <div className="account-orders">Orders</div>;
};
