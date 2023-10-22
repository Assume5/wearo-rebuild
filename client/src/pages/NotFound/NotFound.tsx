import React from 'react';
import { Page } from '../../components/Page/Page';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Page rootClass="not-found">
      <>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Return to Home</Link>
      </>
    </Page>
  );
};
