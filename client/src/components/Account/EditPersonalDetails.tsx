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
  setEditPersonal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPersonalDetails = ({ data, setData, setEditPersonal }: Props) => {
  const userCtx = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fNameInput = document.querySelector('.edit-personal .fName input');
    const lNameInput = document.querySelector('.edit-personal .lName input');
    const phoneInput = document.querySelector('.edit-personal .phone input');
    fNameInput?.classList.remove('error');
    lNameInput?.classList.remove('error');
    phoneInput?.classList.remove('error');

    let pass = true;

    const target = e.target as HTMLFormElement & {
      fName: { value: string };
      lName: { value: string };
      phone: { value: string };
    };

    const { fName, lName, phone } = target;

    const phoneCheck = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})( x\d{4})?$/;
    if (!fName.value) {
      fNameInput?.classList.add('error');
      pass = false;
    }

    if (!lName.value) {
      lNameInput?.classList.add('error');
      pass = false;
    }

    if (phone.value && !phoneCheck.test(phone.value)) {
      phoneInput?.classList.add('error');
      pass = false;
    }

    if (!pass) {
      setLoading(false);
      return;
    }

    const res = await fetch(`${serverUrl}/account/edit/personal`, {
      method: 'PUT',
      headers: headerOptionForToken(),
      body: JSON.stringify({
        fName: fName.value,
        lName: lName.value,
        phone: phone.value,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      console.error(`Error on Updating Personal Information: ${response}`);
      setError('Unable to update, please try again later!');
      setLoading(false);
      return;
    }

    if (!response.success) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      userCtx.setUser({ isLogin: false, checked: true });
      generateGuestCookie();
    } else {
      if (response.accessToken) {
        Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
      const temp: IAccount = { ...data, first_name: fName.value, last_name: lName.value, phone: phone.value };
      setTimeout(() => {
        setData(temp);
        setEditPersonal(false);
        setLoading(false);
      }, timeout);
    }
  };
  return (
    <div className="edit-form edit-personal">
      <form onSubmit={onFormSubmit}>
        <div className="input email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={data.email} disabled />
        </div>
        <div className="input fName">
          <label htmlFor="fName">First Name *</label>
          <input type="text" name="fName" defaultValue={data.first_name} required />
        </div>
        <div className="input lName">
          <label htmlFor="lName">Last Name *</label>
          <input type="text" name="lName" defaultValue={data.last_name} required />
        </div>
        <div className="input phone">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" defaultValue={data.phone} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button disabled={loading}>
          Update {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
