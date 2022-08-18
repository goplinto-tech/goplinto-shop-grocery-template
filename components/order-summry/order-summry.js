import { useState } from 'react'
import { connect } from 'react-redux'
import { Button } from '@components/inputs'
import { Input } from '@components/inputs'
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

// Actions
import { applyCouponCodeStart, invalidCouponCodeApplied, removeCouponCode } from '@redux/checkout/checkout-action'
import { useEffect } from 'react';


const OrderSummry = ({ invalidCouponCodeApplied, invalidCouponExist, removeCouponCode, user, payWithWallet, customerWallet, userAddress, info, checkout, applyCouponCode, isDetailsLoading, isBillingHidden, isTab }) => {
    const purchaseDetails = checkout.purchaseDetails
    const [cpError, setCpError] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [success, setOnSuccess] = useState(null)

    const onCouponAppyHandler = () => {
        if (couponCode.length < 3) return;
        const order = Object.values(checkout.purchaseDetails.orders).find(item => item.storeId == info.store_id);
        const orderId = order?.orderId
        applyCouponCode({ purchaseId: checkout.purchase?.purchase_id, storeId: info.store_id, couponCode, orderId, userId: user.customer_id, onSuccess: setOnSuccess, onError: setCpError, couponInfo: checkout.couponInfo, setCouponCode })
        // setCouponCode("")
    }

    const removeCouponAppyHandler = () => {
        removeCouponCode({ orderId: Object.keys(checkout?.purchaseDetails?.orders), purchaseId: checkout.purchase?.purchase_id, setCouponCode })
    }

    useEffect(() => {
        setTimeout(function () {
            invalidCouponCodeApplied(null)
        }, 4000);
    }, [invalidCouponExist])

    return (
        <>
            {
                !isDetailsLoading ?
                    <div className="w-full">
                        <div className='mb-3 md:grid hidden grid-cols-6 space-x-2'>
                            <Input className=' border-static border col-span-4 rounded py-3' placeholder={'Coupon Code'} onChange={(e) => {
                                setCpError("");
                                setOnSuccess("")
                                setCouponCode(e.target.value)
                            }} value={couponCode} />

                            {
                                checkout?.couponInfo?.includes("successfully") ? <Button className=' col-span-2 rounded py-3 text-white btn-bg' onClick={removeCouponAppyHandler} >Remove</Button>
                                    :
                                    <Button className=' col-span-2 rounded py-3 text-white btn-bg' onClick={onCouponAppyHandler} >Apply</Button>
                            }
                        </div>
                        {checkout.couponInfo ?
                            checkout.couponInfo.includes("successfully") &&
                            <div className='mb-4 border-green-500 border rounded text-center text-green-600 bg-green-300 bg-opacity-20 py-3'>
                                {checkout.couponInfo}
                            </div>
                            // :
                            // <div className='mb-4 border-red-500 border rounded text-center text-red-600 bg-red-300 bg-opacity-20 py-3'>
                            //     {checkout.couponInfo}
                            // </div>
                            : ""
                        }
                        {invalidCouponExist &&
                            <div className='mb-4 border-red-500 border rounded text-center text-red-600 bg-red-300 bg-opacity-20 py-3'>
                                {invalidCouponExist}
                            </div>
                        }
                        {/* {
                            !!cpError &&
                            <div className='mb-4 border-red-500 border rounded text-center text-red-600 bg-red-300 bg-opacity-20 py-3'>
                                {cpError}
                            </div>
                        } */}
                        <div className="sm:mt-10  w-full">
                            <div className='flex justify-between'>
                                <h3 className="text-xl w-fit mb-5 font-semibold">
                                    Billing Details
                                    {!isBillingHidden ? <BsChevronCompactDown className='inline ml-2 sm:hidden'></BsChevronCompactDown> : <BsChevronCompactUp className='inline ml-2 sm:hidden'></BsChevronCompactUp>}
                                </h3>

                                {
                                    isBillingHidden &&
                                    <h3 className="text-lg w-fit mb-24 font-semibold">
                                        ₹{Number(
                                            purchaseDetails?.calculatedPurchaseTotal
                                        ).toFixed(2)}
                                    </h3>
                                }
                            </div>
                            {!!purchaseDetails && (
                                <>
                                    {!!purchaseDetails?.deliveryAddressDetails && purchaseDetails.isDelivery == 'Y' &&
                                        <div className='mb-4 sm:mb-6'>
                                            <span className='font-semibold text-sm sm:text-base'>Deliver to:{' '}</span>
                                            <span className=' font-extralight text-sm sm:text-base'>
                                                <span className="home">
                                                    {purchaseDetails?.deliveryAddressDetails?.address_line_1},{' '}
                                                    {purchaseDetails?.deliveryAddressDetails?.address_line_2}{' '}
                                                </span>
                                                <span className="state-pin">
                                                    {purchaseDetails?.deliveryAddressDetails?.city},{' '}
                                                    {purchaseDetails?.deliveryAddressDetails?.state}{' '}
                                                    {purchaseDetails?.deliveryAddressDetails?.country}{'-'}
                                                    {purchaseDetails?.deliveryAddressDetails?.zip_code},{' '}
                                                </span>
                                                <span className="country font-w-bold">
                                                    phone: +{purchaseDetails?.deliveryAddressDetails?.phone}
                                                </span>
                                            </span>
                                        </div>
                                    }
                                    <div className=" space-y-2 sm:space-y-3">
                                        <div className="flex justify-between space-x-2 ">
                                            <h6 className="text-lg font-medium text-gray-400">
                                                Item Total
                                            </h6>
                                            <div>
                                                <span className=" text-sm md:text-base lg:text-lg font-medium ml-2">
                                                    ₹
                                                    {Number(
                                                        purchaseDetails?.totalOrderAmount
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        {purchaseDetails?.totalDeliveryCharge != 0 && <div className="flex justify-between space-x-2  my-1">
                                            <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                Delivery Charge
                                            </h6>
                                            <div>
                                                <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                    {`₹ ${Number(purchaseDetails?.totalDeliveryCharge).toFixed(2)}`
                                                    }
                                                </span>
                                            </div>
                                        </div>}
                                        {/* <div className="flex justify-between space-x-2  my-1">
                                            <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                Delivery Charge
                                            </h6>
                                            <div>
                                                <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                    {purchaseDetails?.totalDeliveryCharge
                                                        ? `₹ ${Number(
                                                            purchaseDetails?.totalDeliveryCharge
                                                        ).toFixed(2)}`
                                                        : 'Free'}
                                                </span>
                                            </div>
                                        </div> */}

                                        <div className="flex justify-between space-x-2 my-1">
                                            <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                Tax
                                            </h6>
                                            <div>
                                                <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                    ₹
                                                    {Number(
                                                        purchaseDetails.totalTaxAmount
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        {purchaseDetails?.totalConvenienceCharge ? (
                                            <div className="flex justify-between space-x-2 my-1">
                                                <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                    Convenience Charge
                                                </h6>
                                                <div>
                                                    <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                        ₹
                                                        {Number(
                                                            purchaseDetails.totalConvenienceCharge
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null}
                                        {purchaseDetails?.totalCouponSavingsAmount ?
                                            (<div className="flex justify-between space-x-2 my-1">
                                                <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                    Coupon Applied
                                                </h6>
                                                <div>
                                                    <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                        ₹
                                                        {Number(
                                                            purchaseDetails.totalCouponSavingsAmount
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>) : null
                                        }
                                        {
                                            payWithWallet &&
                                            <div className="flex justify-between space-x-2 my-1">
                                                <h6 className=" text-sm md:text-base lg:text-lg  font-medium text-gray-400">
                                                    Deduction from Wallet
                                                </h6>
                                                <div>
                                                    <span className=" text-sm md:text-base lg:text-lg black-color font-medium ml-2">
                                                        - ₹{''}
                                                        {Number(
                                                            (customerWallet?.customer_wallet_balance) >= purchaseDetails?.calculatedPurchaseTotal ?
                                                                purchaseDetails?.calculatedPurchaseTotal
                                                                : +customerWallet?.customer_wallet_balance
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        <div className="flex justify-between space-x-2 my-1">
                                            <h6 className=" text-sm md:text-base lg:text-lg success-color font-medium text-gray-400">
                                                Discount
                                            </h6>
                                            <div>
                                                <span className=" text-sm md:text-base lg:text-lg success-color font-medium ml-2">
                                                    - ₹
                                                    {Number(
                                                        purchaseDetails.totalSavings
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2 border-t-2 border-solid pt-2">
                                            <h2 className=" text-sm md:text-base lg:text-lg font-bold">
                                                Total Amount
                                            </h2>
                                            <h2 className=" text-sm md:text-base lg:text-lg font-bold">
                                                ₹{' '}
                                                {Number(
                                                    payWithWallet ?
                                                        (customerWallet?.customer_wallet_balance) >= purchaseDetails?.calculatedPurchaseTotal ?
                                                            0
                                                            : purchaseDetails?.calculatedPurchaseTotal - (+customerWallet?.customer_wallet_balance)
                                                        : purchaseDetails?.calculatedPurchaseTotal
                                                ).toFixed(2)}
                                            </h2>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    : <div class="bg-white h-full rounded-2xl flex flex-col gap-5 select-none ">
                        <div class="flex flex-col flex-1 gap-5 sm:p-2">
                            <div class="flex flex-1 flex-col gap-6">
                                <div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
                                <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                                <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                                <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                                <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                            </div>
                            <div class="mt-auto flex gap-3 border-t-2 pt-4">
                                <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
                                <div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
                            </div>
                        </div>
                        <div class="bg-gray-200 w-full h-14 animate-pulse ml-auto mt-10" ></div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    info: state.store.info,
    user: state.user.currentUser,
    userAddress: state.user.address,
    checkout: state.checkout,
    isDetailsLoading: state.ui.isDetailsLoading,
    customerWallet: state.user.customerWallet,
    invalidCouponExist: state.checkout.invalidCouponExist
})
const mapDispatchToProps = (dispatch) => ({
    applyCouponCode: (payload) => dispatch(applyCouponCodeStart(payload)),
    removeCouponCode: (payload) => dispatch(removeCouponCode(payload)),
    invalidCouponCodeApplied: (payload) => dispatch(invalidCouponCodeApplied(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummry)