import { takeLatest, all, call, put } from "redux-saga/effects";
import fetcher from "../utility";
import searchActionType from "./search-action-type";


function* onSearchStart() { // We are not saving search data in redux, so pass setMethod in payload
    yield takeLatest(searchActionType.SEATCH_START, function* ({ payload }) {
        const { onSuccess, onError, q } = payload;
        try {

        } catch (error) {
            console.log(error);
            wishlistError(error)
        }
    })
}

export default function* searchSagas() {
    yield all([call(onSearchStart)])
}