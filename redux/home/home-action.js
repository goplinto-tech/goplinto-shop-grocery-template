import homeActionType from "./home-action-type"

export const homePageFetchStart = (id) => ({
    type: homeActionType.HOME_PAGE_FETCH_START,
    payload: id
})
export const homePageFetchSuccess = (payload) => ({
    type: homeActionType.HOME_PAGE_FETCH_SUCCESS,
    payload
})

// 
// 
// 

export const bannersFetchStart = (id) => ({
    type: homeActionType.BANNERS_FETCH_START,
    payload: id
})
export const bannersFetchSuccess = (payload) => ({
    type: homeActionType.BANNERS_FETCH_SUCCESS,
    payload
})

export const productListFetchStart = (id) => ({
    type: homeActionType.PRODUCTS_LIST_FETCH_START,
    payload: id
})
export const productListFetchSuccess = (payload) => ({
    type: homeActionType.PRODUCTS_LIST_FETCH_SUCCESS,
    payload
})