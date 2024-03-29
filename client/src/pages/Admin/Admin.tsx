import { Page } from '../../components/Page/Page';
import { AdminLoginForm } from '../../components/AuthForms/AdminLoginForm';
import { useCheckAdminLogin } from '../../hooks/useCheckAdminLogin';

export const Admin = () => {
  useCheckAdminLogin();
  return (
    <Page rootClass="admin">
      <AdminLoginForm />
    </Page>
  );
};
