import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useEffect, useState } from 'react';
import { serverUrl } from '../../utils/constants';

interface Props {
  setAuthState: (state: string) => void;
}
export const SignUpForm = ({ setAuthState }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [keyUp, setKeyUp] = useState(false);
  const [passwordPass, setPasswordPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const regexSpec = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
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
    document.querySelector('.password input')?.classList.remove('error');
    document.querySelector('.confirm-password input')?.classList.remove('error');

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

  const onSignUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const password = document.querySelector('.password input') as HTMLInputElement;
    const confirmPassword = document.querySelector('.confirm-password input') as HTMLInputElement;
    if (!passwordPass) {
      password?.classList.add('error');
      setLoading(false);
      return;
    }

    if (password.value !== confirmPassword.value) {
      password.classList.add('error');
      confirmPassword.classList.add('error');
      setLoading(false);
      return;
    }

    const formData = e.target as HTMLFormElement & {
      email: { value: string };
      fName: { value: string };
      lName: { value: string };
      password: { value: string };
    };

    const { email, fName, lName, password: pw } = formData;

    const res = await fetch(`${serverUrl}/account/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        fName: fName.value,
        lName: lName.value,
        password: pw.value,
      }),
    });

    const response = await res.json();
    if (!res.ok) {
      setErrorMessage(response);
    } else {
      setAuthState('login');
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={onSignUpSubmit}>
        <div className="input email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Your Email" required />
        </div>
        <div className="input first-name">
          <label htmlFor="fName">First Name</label>
          <input type="text" name="fName" placeholder="Enter Your First Name" required />
        </div>
        <div className="input last-name">
          <label htmlFor="lName">Last Name</label>
          <input type="text" name="lName" placeholder="Enter Your Last Name" required />
        </div>
        <div className="input password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
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
        <div className="input confirm-password password">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Your Password"
            onChange={() => {
              document.querySelector('.password input')?.classList.remove('error');
              document.querySelector('.confirm-password input')?.classList.remove('error');
            }}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="sign-in-button" disabled={loading}>
          Sign Up {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
      <button
        onClick={() => {
          setAuthState('login');
        }}
      >
        Back to Sign In
      </button>
    </>
  );
};
