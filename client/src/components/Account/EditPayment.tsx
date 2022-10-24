import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { IAccount, IPayment } from '../../types/account';
import { serverUrl, timeout } from '../../utils/constants';
import { headerOptionForToken, generateGuestCookie } from '../../utils/function';

interface Props {
  data: IAccount;
  setData: React.Dispatch<React.SetStateAction<IAccount | null>>;
  setEditPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPayment = ({ data, setData, setEditPayment }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userCtx = useContext(UserContext);

  const onDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 2) {
      e.target.value += '/';
    }
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cc = document.querySelector('.edit-payment input[name="card"]');
    const expDate = document.querySelector('.edit-payment input[name="date"]');

    cc?.classList.remove('error');
    expDate?.classList.remove('error');

    const target = e.target as HTMLFormElement & {
      fName: { value: string };
      lName: { value: string };
      address1: { value: string };
      address2: { value: string };
      city: { value: string };
      state: { value: string };
      zipcode: { value: string };
      card: { value: string };
      date: { value: string };
    };

    const { fName, lName, address1, address2, city, state, zipcode, card, date } = target;

    if (card.value.length !== 16) {
      setLoading(false);
      cc?.classList.add('error');
      return;
    }

    if (date.value.length !== 5) {
      setLoading(false);
      expDate?.classList.add('error');
      return;
    }

    const body = {
      fName: fName.value,
      lName: lName.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      state: state.value,
      zip: zipcode.value,
      card: card.value,
      date: date.value,
    };

    const res = await fetch(`${serverUrl}/account/edit/payment`, {
      method: 'PUT',
      headers: headerOptionForToken(),
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if (!res.ok && res.status === 500) {
      console.error(`Error on Updating Payment: ${response}`);
      setLoading(false);
      setError('Unable to update, please try again later!');
      return;
    }

    if (!res.ok && res.status === 409) {
      console.error(`Error on Updating Payment: ${response}`);
      setLoading(false);
      setError('Card Conflict');
      return;
    }

    if (!response.success) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      await generateGuestCookie();
      userCtx.setUser({ isLogin: false, checked: true });
    } else {
      if (response.accessToken) {
        Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
      const tempPayment: IPayment[] = [...data.payment];
      tempPayment.push({
        billing_address1: body.address1,
        card_exp_date: body.date,
        card_first_name: body.fName,
        card_last_name: body.lName,
        card_number: body.card,
        city: body.city,
        id: response.id,
        state: body.state,
        zip: body.zip,
        billing_address2: body.address2,
      });

      setData({ ...data, payment: tempPayment });
      setTimeout(() => {
        setEditPayment(false);
        setLoading(false);
      }, timeout);
    }
  };

  return (
    <div className="edit-form edit-payment">
      <form onSubmit={onFormSubmit}>
        <div className="input fName">
          <label htmlFor="fName">Card Holder First Name</label>
          <input type="text" name="fName" placeholder="Card Holder First Name" required />
        </div>
        <div className="input lName">
          <label htmlFor="lName">Card Holder Last Name</label>
          <input type="text" name="lName" placeholder="Card Holder Last Name" required />
        </div>
        <div className="input address">
          <label htmlFor="address1">Billing Address 1</label>
          <input type="text" name="address1" placeholder="Billing Address 1" required />
          <label htmlFor="address2">Billing Address 2 (Optional)</label>
          <input type="text" name="address2" placeholder="Billing Address 2" />
          <label htmlFor="city">City</label>
          <input type="text" name="city" placeholder="Billing City" required />
          <label htmlFor="state">State</label>
          <input type="text" name="state" placeholder="Billing State" required />
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" name="zipcode" placeholder="Billing Zip" required />
        </div>
        <div className="input card-information">
          <label htmlFor="card">Card Number</label>
          <input type="text" maxLength={16} name="card" placeholder="Card Number" required />
          <label htmlFor="date">Expire Date</label>
          <input
            type="text"
            maxLength={5}
            name="date"
            onChange={(e) => onDateInputChange(e)}
            placeholder="XX/XX"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button disabled={loading}>
          Add New {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
