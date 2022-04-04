import { put, call, all, takeLatest } from "redux-saga/effects";

import Reducstore from '../store'
import cartActionType from "./cart-action-type";

// Actions
import { getPurchageStart, setBackendCartStart, addItemTopurchaseStart, updateQuantityToPurchaseStart, deleteFromPurchaseStart } from "../checkout/checkout-action";

function* purchaseItemUpdator({ payload }) {
    const state = Reducstore.getState()
    const cart = state.cart;
    const purchase = state.checkout.purchase
    const purchaseDetails = state.checkout.purchaseDetails
    const user = state.user.currentUser;
    const store = state.store.info;
    // const cart = cartState();
    // const purchase = purchaseState();
    // const purchaseDetails = purchaseDetailsState();
    // const user = userState();
    // const store = storeState();
    if (!user || !store) return;
    const data = {
        [store.store_id]: [{
            item_id: payload.item_id,
            barcode_id: null,
            quantity: payload.quantity || 1,
            variant_item_id: payload.defaultVariantItem?.variant_item_id | null,
        }
        ]
    }
    if (!purchase) { // null => true
        // Create a purchase
        yield put(setBackendCartStart({ userId: user.customer_id, customerId: user.customer_id, groupId: store.group_id, data }))
    } else {
        if (purchaseDetails) {
            // Tasks 
            // 0. Check purchage Id exist to user
            // 1. Add or Remove New item
            // 2. Update Quantity if exist in order
            const orderId = purchase.orders[0][store.store_id].order_id;
            const isExist = Object.values(purchaseDetails.orders[orderId].orderItems).find((item) => item.itemId == payload.item_id) || null
            if (isExist) {
                const { quantity } = cart.find((item) => item.item_id == payload.item_id) || { quantity: 0 }
                const { orderItemId } = isExist;
                if (quantity) { // quantity > 0
                    yield put(updateQuantityToPurchaseStart({ quantity, orderItemId, purchaseId: purchase?.purchase_id }))
                } else {
                    yield put(deleteFromPurchaseStart({ quantity, orderItemId, purchaseId: purchase?.purchase_id }))
                }
            } else {
                const identity = { purchaseId: purchase.purchase_id, groupId: store.group_id, userId: user.customer_id, storeId: store.store_id, itemId: payload.item_id, orderId, customerId: user.customer_id, }
                yield put(addItemTopurchaseStart(identity))
            }
        }
    }

}


function* onAddToCartStart() {
    yield takeLatest(cartActionType.ADD_TO_CART, purchaseItemUpdator)
}
function* onRemoveFromCartStart() {
    yield takeLatest(cartActionType.REMOVE_FROM_CART, purchaseItemUpdator)
}
function* onDeleteFromCartStart() {
    yield takeLatest(cartActionType.DELETE_FROM_CART, purchaseItemUpdator)
}



// Cart root sagas
export default function* cartSagas() {
    yield all([call(onAddToCartStart),
    call(onRemoveFromCartStart),
    call(onDeleteFromCartStart)
    ]);
}



// [store.store_id]: [
//     ...cart.map(item => ({
//         item_id: item.item_id,
//         barcode_id: null,
//         quantity: item.quantity,
//         variant_item_id: item.defaultVariantItem?.variant_item_id | null,
//     }





