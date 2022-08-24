import Router from 'next/router'
import { takeLatest, all, call, put, delay } from "redux-saga/effects";
import fetcher, { nodefetcher } from "../utility";
import shopActionType from './shop-action-type'
import {
    getShopInfoSuccess, getShopSeoSuccess, getShopSettingsSuccess, getSocialProfileSuccess,
    getCategorySuccess, getSubCategorySuccess, getShopProductsSuccess, getSearchProductsSuccess, getSubCategoryStart,
    getShopDisplaySettingsSuccess,
    getPageCountSuccess,
    getBannerSuccess,
    getShopProductsPaginationSuccess,
    errorInGo,
    clearProductList,
    setShopWidgets,
    setStorePolicies
} from "./shop-action";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";

function* getShopInfoStart() {
    yield takeLatest(shopActionType.GET_SHOP_INFO_START, function* ({ payload }) {
        const { storeId, seassion_id } = payload
        try {
            if (!storeId.match(/^\d+$/)) {
                throw "Please provide valid storeid!.";
            }
            const res = yield fetcher('GET', `?r=stores/get-details&storeId=${storeId}&customerId=${seassion_id}`)
            if (!res.data) return;
            yield put(getShopInfoSuccess(res.data))
        } catch (error) {
            yield put(errorInGo(error))
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: error.message, onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // }
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
    yield takeLatest(shopActionType.GET_PAGE_COUNT_START, function* ({ payload }) {
        const { categoryId, storeId } = payload;
        try {
            const res = yield fetcher('GET', `?r=catalog/get-page-count&storeId=${storeId}${categoryId && 'categoryId=' + categoryId}`)
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
            yield put(errorInGo(error))
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to get store Settings!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // }
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
        const { storeId, page, setStatus, filterAndSortPayload, sortOrder = 'ASC', user,setFilterAndSortApplied } = payload;
        console.log("filter from saga", payload)
        try {
            const res = yield fetcher(`${filterAndSortPayload == undefined ? 'GET' : 'POST'}`, `?r=catalog/get-items&storeId=${storeId}${page ? `&pageNum=${page}` : "&pageNum=1"}${sortOrder != "false" ? sortOrder != undefined ? `&sortOrder=${sortOrder}` : "" : ""}${user ? `&customerId=${user.customer_id}` : ""}`, filterAndSortPayload)
            console.log("product res", res.data)

            if (Array.isArray(res.data)) {
                var available = res.data.filter(function (item) {
                    if (item.item_status == "AVAILABLE") {
                        return true
                    }
                }
                )
                if (page > 1 && typeof page != 'undefined') {
                    yield put(getShopProductsPaginationSuccess(available))
                } else {
                    yield put(getShopProductsSuccess(available))


                }
                setStatus('success')
                if(setFilterAndSortApplied){
                    setFilterAndSortApplied(false)
                }

            }


        } catch (error) {
            if (setStatus) setStatus('failed')
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
        const { storeId, categoryId, subCategoryId, page, setStatus, filterAndSortPayload, sortOrder, user,setFilterAndSortApplied } = payload //status == loading || failed || success
        try {
            // yield put(clearProductList());
            const query = `?r=catalog/get-items&storeId=${storeId}&categoryId=${categoryId}${subCategoryId ? `&subCategoryId=${subCategoryId}` : ''}${page ? `&pageNum=${page}` : ''}${sortOrder != "false" ? sortOrder != undefined ? `&sortOrder=${sortOrder}` : "" : ""}${user ? `&customerId=${user.customer_id}` : ""}`
            const res = yield fetcher(`${filterAndSortPayload == undefined ? 'GET' : 'POST'}`, query, filterAndSortPayload)
            if (Array.isArray(res.data)) {
                var available = res.data.filter(function (item) {
                    if (item.item_status == "AVAILABLE") {
                        return true
                    }
                }
                )
                if (page > 1 && typeof page != 'undefined') {
                    yield put(getShopProductsPaginationSuccess(available))
                } else {
                    yield put(getShopProductsSuccess(available))
                }
                // yield put(getShopProductsSuccess(res.data))
                if (setStatus) setStatus('success')
                if(setFilterAndSortApplied) setFilterAndSortApplied(false)
            }
        } catch (error) {
            console.log(error);
            if (setStatus) setStatus('failed')
        }
    })
}

function* onProductSerachStart() {
    yield takeLatest(shopActionType.GET_SEARCH_START, function* ({ payload }) {
        const { storeId, q, setSearchResult, setStatus, page,filterAndSortPayload, sortOrder, user,setFilterAndSortApplied  } = payload //status == loading || failed || success
        try {
            const res = yield fetcher('GET', `?r=catalog-search/search-items&storeId=${storeId}&searchKey=${q}${page ? `&pageNum=${page}` : "&pageNum=1"}${sortOrder != "false" ? sortOrder != undefined ? `&sortOrder=${sortOrder}` : "" : ""}${user ? `&customerId=${user.customer_id}` : ""}`)
            if (Array.isArray(res.data)) {
                var available = res.data.filter(function (item) {
                    if (item.item_status == "AVAILABLE") {
                        return true
                    }
                }
                )
                if (page > 1 && typeof page != 'undefined') {
                    yield put(getShopProductsPaginationSuccess(available))
                } else {
                    yield put(getShopProductsSuccess(available))


                }
                // setSearchResult(res.data)
                if (setStatus) {
                    setStatus('success')
                    
                }
                if(setFilterAndSortApplied){
                    setFilterAndSortApplied(false)
                }
            }
        } catch (error) {
            console.log(error);
            if (!!setStatus) { setStatus('failed') }
        }
    })
}

function* onGetFiltersGroup() {
    yield takeLatest(shopActionType.FETCH_FILTER_GROUPS, function* ({ payload }) {
        const { storeId, setFiltersGroup } = payload
        try {
            const res = yield fetcher('GET', `?r=catalog-search/get-filter-groups&storeId=${storeId}`);
            if (res.data) {
                setFiltersGroup(res.data)
            }

        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}
function* onGetBestSellerProduct() {
    yield takeLatest(shopActionType.GET_BEST_SELLER_PRODUCTS, function* ({ payload }) {
        const { storeId, setBestSellerProducts } = payload
        try {
            const res = yield nodefetcher('GET', `/store-widgets/get-best-sellers-by-store?storeId=${storeId}`);
            var available = res.data.filter(function (item) {
                if (item.item_status == "AVAILABLE") {
                    return true
                }
            }
            )
            if (available) {
                setBestSellerProducts(available)
            }

        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}
function* onGetNewArrivalProducts() {
    yield takeLatest(shopActionType.GET_NEW_ARRIVALS_PRODUCTS, function* ({ payload }) {
        const { storeId, setNewArrivalProducts } = payload
        try {
            const res = yield nodefetcher('GET', `/store-widgets/get-new-arrivals-by-store?storeId=${storeId}`);
            var available = res.data.filter(function (item) {
                if (item.item_status == "AVAILABLE") {
                    return true
                }
            }
            )
            if (res.data) {
                setNewArrivalProducts(available)
            }

        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}
function* onGetShopWidgets() {
    yield takeLatest(shopActionType.GET_SHOP_WIDGETS, function* ({ payload }) {
        try {
            const res = yield fetcher('GET', `?r=stores/get-all-widget-integrations&storeId=${payload}`);
            if(res.data){
                yield put(setShopWidgets(res.data))
            }

        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}
function* onGetStorePolicies() {
    yield takeLatest(shopActionType.GET_STORE_POLICIES, function* ({ payload }) {
        try {
            const res = yield nodefetcher('GET', `/store/get-policies?storeId=${payload}`);
            if(res.data){
                yield put(setStorePolicies(res.data.data))
            }

        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}

export default function* shopSagas() {
    yield all([call(getShopInfoStart), call(getShopSeoStart), call(getShopSettingsStart), call(onGetSocialProfileStart),
    call(onGetCategoriesStart), call(onGetSubCategoriesStart), call(onGetShopProductsStart), call(onGetCategoryProductsStart),
    call(onProductSerachStart), call(getShopDisplaySettingsStart), call(getShopPageCountStart), call(getShopBannerStart), call(onGetFiltersGroup), call(onGetBestSellerProduct), call(onGetNewArrivalProducts), call(onGetShopWidgets),call(onGetStorePolicies)
    ])
}