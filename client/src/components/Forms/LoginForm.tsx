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
}

export const LoginForm = ({ setAuthState, setShowModal }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const input = document.querySelector('.password input') as HTMLInputElement;
    if (!input) return;
    if (showPassword) {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }, [showPassword]);

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

    const res = await fetch(`${serverUrl}/account/login`, {
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
      Cookies.remove('guest_cookie');
      Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      Cookies.set('refresh_token', response.refreshToken, { expires: 7, secure: true });
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
          <input type="password" name="password" placeholder="Enter Your Password" required />
          <span onClick={() => setShowPassword(!showPassword)}>{showPassword === true ? 'HIDE' : 'SHOW'}</span>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="sign-in-button" disabled={loading}>
          Sign In {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
      <button onClick={() => setAuthState('signup')}>Sign Up</button>
    </>
  );
};
