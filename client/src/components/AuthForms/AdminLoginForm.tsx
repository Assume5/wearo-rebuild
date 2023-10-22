import React, { useState } from 'react';
import { AuthForm } from './AuthForm';

export const AdminLoginForm = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="admin-login">
      <AuthForm setShowModal={setShowModal} show={showModal} isAdmin={true} />
    </div>
  );
};
