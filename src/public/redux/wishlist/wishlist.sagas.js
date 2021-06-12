import { all, call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import wishlistTypes from "./wishlist.types";
import {
  addWishListSuccess,
  addWishListRejected,
  getWishListRejected,
  deleteWishListRejected,
  deleteWishListSuccess,
  getWishListSuccess,
} from "./wishlist.actions";

const url = "http://10.0.2.2:3000/wishlist";

export function sendRequestGetWishlist(token) {
  return axios
    .get(url, {
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

export function sendRequestAddWishlist({ idProduct, token }) {
  return axios
    .post(
      url,
      {
        product: idProduct,
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

export function sendRequestDeleteWishlist({ idWishlist, token }) {
  return axios
    .delete(url + `/${idWishlist}`, {
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

export function* GetWishlist({ payload: data }) {
  try {
    response = yield call(sendRequestGetWishlist, data);
    yield put(getWishListSuccess(response));
  } catch (error) {
    yield put(getWishListRejected(error));
  }
}

export function* AddWishlist({ payload: data }) {
  try {
    response = yield call(sendRequestAddWishlist, data);
    yield put(addWishListSuccess(response));
  } catch (error) {
    yield put(addWishListRejected(error));
  }
}

export function* DeleteWishlist({ payload: data }) {
    try {
      response = yield call(sendRequestDeleteWishlist, data);
      yield put(deleteWishListSuccess(response));
    } catch (error) {
      yield put(deleteWishListRejected(error));
    }
  }

export function* onGetWishlist() {
  yield takeLatest(wishlistTypes.GET_WISHLIST_PENDING, GetWishlist);
}

export function* onAddWishlist() {
  yield takeLatest(wishlistTypes.POST_WISHLIST_PENDING, AddWishlist);
}

export function* onDeleteWishlist() {
    yield takeLatest(wishlistTypes.DELETE_WISHLIST_PENDING, DeleteWishlist);
  }

export function* wishlistSagas() {
  yield all([call(onGetWishlist), call(onAddWishlist), call(onDeleteWishlist)]);
}