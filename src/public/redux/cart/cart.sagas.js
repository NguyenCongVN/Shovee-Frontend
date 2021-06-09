import axios from 'axios';
import { all, call, takeLatest, put } from "redux-saga/effects";
import cartType from './cart.types'
import {getCartRejected , getCartSuccess} from './cart.actions'
import {AsyncStorage} from 'react-native'
const url = 'http://10.0.2.2:3000/cart';

export function sendRequestGetCart(token)
{
    return axios.get(`${url}`, {
        headers: {
            'x-auth-token':token
        }
    }).then(response => response).catch(error => {
        throw error
    })
}

export function* GetCart(){
    try{
        const userToken = yield call(AsyncStorage.getItem, 'Token');
        response = yield call(sendRequestGetCart , userToken)
        yield put(getCartSuccess(response))
    }
    catch{
        yield put(getCartRejected())
    }
}


export function* onGetCart(){
    yield takeLatest(cartType.GET_CART_PENDING , GetCart);
}

export function* cartSagas() {
    yield all([call(onGetCart)]);
  }