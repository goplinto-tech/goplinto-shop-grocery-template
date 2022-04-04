import { all, fork } from 'redux-saga/effects'

// Sagas
import homeSagas from './home/home-sagas';
import shopSagas from './shop/shop-sagas';
import userSaga from './user/user-sagas';
import wishlistSagas from './wishlist/wishlist-sagas';
import productSaga from './product-details/product-sagas';
import checkoutSagas from './checkout/checkout-sagas';
import cartSagas from './cart/cart-sagas';
import ordersSagas from './orders/orders-sagas';
import searchSagas from './search/search-sagas';

export default function* rootSaga() {
    yield all([fork(productSaga), fork(homeSagas), fork(shopSagas), fork(userSaga), fork(cartSagas), fork(wishlistSagas), fork(checkoutSagas), fork(ordersSagas), fork(searchSagas)]);
}