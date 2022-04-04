import Router from 'next/router'
import { takeLatest, all, call, put } from "redux-saga/effects";
import fetcher from "../utility";
import shopActionType from './shop-action-type'
import {
    getShopInfoSuccess, getShopSeoSuccess, getShopSettingsSuccess, getSocialProfileSuccess,
    getCategorySuccess, getSubCategorySuccess, getShopProductsSuccess, getSearchProductsSuccess, getSubCategoryStart,
    getShopDisplaySettingsSuccess,
    getPageCountSuccess,
    getBannerSuccess
} from "./shop-action";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";

function* getShopInfoStart() {
    yield takeLatest(shopActionType.GET_SHOP_INFO_START, function* ({ payload: storeId }) {
        try {
            if (!storeId.match(/^\d+$/)) {
                throw "Please provide valid storeid!.";
            }
            const res = yield fetcher('GET', `?r=stores/get-details&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getShopInfoSuccess(res.data))
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: error.message, onOk: () => { Router.reload() }, onOkName: "Reload" }))
            }
            // console.log(error);
        }
    })
}

function* getShopSeoStart() {
    yield takeLatest(shopActionType.GET_SHOP_SEO_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=stores/get-seo-details&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getShopSeoSuccess(res.data))
        } catch (error) {
            // console.log(error);
        }
    })
}

function* getShopBannerStart() {
    yield takeLatest(shopActionType.GET_BANNER_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=stores/get-banners&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getBannerSuccess(res.data))
        } catch (error) {
            // console.log(error);
        }
    })
}
function* getShopPageCountStart() {
    yield takeLatest(shopActionType.GET_PAGE_COUNT_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=catalog/get-page-count&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getPageCountSuccess(res.data))
        } catch (error) {
            // console.log(error);
        }
    })
}
function* getShopSettingsStart() {
    yield takeLatest(shopActionType.GET_SHOP_SETTINGS_START, function* ({ payload: storeId }) {
        try {
            if (!storeId.match(/^\d+$/)) {
                throw "Please provide valid storeid!.";
            }
            const res = yield fetcher('GET', `?r=stores/get-store-settings&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getShopSettingsSuccess(res.data))
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get store Settings!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            }
            // console.log(error);
        }
    })
}
function* getShopDisplaySettingsStart() {
    yield takeLatest(shopActionType.GET_SHOP_DISPLAY_SETTINGS_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=stores/get-store-display-settings&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getShopDisplaySettingsSuccess(res.data))
        } catch (error) {
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to get store Settings!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // }
            // console.log(error);
        }
    })
}

function* onGetSocialProfileStart() {
    yield takeLatest(shopActionType.GET_SHOP_SOCIAL_PROFILE_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=stores/get-social-accounts&storeId=${storeId}`)
            if (!res.data) return;
            yield put(getSocialProfileSuccess(res.data))
        } catch (error) {
            // console.log(error);
        }
    })
}

function* onGetCategoriesStart() {
    yield takeLatest(shopActionType.GET_SHOP_CATEGORY_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=catalog/get-categories&storeId=${storeId}`)
            if (Array.isArray(res.data)) {
                yield put(getCategorySuccess(res.data))
                yield put(getSubCategoryStart(storeId))
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get store categories!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            }
        }
    })
}

function* onGetSubCategoriesStart() {
    yield takeLatest(shopActionType.GET_SHOP_SUB_CATEGORY_START, function* ({ payload: storeId }) {
        try {
            const res = yield fetcher('GET', `?r=catalog/get-sub-categories&storeId=${storeId}`)
            if (Array.isArray(res.data)) {
                yield put(getSubCategorySuccess(res.data))
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get store categories!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            }
        }
    })
}

function* onGetShopProductsStart() {
    yield takeLatest(shopActionType.GET_SHOP_PRODUCTS_START, function* ({ payload }) {
        const { storeId, setStatus } = payload;
        try {
            const res = yield fetcher('GET', `?r=catalog/get-items&storeId=${storeId}`)
            if (Array.isArray(res.data)) {
                yield put(getShopProductsSuccess(res.data))
                setStatus('success')
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get store products!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            }
        }
    })
}

function* onGetCategoryProductsStart() {
    yield takeLatest(shopActionType.GET_CATEGORY_PRODUCTS_START, function* ({ payload }) {
        const { storeId, categoryId, subCategoryId, page, setStatus } = payload //status == loading || failed || success
        try {
            const query = `?r=catalog/get-items&storeId=${storeId}&categoryId=${categoryId}${subCategoryId && `&subCategoryId=${subCategoryId}`}${page && `&pageNum=${page}`}&sortOrder=ASC`
            const res = yield fetcher('GET', query)
            if (Array.isArray(res.data)) {
                yield put(getShopProductsSuccess(res.data))
                if (setStatus) setStatus('success')
            }
        } catch (error) {
            console.log(error);
            if (setStatus) setStatus('failed')
        }
    })
}

function* onProductSerachStart() {
    yield takeLatest(shopActionType.GET_SEARCH_START, function* ({ payload }) {
        const { storeId, q, setSearchResult, setStatus } = payload //status == loading || failed || success
        try {
            const res = yield fetcher('GET', `?r=catalog-search/search-items&storeId=${storeId}&searchKey=${q}`)
            console.log(res);
            if (Array.isArray(res.data)) {
                yield put(getSearchProductsSuccess(res.data))
                // setSearchResult(res.data)
                if (setStatus) setStatus('success')
            }
        } catch (error) {
            console.log(error);
            if (setStatus) setStatus('failed')
        }
    })
}


export default function* shopSagas() {
    yield all([call(getShopInfoStart), call(getShopSeoStart), call(getShopSettingsStart), call(onGetSocialProfileStart),
    call(onGetCategoriesStart), call(onGetSubCategoriesStart), call(onGetShopProductsStart), call(onGetCategoryProductsStart),
    call(onProductSerachStart), call(getShopDisplaySettingsStart), call(getShopPageCountStart), call(getShopBannerStart)
    ])
}