import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { IAccount } from '../../types/account';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../../utils/function';

interface Props {
  setEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPassword = ({ setEditPassword }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordPass, setPasswordPass] = useState(true);
  const [error, setError] = useState('');
  const userCtx = useContext(UserContext);

  const regexCap = /[A-Z]/;
  const regexLow = /[a-z]/;
  const regexNum = /[0-9]/;

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll('.password input')) as HTMLInputElement[];
    if (!inputs) return;
    if (showPassword) {
      inputs.forEach((input) => (input.type = 'text'));
    } else {
      inputs.forEach((input) => (input.type = 'password'));
    }
  }, [showPassword]);

  const onPasswordChange = (val: string) => {
    document.querySelector('.edit-password .new-password input')?.classList.remove('error');
    document.querySelector('.edit-password .confirm-new-password input')?.classList.remove('error');

    const validContainer = document.querySelector('.password .valid');

    const lowerCheck = validContainer?.querySelector('.one-lower .check') as HTMLElement;
    const lowerFail = validContainer?.querySelector('.one-lower .fail') as HTMLElement;

    const upperCheck = validContainer?.querySelector('.one-upper .check') as HTMLElement;
    const upperFail = validContainer?.querySelector('.one-upper .fail') as HTMLElement;

    const numberCheck = validContainer?.querySelector('.one-number .check') as HTMLElement;
    const numberFail = validContainer?.querySelector('.one-number .fail') as HTMLElement;

    const eightCheck = validContainer?.querySelector('.eight-characters .check') as HTMLElement;
    const eightFail = validContainer?.querySelector('.eight-characters .fail') as HTMLElement;

    if (regexLow.test(val)) {
      lowerCheck.style.display = 'inline-block';
      lowerFail.style.display = 'none';
    } else {
      setPasswordPass(false);
      lowerCheck.style.display = 'none';
      lowerFail.style.display = 'inline-block';
    }

    if (regexCap.test(val)) {
      upperCheck.style.display = 'inline-block';
      upperFail.style.display = 'none';
    } else {
      setPasswordPass(false);
      upperCheck.style.display = 'none';
      upperFail.style.display = 'inline-block';
    }

    if (regexNum.test(val)) {
      numberCheck.style.display = 'inline-block';
      numberFail.style.display = 'none';
    } else {
      setPasswordPass(false);
      numberCheck.style.display = 'none';
      numberFail.style.display = 'inline-block';
    }

    if (val.length >= 8) {
      eightCheck.style.display = 'inline-block';
      eightFail.style.display = 'none';
    } else {
      setPasswordPass(false);
      eightCheck.style.display = 'none';
      eightFail.style.display = 'inline-block';
    }

    if (regexNum.test(val) && val.length >= 8 && regexLow.test(val) && regexCap.test(val)) setPasswordPass(true);
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const newPassword = document.querySelector('.edit-password .new-password input') as HTMLInputElement;
    const confirmNewPassword = document.querySelector('.edit-password .confirm-new-password input') as HTMLInputElement;

    if (!passwordPass) {
      newPassword?.classList.add('error');
      setLoading(false);
      return;
    }

    const target = e.target as HTMLFormElement & {
      password: { value: string };
      'new-pw': { value: string };
      'confirm-new-pw': { value: string };
    };

    const { password: currentPassword, 'new-pw': password, 'confirm-new-pw': confirmPassword } = target;

    if (password.value !== confirmPassword.value) {
      newPassword.classList.add('error');
      confirmNewPassword.classList.add('error');
      setLoading(false);
      return;
    }

    const res = await fetch(`${serverUrl}/account/edit/password`, {
      method: 'PUT',
      headers: headerOptionForToken(),
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: password.value,
        confirmNewPassword: confirmPassword.value,
      }),
    });

    const response = await res.json();

    if (!res.ok && res.status === 500) {
      console.error(`Error on Updating Password: ${response}`);
      setLoading(false);
      setError('Unable to update, please try again later!');
      return;
    }

    if (!res.ok && res.status === 401) {
      setError('Incorrect Password');
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
      if (response.error) {
        setError(response.error);
      } else {
        setTimeout(() => {
          setEditPassword(false);
          setLoading(false);
        }, timeout);
      }
    }
  };

  return (
    <div className="edit-form edit-password">
      <form onSubmit={onFormSubmit}>
        <div className="input password">
          <label htmlFor="current-pw">Current Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="input new-password password">
          <label htmlFor="new-pw">New Password</label>
          <input type="password" name="new-pw" onChange={(e) => onPasswordChange(e.target.value)} required />
          <span onClick={() => setShowPassword(!showPassword)}>{showPassword === true ? 'HIDE' : 'SHOW'}</span>
          <div className={`valid active`}>
            <p className="eight-characters">
              8 Characters
              <FontAwesomeIcon icon={faCheck} className="check" />
              <FontAwesomeIcon icon={faTimes} className="fail" />
            </p>
            <p className="one-upper">
              1 Uppercase
              <FontAwesomeIcon icon={faCheck} className="check" />
              <FontAwesomeIcon icon={faTimes} className="fail" />
            </p>
            <p className="one-number">
              1 Number
              <FontAwesomeIcon icon={faCheck} className="check" />
              <FontAwesomeIcon icon={faTimes} className="fail" />
            </p>
            <p className="one-lower">
              1 Lowercase
              <FontAwesomeIcon icon={faCheck} className="check" />
              <FontAwesomeIcon icon={faTimes} className="fail" />
            </p>
          </div>
        </div>
        <div className="input confirm-new-password password">
          <label htmlFor="phone">Confirm New Password</label>
          <input type="password" name="confirm-new-pw" required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button disabled={loading}>
          Update {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
