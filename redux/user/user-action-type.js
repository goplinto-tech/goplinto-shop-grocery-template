const authActionType = {
    AUTH_SHOW_TOGGLE: 'AUTH_SHOW_TOGGLE',

    GET_LOGIN_OTP_START: "GET_LOGIN_OTP_START",
    GET_LOGIN_OTP_SSUCCESS: "GET_LOGIN_OTP_SUCCESS",

    GET_REGISTER_OTP_START: "GET_REGISTER_OTP_START",
    GET_REGISTER_OTP_SUCCESS: "GET_REGISTER_OTP_SUCCESS",

    OTP_VERIFICATION_START: "OTP_SUBMIT_START",
    OTP_VERIFICATION_SUCCESS: "OTP_SUBMIT_SUCCESS",

    CLEARE_USER_START: "CLEARE_USER_START",

    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOG_OUT_START: 'LOG_OUT_START',

    REGISTER_WITH_PASSWORD_START: 'REGISTER_WITH_PASSWORD_START',
    REGISTER_WITH_PASSWORD_SUCCESS: 'REGISTER_WITH_PASSWORD_SUCCESS',

    LOGIN_WITH_PASSWORD_START: 'LOGIN_WITH_PASSWORD_START',
    LOGIN_WITH_PASSWORD_SUCCESS: 'LOGIN_WITH_PASSWORD_SUCCESS',

    FORGOT_PASSWORD_START: 'FORGOT_PASSWORD_START',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',

    FORGOT_PASSWORD_OTP_VERIFY_START: 'FORGOT_PASSWORD_OTP_VERIFY_START',
    FORGOT_PASSWORD_OTP_VERIFY_SUCCESS: 'FORGOT_PASSWORD_OTP_VERIFY_SUCCESS',

    NEW_PASSWORD_CREATE_START: 'NEW_PASSWORD_CREATE_START',
    NEW_PASSWORD_CREATE_SUCCESS: 'NEW_PASSWORD_CREATE_SUCCESS',


    GET_ADDRESS_START: 'GET_ADDRESS_START',
    GET_ADDRESS_SUCCESS: 'GET_ADDRESS_SUCCESS',
    ADD_ADDRESS_START: 'ADD_ADDRESS_START',
    ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',
    REMOVE_ADDRESS_START: 'REMOVE_ADDRESS_START',
    REMOVE_ADDRESS_SUCCESS: 'REMOVE_ADDRESS_SUCCESS',
    UPDATE_ADDRESS_START: 'UPDATE_ADDRESS_START',
    UPDATE_ADDRESS_SUCCESS: 'UPDATE_ADDRESS_SUCCESS',

    AUTH_ERROR: "AUTH_ERROR",

}


export default authActionType;