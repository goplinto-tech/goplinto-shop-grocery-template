import productActionType from "./product-action-type";


const INITISL_STATE = {
    product: {},
    similarProducts: [],
    specifications: [],
    additionalinfo: [],
    error: null
}
const productDetailsReducer = (state = INITISL_STATE, { type, payload }) => {
    switch (type) {
        case productActionType.PRODUCT_DETAILS_FETCH_START:
            return {
                ...state,
                product: {} // {}
            }
        case productActionType.PRODUCT_DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                product: payload // {}
            }
        case productActionType.SIMILAR_PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                similarProducts: payload //[]
            }
        case productActionType.GET_PRODUCT_SPECIFICATINS_SUCCESS:
            return {
                ...state,
                specifications: payload //[]
            }
        case productActionType.GET_PRODUCT_ADDITIONALINFO_SUCCESS:
            return {
                ...state,
                additionalinfo: payload //[]
            }
        case productActionType.ERROR_ON_PRODUCT_DETAIL_PAGE:
            return {
                ...state,
                error: payload
            }

        default:
            return state;
    }
}

export default productDetailsReducer;