import { all, call, takeLatest, put } from "redux-saga/effects";
import authTypes from "./auth.types";
import {
  loginSuccess,
  loginRejected,
  registerSuccess,
  registerRejected,
} from "./auth.actions";
import axios from "axios";
import { AsyncStorage } from "react-native";
const url = "http://10.0.2.2:3000/users";
export function sendRequestLogin({ username, password }) {
  return axios
    .post(`${url}/authenticate`, {
      user: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function* LoginStart({ payload: data }) {
  try {
    response = yield call(sendRequestLogin, data);
    yield call(AsyncStorage.setItem, "Token", response.data.token);
    yield put(loginSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(loginRejected());
  }
}

export function sendRequestRegister({ payload: userInfo }) {
  var data = new FormData();
  data.append("images", {
    uri: userInfo.image.uri,
    name: userInfo.image.fileName,
    type: "image/jpg",
  });
  data.append("username", userInfo.username);
  data.append("phone", userInfo.phone);
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);
  data.append("password_confirmation", userInfo.password_confirmation);
  return axios
    .post(`${url}/register`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function* RegisterStart(data) {
  try {
    response = yield call(sendRequestRegister, data);
    yield put(registerSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(registerRejected());
  }
}

export function* onLogInStart() {
  yield takeLatest(authTypes.LOGIN_PENDING, LoginStart);
}

export function* onRegisterStart() {
  yield takeLatest(authTypes.REGISTER_PENDING, RegisterStart);
}

export function* authSagas() {
  yield all([call(onLogInStart), call(onRegisterStart)]);
}
