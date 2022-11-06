import {
  Outlet, useNavigation
} from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function Root() {
  const navigation = useNavigation();
  const { logout }: any = useAuth();

  return (
    <>
      <header>
        <h1>Orders Page</h1>
        <button type='button' onClick={logout}>Logout</button>
      </header>
      <div
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
