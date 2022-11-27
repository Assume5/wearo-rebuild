import { faCircleInfo, faCheck, faTruck, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IOrder } from '../../types/order';
import { CartItems } from '../Cart/CartItems';

interface Props {
  data: IOrder;
  total: number;
}

export const OrderDetails = ({ data, total }: Props) => {
  return (
    <div className="order-page-container">
      <h4 className="order-number">Order Number: {data.id}</h4>
      <hr />
      <h4 className="order-date">
        Order date: {data.order_date.split('T')[0].replaceAll('-', '/')}, {data.order_date.split('T')[1].split('.')[0]}
      </h4>
      <hr />
      <div className={`order-status status-${data.order_status}`}>
        <div className="status status-1">
          <p>
            <FontAwesomeIcon icon={faCircleInfo} /> Pending
          </p>
        </div>
        <div className="progress" style={{ width: `${((+data.order_status - 1) / 3) * 100}%` }}></div>
        <div className="status status-2">
          <p>
            <FontAwesomeIcon icon={faCheck} /> Confirm
          </p>
        </div>
        <div className="status status-3">
          <p>
            <FontAwesomeIcon icon={faTruck} /> Shipped
          </p>
        </div>
        <div className="status status-4">
          <p>
            <FontAwesomeIcon icon={faHome} /> Delivered
          </p>
        </div>
      </div>
      <hr />
      <div className="shipping-information">
        <h4>Contact Information: </h4>
        <p>{data.email}</p>
        <p>
          {data.shipping_first_name} {data.shipping_last_name}
        </p>
        <p>{data.phone}</p>
        <h4>Shipping Address:</h4>
        <p>
          {data.shipping_address1} {data.shipping_address2}
        </p>
        <p>
          {data.shipping_city}, {data.shipping_state}, {data.shipping_zip}
        </p>
      </div>
      <hr />
      <div className="order-summary">
        <CartItems cart={data.order_details} showTrashBtn={false} showQuantitySelect={false} />
      </div>
      <div className="order-price-summary">
        <div className="cart-size-bar cart-items-total">
          <p>
            Value: <strong>{total}</strong>
          </p>
          <p>
            Shipping: <strong>{total > 60 ? 'Free' : '15.00'}</strong>
          </p>
          {data.apply_coupon && data.discount && (
            <p>
              Discount: <strong>{data.discount * 100}</strong>
            </p>
          )}
          <hr />
          <p>
            Total: <strong>{data.total_pirce}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
