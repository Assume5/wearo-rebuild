import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { UserContext } from '../../contexts/UserContext';
import { useCheckLogin } from '../../hooks/useCheckLogin';

export const Account = () => {
  useCheckLogin();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCtx.user.checked) return;

    if (!userCtx.user.isLogin) {
      navigate('/');
    }
  }, [userCtx]);

  useEffect(() => {
    //todo get info
  }, []);

  return (
    <Page rootClass="account-page">
      <>
        <p>Account Page</p>
      </>
    </Page>
  );
};
