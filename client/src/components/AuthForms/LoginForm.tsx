import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { serverUrl } from '../../utils/constants';

interface Props {
  setAuthState: (state: string) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin?: boolean;
}

export const LoginForm = ({ setAuthState, setShowModal, isAdmin }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const target = e.target as HTMLFormElement & {
      email: { value: string };
      password: { value: string };
    };

    const { email, password } = target;
    const guestCookie = Cookies.get('guest_cookie');

    const res = await fetch(`${serverUrl}/account/login${isAdmin ? '/admin' : ''}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        guestCookie: guestCookie,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      setErrorMessage(response);
    } else {
      setShowModal(false);
      if (!isAdmin) Cookies.remove('guest_cookie');
      const cookieConfig = isAdmin ? { secure: true } : { expires: 7, secure: true };
      Cookies.set(`access_token${isAdmin ? '_admin' : ''}`, response.accessToken, cookieConfig);
      Cookies.set(`refresh_token${isAdmin ? '_admin' : ''}`, response.refreshToken, cookieConfig);
      if (isAdmin) {
        navigate('/admin/dashboard');
        return;
      }
      userCtx.setUser({ isLogin: true, checked: true, firstName: response.name });
    }

    setLoading(false);
  };

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={onFormSubmit}>
        <div className="input email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Your Email" required />
        </div>
        <div className="input password">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter Your Password" required />
          <span onClick={() => setShowPassword(!showPassword)}>{showPassword === true ? 'HIDE' : 'SHOW'}</span>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="sign-in-button" disabled={loading}>
          Sign In {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
      {!isAdmin ? <button onClick={() => setAuthState('signup')}>Sign Up</button> : <></>}
    </>
  );
};
