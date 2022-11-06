import {
  Outlet, useNavigation
} from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function Root() {
  const navigation = useNavigation();
  const { logout }: any = useAuth();

  return (
    <>
      <header className='flex justify-between mb-2 mx-3'>
        <h1 className='text-2xl'>Orders Page</h1>
        <button type='button'
          className='inline-flex w-full justify-center rounded-md border border-transparent bg-slate-400 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={logout}>Logout</button>
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
