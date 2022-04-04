import { take, put, call, fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import checkoutActionType from "./checkout-action-type";
import fetcher from "../utility";
import Router from 'next/router'
import {
    setBackendCartStart,
    setBackendCartSuccess, setDeliveryAddressSuccess, setPaymentMethodSuccess, setShipmentMethodSuccess,
    orderPaymentConfirmStart, orderPaymentConfirmSuccess, orderPaymentConfirmError, getPurchageSuccess, getPurchageStart,
    createNewRzpOrderSuccess, getPurchaseFailure,
    clearCheckout,
} from './checkout-action'
import { clearCart } from "../cart/cart-actions";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";
// setDeliveryAddressToPurcheseSuccess, setDeliveryMethodToPurcheseSuccess, setPaymentMethodToPurcheseStart, setPaymentMethodToPurcheseSuccess } from "./checkout-action";

function* onSetBackendCartStart() {
    yield takeLatest(checkoutActionType.SET_BACKEND_CART_START, function* ({ payload }) {
        const { userId, groupId, data } = payload;
        try {
            const res = yield fetcher('POST', `?r=orders/add-items-to-cart&customerId=${userId}&groupId=${groupId}`, data)
            yield put(setBackendCartSuccess(res.data));
            yield put((getPurchageStart(res.data?.purchase_id)))
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { setBackendCartStart({ userId, groupId, data }) }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get cart products!", onOk: () => { return }, onOkName: "CLOSE" }))
            }
            // yield put(errorOnProductDetailPage(error))
        }
    })
}
function* onGetPurchageStart() {
    yield takeLatest(checkoutActionType.GET_PURCHASE_START, function* ({ payload }) {
        try {
            const res = yield fetcher('GET', `?r=orders/get-purchase&purchaseId=${payload}`)
            yield put(getPurchageSuccess(res.data))
        } catch (error) {
            console.log(error);
            yield put(getPurchaseFailure(error))
        }
    })
}
function* onSetDeliveryAddressToPurchese() {
    yield takeLatest(checkoutActionType.SET_ADDRESS_PURCHASEID_START, function* ({ payload }) {
        try {
            const { purchaseId, addressId } = payload;
            const res = yield fetcher('GET', `?r=orders/set-delivery-address-id&purchaseId=${purchaseId}&deliveryAddressId=${addressId}`)
            if (res.data) {
                yield put(setDeliveryAddressSuccess(res.data))
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ message: "Delivery address couldn't be set!", onOk: () => { return }, onOkName: "Close" }))
            }
            // yield put(errorOnProductDetailPage(error))
        }
    })
}

function* onSetDeliveryMethodToPurchese() {
    yield takeLatest(checkoutActionType.SET_SHIPMENT_METHOD, function* ({ payload }) {
        try {
            const { purchaseId, flag } = payload; // {flag : cod == N; pay Online == Y}
            const resSetParcel = yield fetcher('GET', `?r=orders/set-parcel&purchaseId=${purchaseId}&flagStatus=Y`)
            const resSetDelivery = yield fetcher('GET', `?r=orders/set-delivery&purchaseId=${purchaseId}&flagStatus=${flag}`)
            if (resSetDelivery.data && resSetParcel) {
                yield put(setShipmentMethodSuccess(true))
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ message: "Delivery method couldn't be set!", onOk: () => { return }, onOkName: "Close" }))
            }
            // yield put(errorOnProductDetailPage(error))
        }
    })
}

function* onPaymentMethodToPurchese() {
    yield takeLatest(checkoutActionType.SET_PAYMENT_METHOD, function* ({ payload }) {
        try {
            const { purchaseId, flag } = payload; // cod ==  N, Online Pay == Y
            const res = yield fetcher('GET', `?r=orders/set-convenience-flag&purchaseId=${purchaseId}&flagStatus=${flag}`)
            if (res.data) {
                yield put(setPaymentMethodSuccess(res.data))
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ message: "Payment Method couldn't be set!", onOk: () => { return }, onOkName: "Close" }))
            }
            // yield put(errorOnProductDetailPage(error))
        }
    })
}

function* onInitiatePayment() {
    yield takeLatest(checkoutActionType.INITIATE_PAYMENT_START_START, function* ({ payload }) {
        try {
            const { purchaseId, customerId, method, setInitiateStatus, setInitiateData } = payload; // cod ==  N, Online Pay == Y
            if (!purchaseId) {
                setStatus('failure')
                return
            };
            const res = yield fetcher('GET', `?r=orders/initiate-payment&purchaseId=${purchaseId}`)
            if (res.data) {
                // const amount = res.data.calculatedPurchaseTotal
                setInitiateData(res.data)
                setInitiateStatus('success')
                // if (method == 'COD') { // COD or Pay On Delivery
                //     yield put(orderPaymentConfirmStart({ amount, purchaseId, method, customerId }))
                // }
            }
        } catch (error) {
            console.log(error);
            // yield put(orderPaymentConfirmError(error))
            setInitiateStatus('failure')
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.back() }, onOkName: "GO Back" }))
            // } else {
            //     yield put(riseError({ message: "Unable to initiate payment!", onOk: () => { Router.back() }, onOkName: "Close" }))
            // }
        }
    })
}
function* onOrderConfirmPayment() {
    yield takeLatest(checkoutActionType.ORDER_PAYMENT_CONFIRM_START, function* ({ payload }) {
        const { purchaseId, method, customerId, amount, id, setStatus } = payload; // cod ==  N, Online Pay == Y
        console.log(payload);
        try {
            let res = {}
            if (method == 'COD') {
                res = yield fetcher('POST', `?r=orders/confirm-order-payments&purchaseId=${purchaseId}&method=${method}`, { customerId, amount })
            } else {
                res = yield fetcher('POST', `?r=orders/confirm-order-payments&purchaseId=${purchaseId}`, { customerId, amount, id })
            }
            if (res.data) {
                setStatus('success')
                yield put(orderPaymentConfirmSuccess(res.data))
            }
        } catch (error) {
            console.log(error);
            setStatus('failure')
            yield put(orderPaymentConfirmError(error))
        }
    })
}
function* onOrderConfirmPaymentSuccess() {
    yield takeLatest(checkoutActionType.ORDER_PAYMENT_CONFIRM_SUCCESS, function* ({ payload }) {
        // yield put(clearCart());
        // yield put(clearCheckout());
    })
}

function* onAddItemToPurchaseStart() {
    yield takeLatest(checkoutActionType.ADD_ITEM_TO_PUCHASE_START, function* ({ payload }) {
        const { purchaseId, groupId, customerId, storeId, itemId, orderId } = payload; // cod ==  N, Online Pay == Y
        try {
            const res = yield fetcher('GET', `?r=orders/add-item&groupId=${groupId}&storeId=${storeId}&purchaseId=${purchaseId}&itemId=${itemId}&quantity=1&orderId=${orderId}&customerId=${customerId}&clientId=011`)
            if (res.data) {
                yield put((getPurchageStart(purchaseId)))
                console.log('Update successfull');
            }
        } catch (error) {
            console.log(error);
            yield put((getPurchageStart(purchaseId)))
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "GO Back" }))
            } else {
                yield put(riseError({ message: "Operation failed!", onOk: () => { return }, onOkName: "Close" }))
            }
        }
    })
}

function* onUpdateQuantityStart() {
    yield takeLatest(checkoutActionType.UPDATE_QUANTITY_TO_PUCHASE_START, function* ({ payload }) {
        const { orderItemId, quantity, purchaseId } = payload; // cod ==  N, Online Pay == Y
        try {
            const res = yield fetcher('GET', `?r=orders/update-quantity&orderItemId=${orderItemId}&quantity=${quantity}`)
            if (res.data) {
                yield put((getPurchageStart(purchaseId)))
                console.log(res, 'Update successfull');
            }
        } catch (error) {
            console.log(error);
            yield put((getPurchageStart(purchaseId)))
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "GO Back" }))
            } else {
                yield put(riseError({ message: "Operation failed!", onOk: () => { return }, onOkName: "Close" }))
            }
        }
    })
}

function* onDeleteItemFromPurchaseStart() {
    yield takeLatest(checkoutActionType.DELETE_FROM_PUCHASE_START, function* ({ payload }) {
        const { orderItemId, purchaseId } = payload;
        try {
            const res = yield fetcher('GET', `?r=orders/delete-order-item&orderItemId=${orderItemId}`)
            if (res.data) {
                yield put((getPurchageStart(purchaseId)))
            }
        } catch (error) {
            // console.log(error);
            // yield put((getPurchageStart(purchaseId)))
            // yield put(orderPaymentConfirmError(error))
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            } else {
                yield put(riseError({ message: "Unable to initiate payment!", onOk: () => { return }, onOkName: "Close" }))
            }
        }
    })
}

function* onCreateNewRzpOrderStart() {
    yield takeLatest(checkoutActionType.CREATE_NEW_RZP_ORDER_START, function* ({ payload }) {
        const { purchaseId, totalPurchaseAmount, currency, setRzpOrder, setError } = payload;
        try {
            const res = yield fetcher('GET', `?r=orders/create-new-rzp-order&purchaseId=${purchaseId}&totalPurchaseAmount=${totalPurchaseAmount}&currency=${currency}`)
            if (res.data) {
                // yield put((createNewRzpOrderSuccess(res.data)))
                setRzpOrder(res.data)
            }
        } catch (error) {
            console.log(error);
            setError(error)
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.back() }, onOkName: "GO Back" }))
            // } else {
            //     yield put(riseError({ message: "Something went wrong. Please try again later!", onOk: () => { Router.back() }, onOkName: "Close" }))
            // }
        }
    })
}

function* onCouponCodeApplyStart() {
    yield takeLatest(checkoutActionType.APPLY_COUPON_CODE_START, function* ({ payload }) {
        const { purchaseId, storeId, couponCode, orderId, userId, onSuccess, onError } = payload;
        try {
            const res = yield fetcher('GET', `/?r=orders/validate-coupon&storeId=${storeId}&couponCode=${couponCode}&orderId=${orderId}&customerId=${userId}`)
            if (typeof res.data == 'object' && res.data?.status == "INVALID_COUPON_CODE") {
                onError(res.data.status)
            } else if (res.data) {
                yield put(getPurchageStart(purchaseId))
                onSuccess('Apllied Successfully!.')
            } else {
                onError('Operation Failed!.')
            }
        } catch (error) {
            console.log(error);
            onError(error.message)
            // yield put(orderPaymentConfirmError(error))
        }
    })
}

export default function* checkoutSagas() {
    yield all([call(onSetBackendCartStart), call(onGetPurchageStart), call(onSetDeliveryAddressToPurchese), call(onSetDeliveryMethodToPurchese),
    call(onPaymentMethodToPurchese), call(onInitiatePayment), call(onOrderConfirmPayment), call(onAddItemToPurchaseStart), call(onUpdateQuantityStart),
    call(onOrderConfirmPaymentSuccess), call(onDeleteItemFromPurchaseStart), call(onCreateNewRzpOrderStart), call(onCouponCodeApplyStart)
    ])
}