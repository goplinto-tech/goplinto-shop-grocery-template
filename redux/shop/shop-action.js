import shopActionType from './shop-action-type';
// Shop Info
export const getShopInfoStart = (storeId) => ({
    type: shopActionType.GET_SHOP_INFO_START,
    payload: storeId
})
export const getShopInfoSuccess = (storeInfo) => ({
    type: shopActionType.GET_SHOP_INFO_SUCCESS,
    payload: storeInfo
})
// Products
export const getShopProductsStart = (storeId) => ({
    type: shopActionType.GET_SHOP_PRODUCTS_START,
    payload: storeId
})
export const getShopProductsSuccess = (products) => ({
    type: shopActionType.GET_SHOP_PRODUCTS_SUCCESS,
    payload: products
})
//  SEO
export const getShopSeoStart = (storeId) => ({
    type: shopActionType.GET_SHOP_SEO_START,
    payload: storeId
})
export const getShopSeoSuccess = (seo) => ({
    type: shopActionType.GET_SHOP_SEO_SUCCESS,
    payload: seo
})
//  SETTINGS
export const getShopSettingsStart = (storeId) => ({
    type: shopActionType.GET_SHOP_SETTINGS_START,
    payload: storeId
})
export const getShopSettingsSuccess = (data) => ({
    type: shopActionType.GET_SHOP_SETTINGS_SUCCESS,
    payload: data
})
//  Display SETTINGS
export const getShopDisplaySettingsStart = (storeId) => ({
    type: shopActionType.GET_SHOP_DISPLAY_SETTINGS_START,
    payload: storeId
})
export const getShopDisplaySettingsSuccess = (settingd) => ({
    type: shopActionType.GET_SHOP_DISPLAY_SETTINGS_SUCCESS,
    payload: settingd
})
// SOCIAL PROFILE
export const getSocialProfileStart = (storeId) => ({
    type: shopActionType.GET_SHOP_SOCIAL_PROFILE_START,
    payload: storeId
})
export const getSocialProfileSuccess = (storeId) => ({
    type: shopActionType.GET_SHOP_SOCIAL_PROFILE_SUCCESS,
    payload: storeId
})

// CATEGORY
export const getCategoryStart = (storeId) => ({
    type: shopActionType.GET_SHOP_CATEGORY_START,
    payload: storeId
})
export const getCategorySuccess = (cat) => ({
    type: shopActionType.GET_SHOP_CATEGORY_SUCCESS,
    payload: cat
})
export const getSubCategoryStart = (storeId) => ({
    type: shopActionType.GET_SHOP_SUB_CATEGORY_START,
    payload: storeId
})
export const getSubCategorySuccess = (cat) => ({
    type: shopActionType.GET_SHOP_SUB_CATEGORY_SUCCESS,
    payload: cat
})
// Get Category Products
export const getCategoryProductsStart = (info) => ({
    type: shopActionType.GET_CATEGORY_PRODUCTS_START,
    payload: info
})
export const getCategoryProductsSuccess = (data) => ({
    type: shopActionType.GET_CATEGORY_PRODUCTS_SUCCESS,
    payload: data
})

// Get Search Products
export const getSearchProductsStart = (payload) => ({
    type: shopActionType.GET_SEARCH_START,
    payload: payload
})
export const getSearchProductsSuccess = (data) => ({
    type: shopActionType.GET_SEARCH_SUCCESS,
    payload: data
})
// Pge count
export const getPageCountStart = (payload) => ({
    type: shopActionType.GET_PAGE_COUNT_START,
    payload: payload
})
export const getPageCountSuccess = (data) => ({
    type: shopActionType.GET_PAGE_COUNT_SUCCESS,
    payload: data
})
//  Banner
export const getBannerStart = (payload) => ({
    type: shopActionType.GET_BANNER_START,
    payload: payload
})
export const getBannerSuccess = (data) => ({
    type: shopActionType.GET_BANNER_SUCCESS,
    payload: data
})