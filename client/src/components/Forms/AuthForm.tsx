import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

interface Props {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthForm = ({ show, setShowModal }: Props) => {
  const [authState, setAuthState] = useState('login');

  const changeAuthState = (state: string) => {
    if (!show) return;
    const container = document.querySelector('.auth-modal');
    if (!container) return;
    container.classList.remove('show');

    setTimeout(() => {
      setAuthState(state);
      container.classList.add('show');
    }, 300);
  };

  const onCloseClick = () => {
    setShowModal(false);
    setAuthState('login');
  };

  return (
    <Modal rootClassName={`auth-modal ${show && 'show'}`}>
      <>
        <FontAwesomeIcon icon={faTimes} onClick={onCloseClick} />
        {authState === 'login' ? (
          <LoginForm setAuthState={changeAuthState} setShowModal={setShowModal} />
        ) : (
          <SignUpForm setAuthState={changeAuthState} />
        )}
      </>
    </Modal>
  );
};
