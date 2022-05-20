import { takeLatest, all, call, put } from "redux-saga/effects";
import wishlistActionType from "./wishlist-action-type";

import fetcher from "../utility";
import { addWishlistSuccess, getWishlistSuccess, wishlistError } from "./wishlist-action";
import { riseError } from "../global-error-handler/global-error-handler-action.ts";
import Router from 'next/router'
import { toast } from 'react-toastify';


function* onWishlistItemAddStart() {
    yield takeLatest(wishlistActionType.ADD_WISHLIST_START, function* ({ payload }) {
        console.log("add wishlist from saga")
        let { userId, storeId, id } = payload;
        // if (!variantId) { variantId = null };
        try {
            const res = yield fetcher('GET', `?r=customer/add-item-to-wishlist&customerId=${userId}&storeId=${storeId}&itemId=${id}`);
            console.log(res);
            if (res.data){
                toast.success("Added to Wishlist")
            }
            else{
                 throw "Adding to wishlist faild"
            }
            // yield put(addWishlistSuccess(item))
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
            const {userId,storeId,wishListedItem,setWishListedItem,page,setPage,setNoMore } = payload;
            // const pageNum = payload?.pageNum | 1;
            if (!userId) return //throw "Login before adding to wishlist"
            const res = yield fetcher('GET', `?r=customer/get-wishlist-items&customerId=${userId}&pageNum=${page}&storeId=${storeId}`);
            // console.log(res);
            // if(res.data){
            //     setWishListedItem(res.data.reverse())
            // }

            const { data } = res;

            if (data.length === 0 || data.length < 9) {
                setNoMore(false)
            }
            else {
                setPage(page + 1)
                setNoMore(true)
            }
            if (page == 1) {

                setWishListedItem(data)

            } else {
                setWishListedItem([...wishListedItem, ...data])
            }

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

function* onWishlistRemoveStart() {
    yield takeLatest(wishlistActionType.REMOVE_WISHLIST_START, function* ({ payload }) {
        try {
            const { wishlistId,wishListedItem,setWishListedItem } = payload;
            // if (!userId) return //throw "Login before adding to wishlist"
            const res = yield fetcher('GET', `?r=customer/delete-from-wishlist&wishlistId=${wishlistId}`);
            console.log(res);
            if(res.data){
                toast.success("Product Removed From Wishlist",{
                    autoClose: 2000
                })
                const remaining=wishListedItem.filter(item=>item.entry_id!=wishlistId)
                setWishListedItem(remaining)
            }
            // if (!res.data) throw "Fetching wishlist Failed"
            // yield put(getWishlistSuccess(res.data))
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
    yield all([call(onWishlistItemAddStart), call(onGetWishlistStart), call(onWishlistRemoveStart)])
}