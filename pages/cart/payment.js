import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link, { redirect } from '@components/link'
import { Button } from '@components/inputs'
import { Input } from '@components/inputs'

//crypto-js
import encHex from "crypto-js/enc-hex";
import cryptoJs from "crypto-js/core";
import pbkdf2 from "crypto-js/pbkdf2";
import encUtf8 from "crypto-js/enc-utf8";
import aes from "crypto-js/aes";

// Components
import CartItem from '@components/cart-item/cart-item'
import { Radio } from '@components/inputs'
import OnlienPayment from '@components/online-payment/online-payment'
import Loader from '@components/loading/loader'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import AddressForm from '@components/address-form/address-form'

// Actions
import { clearCart, deleteItemFromCart } from '@redux/cart/cart-actions'
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle, } from '@redux/user/user-action'
import {
    setBackendCartStart, getPurchageStart, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod,
    initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart, applyCouponCodeStart, removeCouponCode,
} from '@redux/checkout/checkout-action'
import CartList from '@components/cart-item/cart-list'
import OrderSummry from '@components/order-summry/order-summry'
import Stepper from '@components/stepper/stepper'
import { useMediaQuery } from 'react-responsive'
import withAuth from '@components/auth/withAuth'
import { getShopSettingsStart } from '@redux/shop/shop-action'

const Payment = ({ widgets, removeCouponCode, getShopSettings, customerWallet, user, userAddress, isDetailsLoading, displaySettings, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle, initiateOrder, clearCheckout, createNewRzpOrder, clearCart, deleteItemFromCart, applyCouponCode }) => {

    const purchaseDetails = checkout.purchaseDetails
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    const themeColor = displaySettings && (() => displaySettings.primary_color)() || '#F64B5D'
    const [mobNavHeight, setMobNavHeight] = useState(0)
    const [initiateData, setInitiateData] = useState(null) // For cod
    const [confirmPayment, setConfirmPayment] = useState(null) // For online
    const [initiateStatus, setInitiateStatus] = useState('pending') // pending, loading, failure
    const [error, setError] = useState(null)
    const [cpError, setCpError] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [success, setOnSuccess] = useState(null)
    const [rzpOrder, setRzpOrder] = useState(null)
    const [coupon, setcoupon] = useState('')
    const [payment, setpayment] = useState(false)
    const [active2, setactive2] = useState(false)
    const [confirmOrder, setConfirmOrder] = useState(false)
    const [paymentSummryHeight, setPaymentSummryHeight] = useState(100)
    const [isBillingHidden, setIsBillingHidden] = useState(true)
    const [razorpayKey, setRazorPayKey] = useState(null)
    const isTab = useMediaQuery({ minWidth: 640 })
    const [checkoutDetails, setcheckoutDetails] = useState({
        paymentMethod: '',
        walletPay: false
    })
    console.log('line', checkoutDetails, confirmOrder);
    if (!purchaseDetails) {
        redirect('/cart')
    }
    const onChangeHandler = (e) => {
        const { name, value, checked } = e.target
        if (name == 'walletPay' && checkoutDetails.paymentMethod == 'Y') {
            setcheckoutDetails({
                ...checkoutDetails,
                [name]: checked == checkoutDetails.walletPay ? !checked : checked,
            })
            return;
        }
        setcheckoutDetails({
            ...checkoutDetails,
            [name]: value,
            walletPay: false
        })
        if (checkout.purchase) {
            setPaymentMethod({
                purchaseId: checkout.purchase?.purchase_id,
                flag: value,
            })
        }
    }

    const onCouponAppyHandler = () => {
        if (couponCode.length < 3) return;
        const order = Object.values(checkout.purchaseDetails.orders).find(item => item.storeId == info.store_id);
        const orderId = order?.orderId
        applyCouponCode({ purchaseId: checkout.purchase?.purchase_id, storeId: info.store_id, couponCode, orderId, userId: user.customer_id, onSuccess: setOnSuccess, onError: setCpError, setCouponCode })
        // setCouponCode("")
    }

    const decryptRazorPayKey = (RZPAccessKey) => {
        console.log("widgets from", RZPAccessKey)
        var passphrase = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ENCRYPTION_PASSWORD;
        var encrypted = RZPAccessKey.ciphertext;
        var salt = encHex.parse(RZPAccessKey.salt);
        var iv = encHex.parse(RZPAccessKey.iv);
        var key = pbkdf2(passphrase, salt, {
            hasher: cryptoJs.algo.SHA1,
            keySize: 64 / 8,
            iterations: 999,
        });
        var decrypted = aes.decrypt(encrypted, key, { iv: iv });
        var decryptedString = decrypted.toString(encUtf8);
        console.log("widgets from dec", decryptedString)
        setRazorPayKey(decryptedString)
    }

    useEffect(() => {
        // console.log("widgets from payment",widgets)
        if (widgets != null) {
            if (widgets.RAZORPAY_INTEGRATION) {
                if (widgets.RAZORPAY_INTEGRATION.record_status == "ACTIVE") {
                    decryptRazorPayKey(widgets?.RAZORPAY_INTEGRATION?.integration_attributes?.RZPAccessKey)
                }
            }
        }
    }, [widgets])


    useEffect(() => {
        const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
        getShopSettings(storeId);
        if (user) {
            getAddress({ userId: user.customer_id })
        }
    }, [user])

    useEffect(() => {
        if (checkout.purchase?.purchase_id) {
            getPurchage(checkout.purchase?.purchase_id)
        }
    }, [])


    // Initial Payment function
    const initiatePayment = () => {

        if (info.store_status == "INACTIVE" || info.is_open_today == "N") {
            return;
        }
        if (!checkoutDetails.paymentMethod) return
        if (checkoutDetails.paymentMethod == "N" && !confirmOrder) {
            setConfirmOrder(true)
            return;
        }
        const orderId = Object.keys(purchaseDetails.orders)[0]
        const { purchase } = checkout
        const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? 'PAY' : 'COD'
        if (paymentMethod == 'COD' && purchase?.purchase_id) {
            setInitiateStatus('loading')
            initiateOrder({
                purchaseId: purchase?.purchase_id,
                method: paymentMethod,
                customerId: user.customer_id,
                setInitiateStatus,
                setInitiateData,
            })
        }
        if (paymentMethod == 'PAY' && purchase?.purchase_id) {
            if (checkoutDetails.walletPay) {
                console.log('Inside wallate pay');
                // Wallet payment
                if (confirmOrder) {
                    if (purchaseDetails?.calculatedPurchaseTotal - (+customerWallet?.customer_wallet_balance) > 0) {
                        setInitiateStatus('loading')
                        initiateOrder({
                            purchaseId: purchase?.purchase_id,
                            method: paymentMethod,
                            customerId: user.customer_id,
                            // setInitiateStatus,
                            setInitiateData,
                        })
                        createNewRzpOrder({
                            purchaseId: purchase?.purchase_id,
                            totalPurchaseAmount: purchaseDetails?.calculatedPurchaseTotal - (+customerWallet?.customer_wallet_balance),
                            currency: purchaseDetails?.currencyCode,
                            setRzpOrder,
                            setError,
                        })

                    }
                    else {
                        setInitiateStatus('loading')
                        initiateOrder({
                            purchaseId: purchase?.purchase_id,
                            method: paymentMethod,
                            customerId: user.customer_id,
                            setInitiateStatus,
                            setInitiateData,
                        })
                        // return;

                    }
                }
                else {
                    setConfirmOrder(true)
                    // setInitiateStatus('pending')
                    return;
                }

            }
            else {
                // Online payment
                setInitiateStatus('loading')
                initiateOrder({
                    purchaseId: purchase?.purchase_id,
                    method: paymentMethod,
                    customerId: user.customer_id,
                    // setInitiateStatus,
                    setInitiateData,
                })
                createNewRzpOrder({
                    purchaseId: purchase?.purchase_id,
                    totalPurchaseAmount: purchaseDetails?.calculatedPurchaseTotal,
                    currency: purchaseDetails?.currencyCode,
                    setRzpOrder,
                    setError,
                })
            }
        }
    }
    useEffect(() => {
        let encoded = ''
        console.log("from payment", initiateStatus, checkoutDetails.walletPay)
        if (initiateStatus == 'success' && checkoutDetails.walletPay) {
            const { purchase } = checkout
            const orderId = Object.keys(purchaseDetails.orders)[0]
            const amount = initiateData?.calculatedPurchaseTotal
            const { id } = confirmPayment || { id: "" }
            console.log('confirmPayment', confirmPayment);
            encoded = btoa(
                JSON.stringify({
                    amount,
                    purchaseId: purchase?.purchase_id,
                    method: 'ONL',
                    customerId: user.customer_id,
                    id: id,
                    useWalletAmount: true,
                    orderId,
                })
            )
            redirect(`/thank-you?id=${encoded}`)
            // clearCheckout()
            // clearCart()
        } else if (initiateStatus == 'success' && (initiateData || setConfirmPayment)) {
            // const orderId = Object.keys(initiateData.orders)[0]
            const orderId = Object.keys(purchaseDetails.orders)[0]
            const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? 'PAY' : 'COD'

            if (checkoutDetails.paymentMethod != 'Y') {
                // For cod
                const { purchase } = checkout
                const amount = initiateData?.calculatedPurchaseTotal
                encoded = btoa(
                    JSON.stringify({
                        amount,
                        purchaseId: purchase?.purchase_id,
                        method: paymentMethod,
                        customerId: user.customer_id,
                        orderId,
                    })
                )
            } else {
                const { amount, purchaseId, customerId, id } = confirmPayment
                encoded = btoa(
                    JSON.stringify({
                        amount,
                        purchaseId,
                        id: confirmPayment?.id,
                        method: paymentMethod,
                        customerId,
                        orderId,
                        amount
                    })
                )
            }
            // router.push(`/thank-you?id=${encoded}`)
            redirect(`/thank-you?id=${encoded}`)
        }
        return () => {
            if (initiateStatus == 'success' && (initiateData || setConfirmPayment)) {
                clearCheckout()
                clearCart()
            }
        }
    }, [initiateStatus, initiateData])
    useEffect(() => {
        if (error) {
            setInitiateStatus('pending')
        }
    }, [error])

    // looking navbar height
    useEffect(() => {
        // setError({ message: 'Store is closed for now.' })
        if (typeof window !== 'undefined') {
            const objerver = new ResizeObserver(function (e) {
                if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
                    const ele = document.getElementById('mob-navbar')
                    if (ele) {
                        if (ele.offsetWidth != mobNavHeight) {
                            // console.log(ele)
                            setMobNavHeight(ele.offsetHeight)
                        }
                    }
                }
            })
            objerver.observe(document.body)
        }
        const paymentSummry = document.getElementById('payment-summry');
        if (paymentSummry) {
            // setPaymentSummryHeight(paymentSummry.offsetHeight)
        }
    }, [])

    const steps = [{ lable: 'Delivery Address' },
    { lable: 'Add payment method' },
    { lable: 'Order placed' }
    ];
    const style = displaySettings ? {
        labelClass: 'text-xs font-normal text-white',
        compoleted: { color: displaySettings.secondary_color || '#F58634' },
        active: { color: '#E83B3B' },
        pending: { color: '#c5c5c5' },
        check: { color: '#fff' },
    } : {}

    const removeCouponAppyHandler = () => {
        removeCouponCode({ orderId: Object.keys(checkout?.purchaseDetails?.orders), purchaseId: checkout.purchase?.purchase_id, setCouponCode })
    }
    return (
        <>
            <div className="wrapper bg-[#f2f2f2] w-full ">
                <div className='h-[166px] flex justify-center items-center nav-bg w-full sm:hidden fixed sm:static inset-x-0 px-4 py-4  top-[0] z-[1001] bg-white sm:bg-transparent'>
                    <Stepper steps={steps} activeStep={checkoutDetails.paymentMethod ? 2 : 1} sx={style} />
                </div>
                <div className="w-full py-10 space-y-5 bg-white sm:bg-transparent mb-[100px] lg:mb-0">
                    <div className='px-4 mb-20 md:hidden grid grid-cols-6  space-x-1'>
                        <Input className=' border-static border col-span-4 rounded py-3' placeholder={'Coupon Code'} onChange={(e) => {
                            setCpError("");
                            setCouponCode(e.target.value)
                        }} value={couponCode} />
                        {
                            checkout?.couponInfo?.includes("successfully") ?
                                <Button className=' col-span-2 rounded py-3 text-white btn-bg' onClick={removeCouponAppyHandler} >Remove</Button>
                                :
                                <Button className=' col-span-2 rounded py-3 text-white btn-bg' onClick={onCouponAppyHandler} >Apply</Button>
                        }

                    </div>
                    <h3 className='text-2xl text-center sm:text-left font-semibold'>Payment Method</h3>
                    <div className='flex flex-col md:flex-row justify-between md:space-x-6'>
                        <div className={`space-y-16 w-full sm:pb-[0px!important] `} style={{ paddingBottom: paymentSummryHeight }}>
                            <div className={`space-y-5 `}>

                                <div className=" space-y-5 divide-y-2 sm:divide-y-0">
                                    {storeSettings?.is_payment_accepted == 'Y' && (
                                        <label
                                            className="p-5 sm:p-8 md:p-6 delivery-inputs bg-white rounded block w-full"
                                            htmlFor="online"
                                        >
                                            <div className="flex justify-between items-center">

                                                <div className=" md:pl-4">
                                                    <h3 className="font-semibold text-base block">
                                                        Online Payment
                                                    </h3>
                                                    <span className="block text-xs md:text-base black-color-75 tracking-tight">
                                                        (UPI, Credit/Debit cards, Wallet, Net banking)
                                                    </span>
                                                </div>
                                                <Radio
                                                    className="mr-"
                                                    id="online"
                                                    name="paymentMethod"
                                                    value="Y"
                                                    onChange={onChangeHandler}
                                                    checked={checkoutDetails.paymentMethod == 'Y'}
                                                />
                                            </div>
                                        </label>
                                    )}
                                    {storeSettings?.is_cod_accepted == 'Y' && (
                                        <div className=' relative'>
                                            <label
                                                className="p-5 sm:p-8 md:p-6 delivery-inputs bg-white rounded block w-full"
                                                htmlFor="cod"
                                            >
                                                <div className="flex justify-between items-center ">
                                                    <div className="md:pl-4">
                                                        <h3 className="font-semibold text-base block">
                                                            Cash On Delivery
                                                        </h3>
                                                        <span className="block text-xs sm:text-base black-color-75 tracking-tight">
                                                            (Cash, UPI)
                                                        </span>
                                                    </div>
                                                    <Radio
                                                        className="mr-2"
                                                        id="cod"
                                                        name="paymentMethod"
                                                        value="N"
                                                        onChange={onChangeHandler}
                                                        checked={checkoutDetails.paymentMethod == 'N'}
                                                    />
                                                </div>
                                                <span className="md:ml-4 sm:ml-0 text-xs red-color tracking-tighter">
                                                    Cash on delivery is not eligible for wallet
                                                    transactions
                                                </span>
                                            </label>
                                            <div className={checkoutDetails.walletPay && `rounded absolute inset-0 bg-[#d2d2d2] bg-opacity-75 cursor-not-allowed`} />

                                        </div>
                                    )}
                                    {console.log('fsdfsdf', +customerWallet?.customer_wallet_balance < checkout.purchaseDetails?.calculatedPurchaseTotal)}
                                    {storeSettings?.is_payment_accepted == 'Y' && (
                                        <div className={`p-5 md:p-0 flex justify-start items-center space-x-4 ${(checkoutDetails.paymentMethod != 'Y' || checkoutDetails.paymentMethod == '' || (+customerWallet?.customer_wallet_balance == 0)) && 'opacity-50'}`}>
                                            <input disabled={checkoutDetails.paymentMethod != 'Y' || (+customerWallet?.customer_wallet_balance == 0)} id='wallet' type="checkbox" name="walletPay" value={'walletPay'} checked={checkoutDetails.walletPay} onClick={onChangeHandler} />
                                            <label htmlFor='wallet'>
                                                <h4 className=''>Pay With Wallet</h4>
                                                <span className=' text-base'>Available Balance: <span className=' btn-color-revers'>₹ {+customerWallet?.customer_wallet_balance}</span></span>
                                            </label>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Billing Details >> */}
                        <div className='shrink-0 w-full md:w-5/12 xl:w-4/12'>
                            <div id='payment-summry' onClick={() => setIsBillingHidden(!isBillingHidden)} className={`bg-white p-4 sm:p-10 fixed sm:static bottom-[70px] inset-x-0 `} style={{ bottom: isBillingHidden ? -149 : 70 }}>
                                <OrderSummry payWithWallet={checkoutDetails.walletPay} isBillingHidden={isBillingHidden && !isTab} isTab={isTab} />
                            </div>
                            <div className='w-full flex fixed sm:static inset-x-0 justify-between items-center px-4 py-4 sm:py-0  bottom-[0] z-[1001] bg-white sm:bg-transparent'>
                                <Button className="w-full sm:w-3/4 sm:mx-auto px-14 sm:px-0 py-3  block sm:mt-10 sm:py-4 white-color rounded btn-bg text-center"
                                    disabled={!checkoutDetails.paymentMethod || isDetailsLoading}
                                    onClick={() => initiatePayment()}
                                >Place order</Button>
                            </div>
                        </div>
                        {/* << Billing details */}
                    </div>
                    {/* <Button type='link' href='/cart/address' className="hidden sm:block w-fit btn-color-revers text-lg py-1 px-6 border mt-4 btn-border">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>Back
                    </Button> */}
                </div>
            </div >
            {
                initiateStatus == 'loading' && !rzpOrder ?
                    <div className="fixed inset-0 left-0 bg-black-color-75 z-[1000]">
                        <div className="relative w-full h-full">
                            <div className="flex w-full flex-col justify-center sm:flex-row items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h5 className="white-color-75">We are processing your order </h5>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', display: 'block' }} width="75px" height="75px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
                                            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
                                        </circle> <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
                                            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s"></animate>
                                        </circle> <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
                                            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s"></animate>
                                        </circle> <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
                                            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s"></animate>
                                        </circle>
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                    : initiateStatus == 'loading' && rzpOrder && checkoutDetails.paymentMethod == 'Y' && (purchaseDetails?.calculatedPurchaseTotal - (+customerWallet?.customer_wallet_balance) > 0 && checkoutDetails.walletPay || (!checkoutDetails.walletPay && checkoutDetails.paymentMethod == 'Y'))
                        ? <OnlienPayment walletPay={checkoutDetails.walletPay} walletAmount={+customerWallet?.customer_wallet_balance} themeColor={themeColor}  {...{ store: info, user, checkout, setConfirmPayment, rzpOrder, setInitiateStatus, setError, razorpayKey }} />
                        : null
            }
            <div className='fixed right-0 bottom-36 sm:bottom-3 space-y-2'>
                {
                    !!error && <div className="py-4 px-8 cursor-pointer rounded-l-md bg-red-color white-color text-base font-medium" onClick={() => setError(null)}>
                        {error.message}
                    </div>
                }
                {
                    !!success && <div className="py-4 pfsdf px-8 cursor-pointer rounded-l-md bg-green-400 white-color text-base font-medium" onClick={() => setOnSuccess(null)}>
                        {success}
                    </div>
                }
            </div>
            {
                confirmOrder &&
                <div className="fixed inset-0 bg-slate-500 bg-opacity-50 z-[1001] " >
                    <div className=" absolute left-1/2 h-fit bottom-0 sm:bottom-auto sm:top-1/2 bg-white rounded-md w-full -translate-x-1/2 sm:-translate-y-1/2 p-6" style={{ maxWidth: "556px" }}>
                        <h2 className="text-center text-2xl btn-color-revers m-auto">Proceed?</h2>
                        <div className="py-4 text-center text-base font-medium w-full mb-6">
                            Confirm your Order
                        </div>
                        <div className="flex justify-between sm:space-x-4 space-x-2 pt-4 w-full text-white">
                            <Button className="py-3 w-full  font-semibold  btn-color-revers btn-border border-2  rounded transition-all " onClick={() => setConfirmOrder(false)}>Cancel</Button>
                            <Button className="py-3 w-full btn-bg btn-color  font-semibold border-2  rounded transition-all" onClick={() => { initiatePayment(); setConfirmOrder(false) }} >Confirm</Button>
                        </div>
                    </div>
                </div >
            }
        </>

    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    info: state.store.info,
    storeSettings: state.store.settings,
    displaySettings: state.store.displaySettings,
    user: state.user.currentUser,
    userAddress: state.user.address,
    isDetailsLoading: state.ui.isDetailsLoading,
    checkout: state.checkout,
    customerWallet: state.user.customerWallet,
    widgets: state.store.widgets,
})
const mapDispatchToProps = (dispatch) => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id)),
    getAddress: (id) => dispatch(getAddressStart(id)),
    updateAddress: (data) => dispatch(updateAddressStart(data)),
    addAddressStart: (data) => dispatch(addAddressStart(data)),

    setDeliveryAddressToPurchase: (id) => dispatch(setDeliveryAddressToPurchase(id)),
    setPaymentMethod: (data) => dispatch(setPaymentMethod(data)),
    setShipmentMethod: (data) => dispatch(setShipmentMethod(data)),

    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data)),
    clearCart: () => dispatch(clearCart()),
    deleteItemFromCart: (item) => dispatch(deleteItemFromCart(item)),
    applyCouponCode: (payload) => dispatch(applyCouponCodeStart(payload)),
    authToggle: () => dispatch(authShowToggle()),
    getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
    removeCouponCode: (payload) => dispatch(removeCouponCode(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(Payment)))