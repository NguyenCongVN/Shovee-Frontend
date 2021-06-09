import axios from "axios";
import { all, call, takeLatest, put } from "redux-saga/effects";
import productType from "./product.types";
import {
  getProductSuccess,
  getProductRejected,
  getMoreProductSuccess,
  getMoreProductRejected,
  addProductSuccess,
  addProductRejected,
} from "./product.actions";
const url = "http://10.0.2.2:3000/products";

export function sendRequestGetProduct() {
  return axios
    .get(`${url}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

export function sendRequestGetMoreProduct(page) {
  return axios
    .get(`${url}?page=${page}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

export function sendRequestPostProduct(
  token,
  category,
  price,
  images,
  city,
  description,
  name,
  stok,
  brand
) {
  var data = new FormData();
  data.append("images", {
    uri: images.uri,
    name: images.fileName,
    type: "image/jpg",
  });
  data.append("name", name);
  data.append("description", description);
  data.append("city", city);
  data.append("price", price);
  data.append("category", category);
  data.append("stok", stok);
  data.append("brand", brand);
  return axios
    .post(url, data, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

export function* GetProduct() {
  try {
    response = yield call(sendRequestGetProduct);
    yield put(getProductSuccess(response));
  } catch (error) {
    yield put(getProductRejected());
  }
}

export function* GetMoreProduct({ payload: page }) {
  try {
    response = yield call(sendRequestGetMoreProduct, page);
    yield put(getMoreProductSuccess(response));
  } catch (error) {
    yield put(getMoreProductRejected());
  }
}

export function* PostProduct({ 'payload': data }) {
  try {
    response = yield call(sendRequestPostProduct, ...data);
    yield put(addProductSuccess(response));
  } catch (error) {
    yield put(addProductRejected(error));
  }
}

export function* onGetProduct() {
  yield takeLatest(productType.GET_PRODUCTS_PENDING, GetProduct);
}

export function* onGetMoreProduct() {
  yield takeLatest(productType.GET_PRODUCTS_MORE_PENDING, GetMoreProduct);
}

export function* onPostProduct() {
  yield takeLatest(productType.POST_PRODUCT_PENDING, PostProduct);
}

export function* productSagas() {
  yield all([call(onGetProduct), call(onGetMoreProduct), call(onPostProduct)]);
}
