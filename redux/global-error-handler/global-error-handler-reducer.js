import globalErrorActionType from "./global-error-handler-action-type";

const INITIAL_STATE = {
    error: null,
    // {
    //     message :,
    //     Path: "",
    //     dsc : ""
    //     show : true,
    //     onOk : , Function
    //     onCancel :, Function
    // }
    show: false,
}
// Utility functions
const riseError = (error) => ({
    name: "",
    message: "",
    Path: "",
    dsc: "",
    show: true,
    onOkName: "",
    onOk: undefined,
    onCancelName: "",
    onCancel: undefined,
    ...error
})


const globalErrorReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case globalErrorActionType.RISE_NEW_ERROR:
            return {
                ...state,
                error: riseError(payload)
            }
        case globalErrorActionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default globalErrorReducer