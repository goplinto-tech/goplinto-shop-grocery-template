import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";
import fetcher from "../utility";
import userActionType from './user-action-type'
import {
    getLoginOtpSuccess, getRegisterOtpSuccess, autheError, otpVerificationSuccess, cleareUserStart, getAddressSuccess, getAddressStart
} from "./user-action";
import { clearCheckout } from "../checkout/checkout-action";

import { riseError } from '../global-error-handler/global-error-handler-action.ts'

function* onGetLoginOtpStart() {
    yield takeLatest(userActionType.GET_LOGIN_OTP_START, function* ({ payload }) {
        const { phone, setUser, setError, storeId } = payload;
        try {
            if (phone.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                const res = yield axios.get(`${process.env.NEXT_PUBLIC_PLINTO_NODE_URL}/customer/email-login-register?&emailId=${phone}&authType=LOGIN&storeId=${storeId}`)
                console.log(res);
                if (res.data.status == 'success') {
                    const { customerId, fullName, } = res.data
                    const user = {
                        customer_id: customerId,
                        full_name: fullName,
                        email_id: phone,
                        profile_pic: null,
                        "birthday": null,
                        "gender": null,
                        "city": null,
                        "state": null,
                        "country": null,
                        "is_email_verified": "Y"
                    }
                    setUser(user)
                } else {
                    throw new Error(res.data.message)
                }
            } else {
                const res = yield fetcher('GET', `?r=customer/phone-login-register&phone=${phone}`)
                if (res.data) {
                    setUser(res.data)
                } else {
                    throw new Error("Login failed!.")
                }
            }
        } catch (error) {
            // console.log(error);
            if (error?.response?.data?.message == 'Please enter your name for the sign up process!') {
                error.message = 'Please Register Before login!.'
            }
            setError(error.message)
        }
    })
}
function* onGetRegisterOtpStart() {
    yield takeLatest(userActionType.GET_REGISTER_OTP_START, function* ({ payload }) {
        const { state, storeId, setUserId, setError, setUser } = payload
        try {
            if (state.phone.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                const res = yield axios.get(`${process.env.NEXT_PUBLIC_PLINTO_NODE_URL}/customer/email-login-register?&emailId=${state.phone}&fullName=${state.name}&authType=SIGNUP&storeId=${storeId}`)
                console.log(res);
                if (res.data.status == 'success') {
                    setUserId(res.data.customerId)
                } else {
                    throw new Error(res.data.message)
                }
            } else {
                const res = yield fetcher('GET', `?r=customer/phone-login-register&phone=${state.phone}&name=${state.name}`)
                if (res.data && (typeof (res.data) == 'string' || typeof (res.data) == 'number')) {
                    setUserId(res.data)
                } else if (typeof (res.data) == 'object' && res.data?.customer_id) {
                    setUser(res.data)
                    setUserId(res.data?.customer_id)
                } else {
                    throw new Error("Registration failed!.")
                }
            }
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    })
}
function* onOtpVerificationStart() {
    yield takeLatest(userActionType.OTP_VERIFICATION_START, function* ({ payload }) {
        const { userId, storeId, otp, setError, setStatus, mode, setUser } = payload;
        try {
            if (mode == 'email') {
                const res = yield axios.get(`${process.env.NEXT_PUBLIC_PLINTO_NODE_URL}/customer/email-login-validate-otp?customerId=${userId}&otp=${otp}&storeId=${storeId}`)
                if (res.data.status == 'success') {
                    setUser(res.data.customerDetails)
                    setStatus(res.data.customerDetails.customer_id)
                } else {
                    throw new Error(res.data.message)
                }
            } else {
                const res = yield fetcher('GET', `?r=customer/verify-phone&customerId=${userId}&otp=${otp}&storeId=${storeId}`)
                if (res.data && (typeof (res.data) == 'string' || typeof (res.data) == 'number')) {
                    setStatus(res.data)
                } else {
                    throw new Error("Varification failed!.")
                }
            }
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    })
}


function* onLogoutStart() {
    yield takeLatest(userActionType.LOG_OUT_START, function* ({ payload }) {
        try {
            localStorage.clear();
            sessionStorage.clear();
            const cookies = document.cookie;
            for (var i = 0; i < cookies.split(";").length; ++i) {
                var myCookie = cookies[i];
                if (myCookie) {
                    var pos = myCookie.indexOf("=");
                    var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
            yield put(cleareUserStart());
            yield put(clearCheckout());
        } catch (error) {
            yield put(cleareUserStart());
            yield put(clearCheckout());
            console.log(error);
        }
    })
}


function* onGetAddressStart() {
    yield takeLatest(userActionType.GET_ADDRESS_START, function* ({ payload }) {
        const { userId, setError } = payload
        console.log(payload);
        try {
            const res = yield fetcher('GET', `?r=customer/get-address-book&customerId=${userId}`);
            if (res.data) {
                yield put(getAddressSuccess(res.data))
            }
        } catch (error) {
            // console.log(error);
            if (setError) {
                setError(error)
            }
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { getAddressStart(payload) }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to get addresses!", onOk: () => { return }, onOkName: "CLOSE" }))
            // }
            // yield put(autheError(error))
        }
    })
}

function* onAddAddressStart() {
    yield takeLatest(userActionType.ADD_ADDRESS_START, function* ({ payload }) {
        const { userId, address, setError } = payload;
        try {
            const res = yield fetcher('POST', `?r=customer/add-address&customerId=${userId}`, { customerAddressDetails: address })
            if (res.data) {
                yield put(getAddressStart({ userId, setError }))
            }
        } catch (error) {
            setError(error)
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to addaress!", onOk: () => { return }, onOkName: "CLOSE" }))
            // }
            // yield put(autheError(error))
        }
    })
}

function* onUpdateAddressStart() {
    yield takeLatest(userActionType.UPDATE_ADDRESS_START, function* ({ payload }) {
        const { userId, addressId, address, setError } = payload;
        console.log({ customerAddressDetails: address });
        try {
            const res = yield fetcher('POST', `?r=customer/update-address&addressId=${addressId}&customerId=${userId}`, { customerAddressDetails: address })
            console.log(res);
            if (res.data) {
                yield put(getAddressStart({ userId, setError }))
            }
        } catch (error) {
            setError(error)
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Updating address faield!", onOk: () => { return }, onOkName: "CLOSE" }))
            // }
            // yield put(autheError(error))
        }
    })
}

function* onRemoveAddressStart() {
    yield takeLatest(userActionType.REMOVE_ADDRESS_START, function* ({ payload }) {
        const { userId, addressId, address, setError } = payload;
        try {
            const res = yield fetcher('GET', `?r=customer/remove-address&customerId=${userId}&addressId=${addressId}`)
            if (res.data) {
                yield put(getAddressStart({ userId, setError }))
            }
        } catch (error) {
            setError(error)
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Operation faield!", onOk: () => { return }, onOkName: "CLOSE" }))
            // }
            // yield put(autheError(error))
        }
    })
}

export default function* userSagas() {
    yield all([call(onGetRegisterOtpStart), call(onGetLoginOtpStart), call(onOtpVerificationStart), call(onLogoutStart), call(onGetAddressStart), call(onAddAddressStart), call(onRemoveAddressStart), call(onUpdateAddressStart)])
}