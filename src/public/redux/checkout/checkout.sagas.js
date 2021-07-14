import {
  all,
  call,
  takeLatest,
  put,
  takeEvery,
  take,
} from "redux-saga/effects";
import checkoutTypes from "./checkout.types";
import axios from "axios";
import OneSignal from "react-native-onesignal";
import {
  fetchCheckoutSuccess,
  fetchCheckoutRejected,
  postCheckoutSuccess,
  postCheckoutRejected,
  configOneSignal,
  updatePhoneId,
  sendNotificationCheckOut,
} from "./checkout.actions";
import { channel } from "redux-saga";

const url = "http://10.0.2.2:3000/checkout";

const updateIdChannel = channel();
const receiveChannel = channel();

export function sendRequestFetchCheckout(token) {
  return axios
    .get(`${url}`, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
}

export function sendRequestPostCheckout(data, token, playerId) {
  return axios
    .post(
      `${url}`,
      {
        data,
      },
      {
        headers: {
          "x-auth-token": token,
        },
        params: {
          playerId,
        },
      }
    )
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
}

export function* configureOneSignal() {
  OneSignal.init("df4cae47-cd9d-4dd5-b97f-5f63593f39fb");
  OneSignal.inFocusDisplaying(2);
  OneSignal.addEventListener("received", (notification) => {
    receiveChannel.put(sendNotificationCheckOut(notification));
  });
  OneSignal.addEventListener("opened", onOpened);
  OneSignal.addEventListener("ids", (device) => {
    updateIdChannel.put(updatePhoneId(device.userId));
  });
  OneSignal.configure();
}

export function* watchUpdateIdChannel() {
  while (true) {
    const action = yield take(updateIdChannel);
    yield put(action);
  }
}

export function* watchReceiveChannel() {
  while (true) {
    const action = yield take(receiveChannel);
    yield put(action);
  }
}

export function onOpened(openResult) {
  console.log("Message: ", openResult.notification.payload.body);
  console.log("Data: ", openResult.notification.payload.additionalData);
  console.log("isActive: ", openResult.notification.isAppInFocus);
  console.log("openResult: ", openResult);
}

export function* fetchChechOutStart({ payload: token }) {
  try {
    response = yield call(sendRequestFetchCheckout, token);
    yield put(fetchCheckoutSuccess(response));
  } catch (err) {
    yield put(fetchCheckoutRejected(err));
  }
}

export function* postChechOutStart({ payload: { data, token, playerId } }) {
  try {
    response = yield call(sendRequestPostCheckout, data, token, playerId);
    yield put(postCheckoutSuccess(response));
  } catch (err) {
    yield put(postCheckoutRejected(err));
  }
}

export function* configureSignalStart() {
  yield call(configureOneSignal);
}

export function* onConfigOneSignal() {
  yield takeLatest(checkoutTypes.CONFIGURE_ONESIGNAL, configureSignalStart);
}

export function* onfetchCheckOutStart() {
  yield takeLatest(checkoutTypes.GET_CHECKOUT_PENDING, fetchChechOutStart);
}

export function* onPostCheckOutStart() {
  yield takeLatest(checkoutTypes.POST_CHECKOUT_PENDING, postChechOutStart);
}

export function* checkOutSaga() {
  yield all([
    call(onfetchCheckOutStart),
    call(onPostCheckOutStart),
    call(onConfigOneSignal),
    call(watchUpdateIdChannel),
    call(watchReceiveChannel),
  ]);
}
