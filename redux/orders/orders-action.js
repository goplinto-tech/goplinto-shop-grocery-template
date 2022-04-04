import ordersActionType from "./orders-action-type"

export const getOrderDetailsStart = (orderId) => ({
    type: ordersActionType.GET_ORDER_DETAILS_START,
    payload: orderId
})

export const getCurrentOrdersListStart = (payload) => ({
    type: ordersActionType.GET_CURRENT_ORDERS_LIST_START,
    payload: payload
})

export const getPastOrdersListStart = (payload) => ({
    type: ordersActionType.GET_PAST_ORDERS_LIST_START,
    payload: payload
})

export const getCurrentOrdersListSuccess = (payload) => ({
    type: ordersActionType.GET_CURRENT_ORDERS_LIST_SUCCESS,
    payload: payload
})