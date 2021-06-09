import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/auth.sagas";
import { userSagas } from "./user/user.sagas";
import { categoriesSagas } from "./categories/categories.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { productSagas } from "./product/product.sagas";
import { wishlistSagas } from "./wishlist/wishlist.sagas";
export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(userSagas),
    call(categoriesSagas),
    call(cartSagas),
    call(productSagas),
    call(wishlistSagas)
  ]);
}