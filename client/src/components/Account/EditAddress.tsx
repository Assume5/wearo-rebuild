import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { IAccount } from '../../types/account';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../../utils/function';

interface Props {
  data: IAccount;
  setData: React.Dispatch<React.SetStateAction<IAccount | null>>;
  setEditAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditAddress = ({ data, setData, setEditAddress }: Props) => {
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const [error, setError] = useState('');

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const stateInput = document.querySelector('.edit-address input[name="state"]');
    const zipInput = document.querySelector('.edit-address input[name="zipcode"]');
    stateInput?.classList.remove('error');
    zipInput?.classList.remove('error');
    let pass = true;

    const target = e.target as HTMLFormElement & {
      fName: { value: string };
      lName: { value: string };
      address1: { value: string };
      address2: { value: string };
      city: { value: string };
      state: { value: string };
      zipcode: { value: string };
    };

    const { fName, lName, address1, address2, city, state, zipcode } = target;

    if (state.value.length !== 2) {
      stateInput?.classList.add('error');

      pass = false;
    }

    if (zipcode.value.length !== 5) {
      zipInput?.classList.add('error');

      pass = false;
    }

    if (!pass) {
      setLoading(false);
      return;
    }

    const res = await fetch(`${serverUrl}/account/edit/address`, {
      method: 'PUT',
      headers: headerOptionForToken(),
      body: JSON.stringify({
        fName: fName.value,
        lName: lName.value,
        address1: address1.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        zipcode: zipcode.value,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      console.error(`Error on Updating Address Information: ${response}`);
      setError('Unable to update, please try again later!');
      setLoading(false);
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
      setTimeout(() => {
        const temp: IAccount = {
          ...data,
          shipping_first_name: fName.value,
          shipping_last_name: lName.value,
          address1: address1.value,
          address2: address2.value,
          city: city.value,
          state: state.value,
          zip: zipcode.value,
        };
        setData(temp);
        setEditAddress(false);
        setLoading(false);
      }, timeout);
    }
  };

  return (
    <div className="edit-form edit-address">
      <form onSubmit={onFormSubmit}>
        <div className="input fName">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            defaultValue={data.shipping_first_name}
            placeholder="Shipping First Name"
            required
          />
        </div>
        <div className="input lName">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            defaultValue={data.shipping_last_name}
            placeholder="Shipping Last Name"
            required
          />
        </div>
        <div className="input address">
          <label htmlFor="address1">Address 1</label>
          <input type="text" name="address1" defaultValue={data.address1} placeholder="Shipping Address 1" required />
          <label htmlFor="address2">Address 2 (Optional)</label>
          <input type="text" name="address2" defaultValue={data.address2} placeholder="Shipping Address 2" />
          <label htmlFor="city">City</label>
          <input type="text" name="city" defaultValue={data.city} placeholder="Shipping City" required />
          <label htmlFor="state">State</label>
          <input type="text" name="state" defaultValue={data.state} placeholder="Shipping State (XX)" required />
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" name="zipcode" defaultValue={data.zip} placeholder="Shipping Zip Code" required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button disabled={loading}>
          Update {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
