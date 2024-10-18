import { getUsers } from '@/lib/getUsers';
import { getCurrentUser } from '@/lib/getCurrentUser';

import styles from './page.module.scss';
import DashboardContainer from '@/components/Dashboard/DashboardContainer';

const DashboardPage = async () => {
  const users = await getUsers();
  const currUser = await getCurrentUser();

  return (
    <div className={styles.dashboardContainer}>
      <DashboardContainer users={users} currUser={currUser} />
    </div>
  );
};

export default DashboardPage;
