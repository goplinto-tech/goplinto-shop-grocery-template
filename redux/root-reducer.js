import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


// Reducers
import userReducer from "./user/user-reducer";
import homeReducer from "./home/home-reducer";
import wishlistReducer from "./wishlist/wishlist-reducer";
import cartReducer from './cart/cart-reducer'
import shopReducer from "./shop/shop-reducer";
import checkoutReducer from "./checkout/checkout-reducer";
import productDetailsReducer from "./product-details/product-reducer";
import globalErrorReducer from "./global-error-handler/global-error-handler-reducer";
import searchReducer from "./search/search-reducer";

// Configs

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user', 'checkout'],
    // whitelist: ['cart', 'checkout']
}
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    home: homeReducer,
    store: shopReducer,
    checkout: checkoutReducer,
    productDetails: productDetailsReducer,
    wishlist: wishlistReducer,
    globalError: globalErrorReducer,
    search: searchReducer,
})

export default persistReducer(persistConfig, rootReducer);