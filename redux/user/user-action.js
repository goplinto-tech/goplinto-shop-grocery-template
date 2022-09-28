import userActionType from "./user-action-type"

export const authShowToggle = () => ({
    type: userActionType.AUTH_SHOW_TOGGLE
})
//  Login
export const getLoginOtpStart = (phone) => ({
    type: userActionType.GET_LOGIN_OTP_START,
    payload: phone
})
export const getLoginOtpSuccess = (userId) => ({
    type: userActionType.GET_LOGIN_OTP_SSUCCESS,
    payload: userId
})
export const logOut = () => ({
    type: userActionType.LOG_OUT
})

// Register
export const getRegisterOtpStart = (phone) => ({
    type: userActionType.GET_REGISTER_OTP_START,
    payload: phone
})
export const getRegisterOtpSuccess = (userId) => ({
    type: userActionType.GET_REGISTER_OTP_SUCCESS,
    payload: userId
})

// OTP
export const otpVerificationStart = (otp) => ({
    type: userActionType.OTP_VERIFICATION_START,
    payload: otp
})
export const otpVerificationSuccess = (user) => ({
    type: userActionType.OTP_VERIFICATION_SUCCESS,
    payload: user
})

// Log Out
export const logOutStart = () => ({
    type: userActionType.LOG_OUT_START,
})

export const cleareUserStart = () => ({
    type: userActionType.CLEARE_USER_START,
})

export const addAddress = (address) => ({
    type: userActionType.ADD_ADDRESS,
    payload: address
})
//  LOGIN
export const loginSuccess = (user) => ({
    type: userActionType.LOGIN_SUCCESS,
    payload: user
})
// ADDRESS
export const getAddressStart = (userId) => ({
    type: userActionType.GET_ADDRESS_START,
    payload: userId
})
export const getAddressSuccess = (add) => ({
    type: userActionType.GET_ADDRESS_SUCCESS,
    payload: add
})
export const addAddressStart = (data) => ({
    type: userActionType.ADD_ADDRESS_START,
    payload: data
})
export const addAddressSuccess = (add) => ({
    type: userActionType.ADD_ADDRESS_SUCCESS,
    payload: add
})
export const removeAddressStart = (data) => ({
    type: userActionType.REMOVE_ADDRESS_START,
    payload: data
})
export const removeAddressSuccess = (add) => ({
    type: userActionType.REMOVE_ADDRESS_SUCCESS,
    payload: add
})
export const updateAddressStart = (data) => ({
    type: userActionType.UPDATE_ADDRESS_START,
    payload: data
})
export const updateAddressSuccess = (add) => ({
    type: userActionType.UPDATE_ADDRESS_SUCCESS,
    payload: add
})

//
export const registerWithPasswordStart = (data) => ({
    type: userActionType.REGISTER_WITH_PASSWORD_START,
    payload: data
})
export const registerWithPasswordSuccess = (data) => ({
    type: userActionType.REGISTER_WITH_PASSWORD_SUCCESS,
    payload: data
})
export const loginWithPasswordStart = (data) => ({
    type: userActionType.LOGIN_WITH_PASSWORD_START,
    payload: data
})
export const loginWithPasswordSuccess = (data) => ({
    type: userActionType.LOGIN_WITH_PASSWORD_SUCCESS,
    payload: data
})
export const forgotPasswordStart = (data) => ({
    type: userActionType.FORGOT_PASSWORD_START,
    payload: data
})
export const forgotPasswordSuccess = (data) => ({
    type: userActionType.FORGOT_PASSWORD_SUCCESS,
    payload: data
})

export const forgotPasswordOtpVerifyStart = (data) => ({
    type: userActionType.FORGOT_PASSWORD_OTP_VERIFY_START,
    payload: data
})
export const forgotPasswordOtpVerifySuccess = (data) => ({
    type: userActionType.FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
    payload: data
})

export const newPasswordCreateStart = (data) => ({
    type: userActionType.NEW_PASSWORD_CREATE_START,
    payload: data
})
export const newPasswordCreateSuccess = (data) => ({
    type: userActionType.NEW_PASSWORD_CREATE_SUCCESS,
    payload: data
})


// UPDATE USER DETAILS
export const updateUserDetails = (data) => ({
    type: userActionType.UPDATE_USER_DETAILS,
    payload: data
})

export const updateCurrentUserDetails = (data) =>
(

    {
        type: userActionType.UPDATE_CURRENT_USER,
        payload: data
    }
)

export const getWalletBalance = (data) =>{
return{
        type: userActionType.GET_WALLET_BALANCE,
        payload: data
    }
}

export const setWalletBalance = (data) =>
(

    {
        type: userActionType.SET_WALLET_BALANCE,
        payload: data
    }
)

export const getCountryAction = (data) => ({
    type: userActionType.GET_COUNTRIES,
    payload: data
})

export const getStateAction = (data) => ({
    type: userActionType.GET_STATES,
    payload: data
})


