import storeActionType from "./shop-action-type";
import { structureCat, insertSubcat } from "./utill";

const INITIAL_STATE = {
    // About store & settings

    info: null, // {}
    seo: null,// {}
    settings: null,// {}
    displaySettings: null,// {}
    socialProfile: [],
    isReadyToGo: false,// true || false
    banners: [],
    pageCount: 1,
    // About products
    products: [],
    categories: []
}

const isReady = ({ info, settings }) => {
    if (info && settings) return true;
    return false
}

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case storeActionType.GET_SHOP_INFO_SUCCESS:
            return {
                ...state,
                info: payload,
                isReadyToGo: isReady({ ...state, info: true })
            }

        case storeActionType.GET_SHOP_SEO_SUCCESS:
            return {
                ...state,
                seo: payload,
                // isReadyToGo: isReady({ ...state, seo: true })
            }
        case storeActionType.GET_SHOP_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: payload,
                isReadyToGo: isReady({ ...state, settings: true })
            }
        case storeActionType.GET_PAGE_COUNT_SUCCESS:
            return {
                ...state,
                pageCount: payload
            }
        case storeActionType.GET_BANNER_SUCCESS:
            return {
                ...state,
                banners: payload
            }
        case storeActionType.GET_SHOP_DISPLAY_SETTINGS_SUCCESS:
            return {
                ...state,
                displaySettings: payload,
                // isReadyToGo: isReady({ ...state, settings: true })
            }
        case storeActionType.GET_SEARCH_SUCCESS:
        case storeActionType.GET_CATEGORY_PRODUCTS_SUCCESS:
        case storeActionType.GET_SHOP_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload,
            }
        case storeActionType.GET_SHOP_SOCIAL_PROFILE_SUCCESS:
            return {
                ...state,
                socialProfile: [...payload]
            }
        case storeActionType.GET_SHOP_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: structureCat(payload)
            }
        case storeActionType.GET_SHOP_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: insertSubcat(state, payload)
            }

        default:
            return state;
    }
}

export default shopReducer;