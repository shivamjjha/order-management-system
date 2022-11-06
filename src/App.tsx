import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useUser } from './context/auth-context';
import { action as destroyAction } from './routes/destroy';
import ErrorPage from './routes/error-page';
import { action as homeAction, Home, loader as homeLoader } from './routes/Home';
import { Login } from './routes/Login';
import Root from './routes/Root';

function App() {
  const user = useUser();
  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

function PrivateRoute({ children, redirectTo }: any): any {
  const auth = useUser();
  // return auth ? children : <Navigate to={redirectTo ?? '/login'} />;
  return auth ? children : <Navigate to={redirectTo ?? '/login'} />;
}

function AuthenticatedApp() {
  return <RouterProvider router={authRoutes} />;
}

function UnAuthenticatedApp() {
  return <RouterProvider router={unauthRoutes} />;
}

const unauthRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Root />
          </PrivateRoute>
        }
      ></Route>
      <Route path='login' element={<Login />} />
    </>
  )
);

const authRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} loader={homeLoader} action={homeAction} />
        <Route path="/new" element={<Home />} loader={homeLoader} action={homeAction} />
        <Route path="/edit/:orderNumber" element={<Home />} loader={homeLoader} action={homeAction} />
        <Route errorElement={<ErrorPage />}>
          <Route path='/:id/destroy' action={destroyAction}></Route>
        </Route>
      </Route>
      <Route
        path='login'
        element={(() => (
          <Navigate to='/' />
        ))()}
      />
    </>
  )
);

export default App;
