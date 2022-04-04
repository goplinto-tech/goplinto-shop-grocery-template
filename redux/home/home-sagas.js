import { take, put, call, fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import fetcher from "../utility";
import homeActionType from "./home-action-type";

// Actions
import {
    productListFetchStart, productListFetchSuccess,
    bannersFetchStart, bannersFetchSuccess,
} from './home-action'



function* onHomePageFetchStart() { // Store Id
    yield takeLatest(homeActionType.HOME_PAGE_FETCH_START, function* ({ payload: id }) { // Store Id
        if (!id) return
        yield put(productListFetchStart(id));
        yield put(bannersFetchStart(id))
    })
}


function* onBannerFetchStart() {
    yield takeLatest(homeActionType.BANNERS_FETCH_START, function* ({ payload: id }) { // Store id
        try {
            const res = yield fetcher('GET', `?r=stores/get-banners&storeId=${id}`)
            yield put(bannersFetchSuccess(res.data))
        } catch (error) {
            console.log(error);
        }
    })
}
function* onProductListFetchStart() {
    yield takeLatest(homeActionType.PRODUCTS_LIST_FETCH_START, function* ({ payload: id }) { // Store id    
        try {
            const res = yield fetcher('GET', `?r=catalog/get-items&storeId=${id}`)
            yield put(productListFetchSuccess(res.data))
        } catch (error) {
            console.log(error);
        }
    })
}



// Home root sagas
export default function* homeSagas() {
    yield all([call(onHomePageFetchStart), call(onProductListFetchStart), call(onBannerFetchStart)])
}