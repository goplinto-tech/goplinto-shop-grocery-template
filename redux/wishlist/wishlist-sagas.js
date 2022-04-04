import { takeLatest, all, call, put } from "redux-saga/effects";
import wishlistActionType from "./wishlist-action-type";

import fetcher from "../utility";
import { addWishlistSuccess, getWishlistSuccess, wishlistError } from "./wishlist-action";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";
import Router from 'next/router'


function* onWishlistItemAddStart() {
    yield takeLatest(wishlistActionType.ADD_WISHLIST_START, function* ({ payload }) {
        let { userId, storeId, id, variantId, item } = payload;
        if (!variantId) { variantId = null };
        try {
            const res = yield fetcher('GET', `?r=customer/add-item-to-wishlist&customerId=${userId}&storeId=${storeId}&itemId=${id}&variantItemId=${variantId}`);
            console.log(res);
            if (!res.data) throw "Adding to wishlist faild"
            yield put(addWishlistSuccess(item))
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            } else {
                yield put(riseError({ message: "Unable to add to wishlist!", onOk: () => { return }, onOkName: "Close" }))
            }
            // wishlistError(error)
        }
    })
}

function* onGetWishlistStart() {
    yield takeLatest(wishlistActionType.GET_WISHLIST_START, function* ({ payload }) {
        try {
            const { userId, storeId } = payload;
            const pageNum = payload?.pageNum | 1;
            if (!userId) return //throw "Login before adding to wishlist"
            const res = yield fetcher('GET', `?r=customer/get-wishlist-items&customerId=${userId}&pageNum=${pageNum}&storeId=${storeId}`);
            console.log(res);
            if (!res.data) throw "Fetching wishlist Failed"
            yield put(getWishlistSuccess(res.data))
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { return }, onOkName: "Close" }))
            } else {
                yield put(riseError({ message: "Unable to add to wishlist!", onOk: () => { return }, onOkName: "Close" }))
            }
            // console.log(error);
            // wishlistError(error)
        }
    })
}

export default function* wishlistSagas() {
    yield all([call(onWishlistItemAddStart), call(onGetWishlistStart)])
}