import { all, call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
  getUserDetailSuccess,
  getUserDetailRejected,
  updateProfileUserSuccess,
  updateProfileUserRejected,
} from "./user.actions";
import userTypes from "./user.types";

const url = "http://10.0.2.2:3000/users";
export function sendRequestGetProfile({ payload: token }) {
  return axios
    .get(`${url}/details`, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function sendRequestPostProfile(token, nama, provinsi, kota, kecamatan, kodepos, alamat) {
  return axios
    .patch(
      `${url}/details`,
      {
        name: nama,
        province: provinsi,
        city: kota,
        district: kecamatan,
        full_address: alamat,
        zip_code: kodepos,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function* GetUserProfile(data) {
  try {
    response = yield call(sendRequestGetProfile, data);
    yield put(getUserDetailSuccess(response));
  } catch (error) {
    yield put(getUserDetailRejected());
  }
}

export function* PostUserDetailProfile({'payload' : data}) {
  try {
    response = yield call(sendRequestPostProfile, ...data);
    yield put(updateProfileUserSuccess(response));
  } catch (error) {
    yield put(updateProfileUserRejected(error));
  }
}

export function* onGetUserProfile() {
  yield takeLatest(userTypes.GET_PROFILE_PENDING, GetUserProfile);
}

export function* onPostUserDetailProfile() {
  yield takeLatest(userTypes.UPDATE_PROFILE_PENDING, PostUserDetailProfile);
}

export function* userSagas() {
  yield all([call(onGetUserProfile), call(onPostUserDetailProfile)]);
}
