import searchActionType from "./search-action-type";

const INITIAL_STATE = {
    searchHandler: null, // function
    query: ""
}

const searchReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case searchActionType.SET_SEARCH_HANDLER:
            return {
                ...state,
                searchHandler: payload
            }

        default:
            return state
    }
}
export default searchReducer;