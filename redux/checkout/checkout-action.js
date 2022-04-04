import checkoutActionType from "./checkout-action-type";

export const setDeliveryAddress = (address) => ({
    type: checkoutActionType.SET_DELVERY_ADDRESS,
    payload: address
})
export const setDeliveryAddressSuccess = (address) => ({
    type: checkoutActionType.SET_DELVERY_ADDRESS_SUCCESS,
    payload: address
})
export const setDeliveryAddressToPurchase = (payload) => ({
    type: checkoutActionType.SET_ADDRESS_PURCHASEID_START,
    payload: payload
})
export const setDeliveryAddressToPurchaseSuccess = (payload) => ({
    type: checkoutActionType.SET_ADDRESS_PURCHASEID_SUCCESS,
    payload: payload
})
export const setShipmentMethod = (method) => ({
    type: checkoutActionType.SET_SHIPMENT_METHOD,
    payload: method
})
export const setShipmentMethodSuccess = (method) => ({
    type: checkoutActionType.SET_SHIPMENT_METHOD_SUCCESS,
    payload: method
})
export const setPaymentMethod = (method) => ({
    type: checkoutActionType.SET_PAYMENT_METHOD,
    payload: method
})
export const setPaymentMethodSuccess = (method) => ({
    type: checkoutActionType.SET_PAYMENT_METHOD_SUCCESS,
    payload: method
})
// GET Purchage
export const getPurchageStart = (data) => ({
    type: checkoutActionType.GET_PURCHASE_START,
    payload: data
})
export const getPurchageSuccess = (data) => ({
    type: checkoutActionType.GET_PURCHASE_SUCCESS,
    payload: data
})

// Additem to purchase
export const addItemTopurchaseStart = (data) => ({
    type: checkoutActionType.ADD_ITEM_TO_PUCHASE_START,
    payload: data
})
export const addItemTopurchaseSuccess = (data) => ({
    type: checkoutActionType.ADD_ITEM_TO_PUCHASE_SUCCESS,
    payload: data
})

// Update Quantity to purchase
export const updateQuantityToPurchaseStart = (data) => ({
    type: checkoutActionType.UPDATE_QUANTITY_TO_PUCHASE_START,
    payload: data
})
export const updateQuantityToPurchaseSuccess = (data) => ({
    type: checkoutActionType.UPDATE_QUANTITY_TO_PUCHASE_SUCCESS,
    payload: data
})

// Delete From purchase
export const deleteFromPurchaseStart = (data) => ({
    type: checkoutActionType.DELETE_FROM_PUCHASE_START,
    payload: data
})
export const deleteFromPurchaseSuccess = () => ({
    type: checkoutActionType.DELETE_FROM_PUCHASE_SUCCESS,
})

// Backend Cart
export const setBackendCartStart = (data) => ({
    type: checkoutActionType.SET_BACKEND_CART_START,
    payload: data
})
export const setBackendCartSuccess = (data) => ({
    type: checkoutActionType.SET_BACKEND_CART_SUCCESS,
    payload: data
})
// INITIATE PAYMENT
export const initiateOrderPymentStart = (purchaseId) => ({
    type: checkoutActionType.INITIATE_PAYMENT_START_START,
    payload: purchaseId
})
export const initiateOrderPymentSuccess = (data) => ({
    type: checkoutActionType.INITIATE_PAYMENT_START_START,
    payload: data
})
// Confirm Order
export const orderPaymentConfirmStart = (purchaseId) => ({
    type: checkoutActionType.ORDER_PAYMENT_CONFIRM_START,
    payload: purchaseId
})
export const orderPaymentConfirmSuccess = (data) => ({
    type: checkoutActionType.ORDER_PAYMENT_CONFIRM_SUCCESS,
    payload: data
})
export const orderPaymentConfirmError = (error) => ({
    type: checkoutActionType.ORDER_PAYMENT_CONFIRM_SUCCESS,
    payload: error
})
// Apply Coupon
export const applyCouponCodeStart = (payload) => ({
    type: checkoutActionType.APPLY_COUPON_CODE_START,
    payload: payload
})
export const applyCouponCodeSuccess = (payload) => ({
    type: checkoutActionType.APPLY_COUPON_CODE_SUCCESS,
    payload: payload
})
// RZP Order
export const createNewRzpOrderStart = (payload) => ({
    type: checkoutActionType.CREATE_NEW_RZP_ORDER_START,
    payload: payload
})
export const createNewRzpOrderSuccess = (payload) => ({
    type: checkoutActionType.CREATE_NEW_RZP_ORDER_SUCCESS,
    payload: payload
})
//  CLear Check out
export const clearCheckout = () => ({
    type: checkoutActionType.CLEARE_CHECKOUT,
})

//  CLear Check out
export const getPurchaseFailure = () => ({
    type: checkoutActionType.GET_PURCHASE_FAILURE,
})















// // Delivery Address
// export const setDeliveryAddressToPurcheseStart = (data) => ({
//     type: checkoutActionType.SET_ADDRESS_PURCHASEID_START,
//     payload: data
// })
// export const setDeliveryAddressToPurcheseSuccess = (data) => ({
//     type: checkoutActionType.SET_ADDRESS_PURCHASEID_SUCCESS,
//     payload: data
// })
// // Delivery Method
// export const setDeliveryMethodToPurcheseStart = (data) => ({
//     type: checkoutActionType.SET_DELIVERY_METHOD_PURCHASEID_START,
//     payload: data
// })
// export const setDeliveryMethodToPurcheseSuccess = (data) => ({
//     type: checkoutActionType.SET_DELIVERY_METHOD_PURCHASEID_SUCCESS,
//     payload: data
// })
// // Payment Method
// export const setPaymentMethodToPurcheseStart = (data) => ({
//     type: checkoutActionType.SET_PAYMENT_METHOD_PURCHASEID_START,
//     payload: data
// })
// export const setPaymentMethodToPurcheseSuccess = (data) => ({
//     type: checkoutActionType.SET_PAYMENT_METHOD_PURCHASEID_SUCCESS,
//     payload: data
// })
