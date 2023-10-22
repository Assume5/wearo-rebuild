import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

interface Props {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin?: boolean;
}

export const AuthForm = ({ show, setShowModal, isAdmin }: Props) => {
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
        {!isAdmin ? <FontAwesomeIcon icon={faTimes} onClick={onCloseClick} /> : <></>}
        {authState === 'login' ? (
          <LoginForm setAuthState={changeAuthState} setShowModal={setShowModal} isAdmin={isAdmin} />
        ) : (
          <SignUpForm setAuthState={changeAuthState} />
        )}
      </>
    </Modal>
  );
};
