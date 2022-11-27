import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetails } from '../../components/OrderDetails/OrderDetails';
import { Page } from '../../components/Page/Page';
import { IOrder } from '../../types/order';
import { serverUrl, timeout } from '../../utils/constants';
import { OrderLoading } from './OrderLoading';

export const Order = () => {
  const { id } = useParams();
  const [data, setData] = useState<IOrder | null>(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${serverUrl}/order/${id}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });

        const result: IOrder = await res.json();
        const total = result.order_details.reduce((prev, curr) => prev + curr.quanitity * curr.product_price, 0);

        setTimeout(() => {
          setTotal(+total.toFixed(2));
          setData(result);
        }, timeout);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  if (!data) return <OrderLoading />;

  return (
    <Page rootClass="order-page">
      <OrderDetails data={data} total={total} />
    </Page>
  );
};
