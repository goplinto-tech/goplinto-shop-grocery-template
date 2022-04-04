import wishlistActionType from "./wishlist-action-type";

const INITIAL_STATE = {
    list: [],
    pending: [],
    error: null,// {} //
}

const wishlistReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case wishlistActionType.GET_WISHLIST_SUCCESS:
            return {
                ...state,
                list: [...payload],
                error: null,
            }
        // case wishlistActionType.ADD_WISHLIST_SUCCESS:
        //     return {
        //         ...state,
        //         list: [...state.list, payload],
        //         error: null
        //     }
        case wishlistActionType.CLEARE_WISHLIST:
            return {
                ...state,
                list: []
            }
        case wishlistActionType.WISHLIST_ERROR:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}

export default wishlistReducer;