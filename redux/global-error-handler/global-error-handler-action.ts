import globalErrorActionType from "./global-error-handler-action-type";


interface riseError {
    name: String | undefined,
    message: String,
    Path: String | undefined,
    infor: String | undefined,
    show: Boolean | undefined,
    onOkName: String | undefined,
    onCancelName: String | undefined,
    onOk: Function | undefined,
    onCancel: Function | undefined,
}

export const riseError: Object = (error: riseError) => ({
    type: globalErrorActionType.RISE_NEW_ERROR,
    payload: error
})
export const removeError: Object = () => ({
    type: globalErrorActionType.REMOVE_LAST_ERROR,
})
export const clearError: Object = () => ({
    type: globalErrorActionType.CLEAR_ERROR,
})