import axios from 'axios';
import * as types from './ActionTypes';

/* Login */
export function login() {
  return {type: types.AUTH_LOGIN};
}

export function loginSuccess(username) {
  return {type: types.AUTH_LOGIN_SUCCESS, username};
}

export function loginFailure() {
  return {type: types.AUTH_LOGIN_FAILURE};
}

export function loginRequest(username, password) {
  return (dispatch) => {
    dispatch(login());

    return axios
      .post('/api/account/signin', {username, password})
      .then((res) => {
        dispatch(loginSuccess(username));
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
}


/* Register */
export function register() {
  return {type: types.AUTH_REGISTER};
}

export function registerSuccess() {
  return {type: types.AUTH_REGISTER_SUCCESS};
}

export function registerFailure() {
  return {type: types.AUTH_REGISTER_FAILURE};
}

export function registerRequest(username, password) {
  return (dispatch) => {
    dispatch(register());

    return axios
      .post('/api/account/signup', {username, password})
      .then((res) => {
        dispatch(registerSuccess());
      })
      .catch((err) => {
        dispatch(registerFailure(err.response.data.code));
      });
  };
}


/* getStatus */
export function getStatus() {
  return {type: types.AUTH_GET_STATUS};
}

export function getStatusSuccess(username) {
  return {type: types.AUTH_GET_STATUS_SUCCESS, username};
}

export function getStatusFailure() {
  return {type: types.AUTH_GET_STATUS_FAILURE};
}

export function getStatusRequest() {
  return (dispatch) => {
    dispatch(getStatus());

    return axios
      .get('/api/account/isLogin')
      .then((res) => {
        dispatch(getStatusSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getStatusFailure());
      });
  };
}


/* Logout */
export function logout() {
  return {type: types.AUTH_LOGOUT};
}

export function logoutRequest() {
  return (dispatch) => {
    return axios
      .post('/api/account/signout')
      .then((res) => {
        dispatch(logout());
      });
  };
}