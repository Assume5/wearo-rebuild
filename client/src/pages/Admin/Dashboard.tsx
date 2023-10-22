import { Page } from '../../components/Page/Page';
import { useCheckAdminLogin } from '../../hooks/useCheckAdminLogin';

export const AdminDashboard = () => {
  useCheckAdminLogin();
  return (
    <Page rootClass="admin">
      <>
        <h1>Dashboard</h1>
      </>
    </Page>
  );
};
