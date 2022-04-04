import searchActionType from "./search-action-type"

export const searchStart = (q) => ({
    type: searchActionType.SEATCH_START,
    payload: q
})
export const setSearchHandler = (payload) => ({
    type: searchActionType.SET_SEARCH_HANDLER,
    payload: payload
})