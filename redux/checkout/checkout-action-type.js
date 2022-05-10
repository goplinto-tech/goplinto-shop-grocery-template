const checkoutActionType = {
    SET_DELVERY_ADDRESS: 'SET_DELVERY_ADDRESS',
    SET_DELVERY_ADDRESS_SUCCESS: 'SET_DELVERY_ADDRESS_SUCCESS',

    SET_SHIPMENT_METHOD: 'SET_SHIPMENT_METHOD',
    SET_SHIPMENT_METHOD_SUCCESS: 'SET_SHIPMENT_METHOD_SUCCESS',

    SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
    SET_PAYMENT_METHOD_SUCCESS: 'SET_PAYMENT_METHOD_SUCCESS',

    SET_BACKEND_CART_START: 'SET_BACKEND_CART_START',
    SET_BACKEND_CART_SUCCESS: 'SET_BACKEND_CART_SUCCESS',
    SET_BACKEND_CART_STORE_START: 'SET_BACKEND_CART_STORE_START',
    SET_BACKEND_CART_STORE_SUCCESS: 'SET_BACKEND_CART_STORE_SUCCESS',

    ADD_ITEM_TO_PUCHASE_START: 'ADD_ITEM_TO_PUCHASE_START',
    ADD_ITEM_TO_PUCHASE_SUCCESS: 'ADD_ITEM_TO_PUCHASE_SUCCESS',


    UPDATE_QUANTITY_TO_PUCHASE_START: 'UPDATE_QUANTITY_TO_PUCHASE_START',
    UPDATE_QUANTITY_TO_PUCHASE_SUCCESS: 'UPDATE_QUANTITY_TO_PUCHASE_SUCCESS',

    DELETE_FROM_PUCHASE_START: 'DELETE_FROM_PUCHASE_START',
    DELETE_FROM_PUCHASE_SUCCESS: 'DELETE_FROM_PUCHASE_SUCCESS',

    INITIATE_PAYMENT_START_START: 'INITIATE_PAYMENT_START_START',
    INITIATE_PAYMENT_START_SUCCESS: 'INITIATE_PAYMENT_START_SUCCESS',

    SET_CART_ERROR: 'SET_CART_ERROR',
    CLEARE_CART_ERROR: 'CLEAR_CART_ERROR',

    GET_PURCHASE_START: 'GET_PURCHASE_START',
    GET_PURCHASE_SUCCESS: 'GET_PURCHASE_SUCCESS',
    GET_PURCHASE_FAILURE: 'GET_PURCHASE_FAILURE',

    ORDER_PAYMENT_CONFIRM_START: 'ORDER_PAYMENT_CONFIRM_START',
    ORDER_PAYMENT_CONFIRM_SUCCESS: 'ORDER_PAYMENT_CONFIRM_SUCCESS',
    ORDER_PAYMENT_CONFIRM_ERROR: 'ORDER_PAYMENT_CONFIRM_ERROR',

    CREATE_NEW_RZP_ORDER_START: 'CREATE_NEW_RZP_ORDER_START',
    CREATE_NEW_RZP_ORDER_SUCCESS: 'CREATE_NEW_RZP_ORDER_SUCCESS',
    CREATE_NEW_RZP_ORDER_ERROR: 'CREATE_NEW_RZP_ORDER_ERROR',

    SET_ADDRESS_PURCHASEID_START: 'SET_ADDRESS_PURCHASEID_START',
    SET_ADDRESS_PURCHASEID_SUCCESS: 'SET_ADDRESS_PURCHASEID_SUCCESS',
    SET_DELIVERY_METHOD_PURCHASEID_START: 'SET_DELIVERY_METHOD_PURCHASEID_START',
    SET_DELIVERY_METHOD_PURCHASEID_SUCCESS: 'SET_DELIVERY_METHOD_PURCHASEID_SUCCESS',
    SET_PAYMENT_METHOD_PURCHASEID_START: 'SET_PAYMENT_METHOD_PURCHASEID_START',
    SET_PAYMENT_METHOD_PURCHASEID_SUCCESS: 'SET_PAYMENT_METHOD_PURCHASEID_SUCCESS',

    APPLY_COUPON_CODE_START: 'APPLY_COUPON_CODE_START',
    APPLY_COUPON_CODE_SUCCESS: 'APPLY_COUPON_CODE_SUCCESS',

    CLEARE_CHECKOUT: 'CLEARE_CHECKOUT',
}
export default checkoutActionType;