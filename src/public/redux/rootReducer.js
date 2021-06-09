import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import products from './product/product.reducer'
import user from './user/user.reducer'
import auth from './auth/auth.reducer'
import categories from './categories/categories.reducer'
import cart from './cart/cart.reducer'
import wishlist from './wishlist/wishlist.reducer'
import checkout from './checkout/checkout.reducer'


const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    whitelist: ['cart']
  };

const rootReducer = combineReducers({
	auth,
    user,
    products,
    categories,
    cart,
    wishlist,
    checkout
})

export default persistReducer(persistConfig, rootReducer);