import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { PromoContext } from '../../contexts/PromoContext';
import { UserContext } from '../../contexts/UserContext';
import { IAccount } from '../../types/account';
import { IAddress, IPayment, IStep } from '../../types/checkout';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie } from '../../utils/function';
import { SkeletonLoading } from '../Skeleton/SkeletonLoading';
import { BillingForm } from './BillingForm';
import { Overview } from './Overview';
import { PaymentForm } from './PaymentForm';
import { ShippingForm } from './ShippingForm';

interface Props {
  data: IAccount | null;
}

export const CheckoutForms = ({ data }: Props) => {
  const navigate = useNavigate();
  const promoCtx = useContext(PromoContext);
  const cartCtx = useContext(CartContext);
  const [shipping, setShipping] = useState<IAddress | null>(null);
  const [billing, setBilling] = useState<IAddress | null>(null);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState<IStep>({
    currentStep: 1,
    stepProceed: 1,
    stepOne: {
      editing: true,
    },
    stepTwo: {
      editing: false,
    },
    stepThree: {
      editing: false,
    },
  });

  useEffect(() => {
    if (data && data.shipping_first_name && data.shipping_last_name) {
      setShipping({
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        first: data.shipping_first_name,
        last: data.shipping_last_name,
        state: data.state,
        zip: data.zip,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!cartCtx || !cartCtx.cart || !promoCtx || !promoCtx.promo) return;
    let total = cartCtx.cart.reduce((prev, curr) => prev + +(curr.product_price * curr.quanitity).toFixed(2), 0);
    const freeShipping = total > 60;
    if (promoCtx.promo.apply) {
      total = +((1 - promoCtx.promo.discount) * total).toFixed(2);
    }

    if (!freeShipping) {
      total += 15;
    }

    setTotal(+total.toFixed(2));
  }, [promoCtx, cartCtx]);

  const onFinalSubmission = async () => {
    const cart = cartCtx.cart!;
    let role = '';
    const guestId = Cookies.get('guest_cookie');
    if (!guestId) {
      role = 'customer';
    } else {
      role = 'guest';
    }

    const coupon = promoCtx.promo;

    const productDetails = cart.map((item) => ({
      product_id: item.product_id,
      selected_size: item.selected_size,
      quanitity: item.quanitity,
      product_image: item.product_image,
      product_name: item.product_name,
      product_price: item.product_price,
    }));
    const body = {
      email: shipping?.email,
      cardFirst: payment?.first,
      cardLast: payment?.last,
      phone: shipping?.phone,
      card: payment?.card,
      shippingFirst: shipping?.first,
      shippingLast: shipping?.last,
      shippingAdd1: shipping?.address1,
      shippingAdd2: shipping?.address2,
      shippingCity: shipping?.city,
      shippingZip: shipping?.zip,
      shippingState: shipping?.state,
      billingFirst: billing?.first,
      billingLast: billing?.last,
      billingAdd1: billing?.address1,
      billingAdd2: billing?.address2,
      billingCity: billing?.city,
      billingState: billing?.state,
      billingZip: billing?.zip,
      total: total.toFixed(2),
      productDetails,
      role,
      guestId,
      apply_coupon: coupon.apply,
      discount: coupon.discount,
    };

    try {
      const res = await fetch(`${serverUrl}/checkout`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      setTimeout(() => {
        cartCtx.setCart([]);
        navigate(`/order/${result.orderID}`);
      }, timeout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="checkout-form-container">
      <ShippingForm address={shipping} setAddress={setShipping} step={step} setStep={setStep} />
      <BillingForm address={billing} setAddress={setBilling} step={step} setStep={setStep} shipping={shipping} />
      <PaymentForm payment={payment} setPayment={setPayment} step={step} setStep={setStep} data={data} />
      <Overview step={step} cb={onFinalSubmission} error={error} setError={setError} />
    </div>
  );
};
