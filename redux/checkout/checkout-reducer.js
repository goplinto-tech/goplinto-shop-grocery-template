import checkoutActionType from "./checkout-action-type";

const INITIAL_STATE = {

    purchase: null,
    purchaseDetails: null, //{},
    isDetailsLoading: false,

}


const checkoutReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case checkoutActionType.GET_PURCHASE_START:
            return {
                ...state,
                isDetailsLoading: true
            }
        case checkoutActionType.GET_PURCHASE_SUCCESS:
            return {
                ...state,
                isDetailsLoading: false,
                purchaseDetails: payload,
            }
        case checkoutActionType.GET_PURCHASE_FAILURE:
            return {
                ...state,
                isDetailsLoading: false
            }
        case checkoutActionType.SET_BACKEND_CART_SUCCESS:
            return {
                ...state,
                purchase: payload
            }
        case checkoutActionType.CLEARE_CHECKOUT:
            return INITIAL_STATE

        default:
            return state;
    }
}

export default checkoutReducer;
