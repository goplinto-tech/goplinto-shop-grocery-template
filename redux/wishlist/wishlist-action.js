import wishlistActionType from "./wishlist-action-type"
// GET
export const getWishlistStart = (data) => ({
    type: wishlistActionType.GET_WISHLIST_START,
    payload: data // {userId, storeId}
})
export const getWishlistSuccess = (item) => ({
    type: wishlistActionType.GET_WISHLIST_SUCCESS,
    payload: item
})
// ADD
export const addWishlistStart = (item) => ({
    type: wishlistActionType.ADD_WISHLIST_START,
    payload: item
})
export const addWishlistSuccess = (data) => ({
    type: wishlistActionType.ADD_WISHLIST_SUCCESS,
    payload: data
})
// REMOVE
export const removeWishlistStart = (data) => ({
    type: wishlistActionType.REMOVE_WISHLIST_START,
    payload: data
})
export const removeWishlistSuccess = (data) => ({
    type: wishlistActionType.REMOVE_WISHLIST_SUCCESS,
    payload: data
})
export const clareWishlist = () => ({
    type: wishlistActionType.CLEARE_WISHLIST,
})
// ERROR
export const wishlistError = (error) => ({
    type: wishlistActionType.WISHLIST_ERROR,
    payload: error
})