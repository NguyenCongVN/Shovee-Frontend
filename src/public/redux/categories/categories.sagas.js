import { all, call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
  getCategoriesRejected,
  getCategoriesSuccess,
} from "./categories.actions";
import categoryTypes from "./categories.types";
const url = "http://10.0.2.2:3000/categories";

export function sendRequestGetCategories() {
  return axios
    .get(url)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export function* GetCategories() {
    try{
        response = yield call(sendRequestGetCategories)
        yield put(getCategoriesSuccess(response))
    }
    catch(err){
        yield put(getCategoriesRejected())
    }
}

export function* onGetCategories() {
  yield takeLatest(categoryTypes.GET_CATEGORIES_PENDING, GetCategories);
}

export function* categoriesSagas() {
  yield all([call(onGetCategories)]);
}
