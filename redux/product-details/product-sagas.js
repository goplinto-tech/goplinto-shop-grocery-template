import { take, put, call, fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import Router from 'next/router'
import productActionType from "./product-action-type";
import fetcher, { nodefetcher } from "../utility";
import {
    productDetailsFetchSuccess, similarProductFetchSuccess, errorOnProductDetailPage, getSpecificationsSuccess, getAdditionalInfoSuccess
} from "./product-actions";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";

// Product Details
function* onProductFetchStart() {
    yield takeLatest(productActionType.PRODUCT_DETAILS_FETCH_START, function* ({ payload }) {
        const { onSuccess, onFailure, id,seassion_id } = payload;
        try {
            const res = yield fetcher('GET', `?r=catalog/get-item-details&itemId=${id}&customerId=${seassion_id}`)
            yield put(productDetailsFetchSuccess(res.data))
            if (onSuccess) {
                onSuccess(res.data)
            }
        } catch (error) {
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to get product!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // }
            if (onFailure) {
                onFailure(error)
            }
        }
    })
}
// Similar Products
function* onSimilarProductFetchStart() {
    yield takeLatest(productActionType.SIMILAR_PRODUCT_FETCH_START, function* ({ payload }) {
        const { setSimilarProducts, id } = payload

        try {
            const res = yield nodefetcher('GET', `/widgets/get-related-items?item_id=${id}`);
            if (Array.isArray(res.data)) {
                yield put(similarProductFetchSuccess(res.data))
                setSimilarProducts(res.data)
            }
        } catch (error) {
            console.log(error);
            // if (error.message == 'Network Error') {
            //     yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            // } else {
            //     yield put(riseError({ name: error.name, message: "Unable to get similar product!", onOk: () => { return }, onOkName: "Close" }))
            // }
        }
    })
}

function* onGetSpecificationsStart() {
    yield takeLatest(productActionType.GET_PRODUCT_SPECIFICATINS_START, function* ({ payload }) {
        const { setSpecifications, id } = payload;
        try {
            const res = yield fetcher('GET', `?r=catalog/get-product-specifications&itemId=${id}`);
            if (Array.isArray(res.data)) {
                setSpecifications(res.data)
                // yield put(getSpecificationsSuccess(res.data))
            }
        } catch (error) {
            // console.log(error);
        }
    })
}

function* onGetAdditionalInfoStart() {
    yield takeLatest(productActionType.GET_PRODUCT_ADDITIONALINFO_START, function* ({ payload }) {
        const { setAdditionalInfo, id } = payload
        try {
            const res = yield fetcher('GET', `?r=catalog/get-product-additional-info&itemId=${id}`);
            if (Array.isArray(res.data)) {
                // yield put(getAdditionalInfoSuccess(res.data))
                setAdditionalInfo(res.data)
            }
        } catch (error) {
            // yield put(errorOnProductDetailPage(error))
        }
    })
}



export default function* productSaga() {
    yield all([call(onProductFetchStart), call(onSimilarProductFetchStart), call(onGetSpecificationsStart), call(onGetAdditionalInfoStart)])
}