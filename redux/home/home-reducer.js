import homeActionType from "./home-action-type";

const INITIAL_STATE = {
    banners: [],
    aboutus: null, // {}
    products: []
}

const homeReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case homeActionType.BANNERS_FETCH_SUCCESS:
            return {
                ...state,
                banners: payload
            }
        case homeActionType.PRODUCTS_LIST_FETCH_SUCCESS:
            return {
                ...state,
                products: [...state.products, ...payload]
            }
        case homeActionType.ABOUTUS_FETCH_SUCCESS:
            return {
                ...state,
                aboutus: payload
            }
        default:
            return state;
    }
}

export default homeReducer;