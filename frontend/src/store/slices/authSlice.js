import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../api/authApi";
import { setToast } from "./notificationSlice";
import { setTokenToAxios } from "../../api/iaxios";

const intialState = {
  authStatus: 'notChecked',
  authInfo: {
    id: 0,
    user_id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birth_date: '',
    gender: '',
    token: '',
    remember_me: false,
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: intialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
      state.authStatus = 'loggedIn';
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setLogout: (state) => {
      state.authStatus = 'loggedOut';
      state.authInfo = intialState.authInfo;
    }
  }
});

export const { setAuthInfo, setAuthStatus, setLogout } = authSlice.actions;

export const logoutAction = () => (dispatch) => {
  dispatch(setLogout());
  localStorage.removeItem('authInfo');
  localStorage.removeItem('lastPlayingInfo');
};

export const checkAuthAction = () => (dispatch) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  if (authInfo) {
    dispatch(setAuthInfo(authInfo));
    dispatch(setAuthStatus('loggedIn'));
    setTokenToAxios(authInfo.token);
  } else {
    dispatch(setAuthStatus('loggedOut'));
  }
};

export const loginAction = (data) => (dispatch) => {
  login(data).then(response => {
    dispatch(setAuthInfo(response.data));
    dispatch(setToast({ open: true, type: 'success', message: 'Ugurla giris edildi!' }));
    dispatch(setAuthStatus('loggedIn'));
    if (data.remember_me) {
      localStorage.setItem('authInfo', JSON.stringify(response.data));
    }
    setTokenToAxios(response.data.token);
  }).catch(error => {
    dispatch(setToast({ open: true, type: 'error', message: error.response.data.message }));
  });
};

export const registerAction = (data) => (dispatch) => {
  register(data).then(response => {
    dispatch(setAuthInfo(response.data));
    dispatch(setToast({ open: true, type: 'success', message: 'Ugurla qeydiyyatdan kecdiniz!' }));
    dispatch(setAuthStatus('loggedIn'));
    setTokenToAxios(response.data.token);
  }).catch(error => {
    const [errorType, [errorMessage]] = Object.entries(error.response.data)[0];
    dispatch(setToast({ open: true, type: 'error', message: `${errorType} - ${errorMessage}` }));
  });
};
