import cartActionType from "./cart-action-type";
import checkoutActionType from '../checkout/checkout-action-type'
import { addCartItem, deleteFromCart, removeFromCart, filterCart } from "./utility";


const INITISL_STATE = []
const cartReducer = (state = INITISL_STATE, { type, payload }) => {
    switch (type) {
        case cartActionType.ADD_TO_CART:
            return addCartItem(state, payload);

        case cartActionType.REMOVE_FROM_CART:
            return removeFromCart(state, payload);

        case cartActionType.DELETE_FROM_CART:
            return deleteFromCart(state, payload);

        //** Update Cart with updated data of server (important)
        // case checkoutActionType.GET_PURCHASE_SUCCESS:
        //     return filterCart(state, payload)

        case cartActionType.CLEAR_CART:
            return INITISL_STATE

        default:
            return state;
    }
}

export default cartReducer;