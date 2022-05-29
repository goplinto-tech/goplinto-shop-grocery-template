import userActionType from "./user-action-type";
const INITIAL_STATE = {
    currentUser: null, // {}
    address: [],
    show: false, // true or false
    customerWallet:null
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case userActionType.AUTH_SHOW_TOGGLE:
            return {
                ...state,
                show: !state.show,
            }
        case userActionType.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
            }
        case userActionType.GET_ADDRESS_SUCCESS:
            return {
                ...state,
                address: [...payload],
            }
        case userActionType.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
        case userActionType.SET_WALLET_BALANCE:
            return {
                ...state,
                customerWallet: payload,
            }

        case userActionType.CLEARE_USER_START:
            return INITIAL_STATE

        default:
            return state;
    }
}
export default userReducer;