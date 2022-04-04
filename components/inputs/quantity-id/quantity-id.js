/**
 * This button is use to alter quantity of items in cart   
 * @param {Number} value This is the current value that hold by button
 * @param {Function} onPlus A function that run on plush event
 * @param {Function} onMinus A funtion that run on minus event
 * @param {Boolean} disable A funtion that run on minus event
 * @returns Jsx component
 */
// import { useEffect, useState } from "react"
const QuantityID = ({ value = 0, onPlush, onMinus, disabled = false, disabledPlush = false, disabledMinus = false, h }) => {
    const onPlushHandler = () => {
        if (onPlush && !disabledPlush) {
            onPlush()
        }
    }
    const onMinusHandler = () => {
        if (onMinus && !disabledMinus) {
            onMinus()
        }
    }

    return (
        <div className="inline-block quantity-id relative" style={{
            ...disabled && { cursor: "not-allowed" }
        }} >
            <div className="flex justify-between items-center btn-border border-2 btn-bg-light h-10 sm:h-12 overflow-hidden rounded-md" style={{
                ...h && { height: h },
                opacity: disabled ? 0.5 : 1,
            }}>
                <button className="p-2 sm:p-3 btn-color-revese outline-none" onClick={onMinusHandler} disabled={disabledMinus} style={{
                    ...disabledMinus && {
                        opacity: 0.7,
                        cursor: "not-allowed"
                    },
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                    </svg></button>
                <div className="h-full bg-white flex items-center">
                    <span className="font-medium text-center px-3 align-middle w-10">{value}</span>
                </div>
                <button className="p-2 sm:p-3 btn-color-revese outline-none" onClick={onPlushHandler} disabled={disabledPlush} style={{
                    ...disabledPlush && {
                        opacity: 0.7,
                        cursor: "not-allowed"
                    },
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </button>
            </div>
            {disabled &&
                <div className="absolute top-0 bottom-0 left-0 right-0 btn-bg-light">
                </div>
            }
        </div>
    )
}
export default QuantityID;