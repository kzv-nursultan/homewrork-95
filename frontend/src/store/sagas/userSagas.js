import {put, takeEvery} from 'redux-saga/effects';
import {NotificationManager} from "react-notifications";
import userSlices from "../slices/userSlices";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historySaga";

export const {
  facebookLoginRequest,
  googleLoginRequest,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} = userSlices.actions;

export function* registerUser({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users',userData);
    yield put(registerSuccess(response.data));
    yield put(historyPush('/'));
    NotificationManager.success('Success')
  } catch (error) {
    yield put(registerFailure(error.response.data));
    NotificationManager.error(error.message);
  }
}

export function* loginUser({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);
    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    NotificationManager.success('Success');
  } catch (error) {
    yield put(loginFailure(error.response.data));
    NotificationManager.error(error.message);
  }
}

export function* facebookLogin({payload: data}) {
  try {
    const response = yield axiosApi.post('/users/facebookLogin', data);
    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    NotificationManager.success('Success');
  } catch (error) {
    yield put(loginFailure(error.response.data));
    NotificationManager.error(error.message);
  }
}

export function* googleLogin({payload: {tokenId, googleId}}) {
  try {
    const body = {tokenId, googleId};
    const response = yield axiosApi.post('/users/googleLogin', body);
    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    NotificationManager.success('Success');
  } catch (error) {
    yield put(loginFailure(error.response.data));
    NotificationManager.error('Error');
  }
}

export function* logout() {
  try {
    yield axiosApi.delete('/users/sessions');
    yield put(logoutSuccess());
    yield put(historyPush('/'));
  } catch (e) {

  }
}

const usersSagas = [
  takeEvery(registerRequest, registerUser),
  takeEvery(loginRequest, loginUser),
  takeEvery(facebookLoginRequest, facebookLogin),
  takeEvery(googleLoginRequest, googleLogin),
  takeEvery(logoutRequest, logout),
];

export default usersSagas;