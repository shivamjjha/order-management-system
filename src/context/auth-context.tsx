import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { eraseCookie, getCookie, setCookie } from '../utils/cookie';

const initialState = {
  loggedIn: false,
  globalLoading: true,
  user: null,
};

interface GLOBAL_STATE {
  loggedIn: boolean;
  globalLoading: boolean;
  user: any;
}

type CTX = {
  login: (u: any, p: any) => Promise<void>;
  logout: () => void;
  state: GLOBAL_STATE;
  user: any;
} | null;

const AuthContext = React.createContext<CTX>(null);
AuthContext.displayName = 'AuthContext';

/* actions start */
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GLOBAL_LOADING_END = 'GLOBAL_LOADING_END';
/* actions end */

function mainReducer(
  state: GLOBAL_STATE,
  action: { type: string; payload?: unknown }
): GLOBAL_STATE {
  const { type, payload } = action;

  if (type === LOGIN) {
    return {
      ...state,
      user: payload,
      loggedIn: true,
    };
  }

  if (type === LOGOUT) {
    return {
      ...state,
      user: null,
      loggedIn: false,
    };
  }

  if (type === GLOBAL_LOADING_END) {
    return {
      ...state,
      globalLoading: false,
    };
  }

  return state;
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    eraseCookie('user');
    eraseCookie('orders');
    window.location.href = '/login';
  }, []);

  useEffect(() => {
    try {
      const user = getCookie('user');
      if (user) {
        dispatch({ type: LOGIN, payload: JSON.parse(user) });
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({ type: GLOBAL_LOADING_END });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {

    if (username == null || password == null) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new Response('', {
        status: 401,
        statusText: 'Invalid username or password',
      });
    }
    const payload = { user: { username, password } };
    setCookie('user', JSON.stringify(payload));
    dispatch({ type: LOGIN, payload });
    // return { user: userRegistered.fields };
  }, []);

  const value = useMemo(() => {
    return { login, logout, state, user: state.user };
  }, [login, logout, state]);

  if (state.globalLoading) {
    return <p>loading...</p>;
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useUser() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context?.user;
}

export { AuthProvider, useAuth, useUser };
