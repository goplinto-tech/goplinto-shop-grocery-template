import cartActionType from "./cart-action-type"

export const addToCart = (item) => ({
    type: cartActionType.ADD_TO_CART,
    payload: item
})
export const removeFromCart = (item) => ({
    type: cartActionType.REMOVE_FROM_CART,
    payload: item
})
export const deleteItemFromCart = (item) => ({
    type: cartActionType.DELETE_FROM_CART,
    payload: item
})
export const clearCart = () => ({
    type: cartActionType.CLEAR_CART,
})