import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { connect } from "react-redux"
import Link, { redirect } from "@components/link"
import { Button } from "@components/inputs"

// Components
import CartItem from "@components/cart-item/cart-item";
import { Radio } from "@components/inputs";
import OnlienPayment from "@components/online-payment/online-payment"
import Loader from "@components/loading/loader"

// Actions
import { clearCart } from "@redux/cart/cart-actions"
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle } from "@redux/user/user-action"
import { setBackendCartStart, getPurchageStart, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart } from '@redux/checkout/checkout-action'
import PageWrapper from "@components/page-wrapper/page-wrapper"

const Cart = ({ user, userAddress, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle,
    initiateOrder, clearCheckout, createNewRzpOrder, clearCart }) => {
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    const purchaseDetails = checkout.purchaseDetails;
    const [mobNavHeight, setMobNavHeight] = useState(0)
    const [initiateData, setInitiateData] = useState(null) // For cod
    const [confirmPayment, setConfirmPayment] = useState(null) // For online
    const [initiateStatus, setInitiateStatus] = useState('pending') // pending, loading, failure
    const [error, setError] = useState(null)
    const [rzpOrder, setRzpOrder] = useState(null)
    const [enablePayment, setEnablePayment] = useState(false)
    const [checkoutDetails, setcheckoutDetails] = useState({
        // deliveryAddress: userAddress.length ? userAddress[0]?.address_id : null,
        deliveryAddress: null,
        deliveryMethod: "",
        paymentMethod: '',
    })
    const router = useRouter();
    useEffect(() => { // Get Purchase Id
        if (!cart.length) return;
        // Do nothing if don't have storeId and user 
        if (!info || !user) return;
        const data = {
            [info.store_id]: [
                ...cart.map(item => ({
                    item_id: item.item_id,
                    barcode_id: null,
                    quantity: item.quantity,
                    variant_item_id: item.defaultVariantItem?.variant_item_id | null,
                }))
            ]
        }
        //  Creating browsercart 
        if (!checkout.purchase) {
            setBackendCart({ userId: user.customer_id, groupId: info.group_id, data })
        }

        // Setting default details
        if (checkout.purchase) {
            setPaymentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: checkoutDetails.paymentMethod });
        }
        if (checkout.purchase) {
            setShipmentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: checkoutDetails.deliveryMethod });
        }
    }, [user, checkout.purchase, info])
    // useEffect(() => {
    //     if (checkoutDetails.deliveryAddress && checkout.purchase) {
    //         setDeliveryAddressToPurchase({ purchaseId: checkout.purchase?.purchase_id, addressId: checkoutDetails.deliveryAddress })
    //     }
    //     console.log();
    // }, [userAddress])

    useEffect(() => {
        if (user) {
            getAddress({ userId: user.customer_id })
        }
    }, [user])

    useEffect(() => {
        if (checkout.purchase?.purchase_id) {
            getPurchage(checkout.purchase?.purchase_id)
        }
    }, [])

    // Change function to chagen address payment and shipment methods
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(checkoutDetails);
        setcheckoutDetails({
            ...checkoutDetails,
            [name]: value
        })
        if (name == 'deliveryAddress' && checkout.purchase) {
            setDeliveryAddressToPurchase({ purchaseId: checkout.purchase?.purchase_id, addressId: value })
        }
        if (name == 'paymentMethod' && checkout.purchase) {
            setPaymentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: value });
        }
        if (name == 'deliveryMethod' && checkout.purchase) {
            setShipmentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: value });
        }

    }
    useEffect(() => {
        const { deliveryAddress, deliveryMethod, paymentMethod } = checkoutDetails;
        setEnablePayment((() => {
            let [d, p] = [false, false]
            if ((deliveryMethod == 'Y' && deliveryAddress) || deliveryMethod == 'N') {
                d = true
            } else {
                d = false
            }
            if (paymentMethod) {
                p = true;
            } else {
                p = false;
            }
            return d && p
        })())
    }, [checkoutDetails])

    // Initial Payment function
    const initiatePayment = () => {
        if (!enablePayment) return;
        const orderId = Object.keys(purchaseDetails.orders)[0]
        const { purchase } = checkout
        const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? "PAY" : "COD";
        if (paymentMethod == 'COD' && purchase?.purchase_id) {
            setInitiateStatus('loading')
            initiateOrder({ purchaseId: purchase?.purchase_id, method: paymentMethod, customerId: user.customer_id, setInitiateStatus, setInitiateData });
        }
        if (paymentMethod == 'PAY' && purchase?.purchase_id) {
            setInitiateStatus('loading')
            createNewRzpOrder({ purchaseId: purchase?.purchase_id, totalPurchaseAmount: purchaseDetails?.calculatedPurchaseTotal, currency: purchaseDetails?.currencyCode, setRzpOrder, setError })

        }
    }
    useEffect(() => {
        if (initiateStatus == 'success' && (initiateData || setConfirmPayment)) {
            // const orderId = Object.keys(initiateData.orders)[0]
            const orderId = Object.keys(purchaseDetails.orders)[0]
            const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? "PAY" : "COD";
            let encoded = ""
            if (initiateData) {
                const { purchase } = checkout
                const amount = initiateData.calculatedPurchaseTotal
                encoded = btoa(JSON.stringify({ amount, purchaseId: purchase?.purchase_id, method: paymentMethod, customerId: user.customer_id, orderId }))
            } else {
                const { amount, purchaseId, customerId, id } = confirmPayment
                encoded = btoa(JSON.stringify({ amount, purchaseId, id, method: paymentMethod, customerId, orderId }))
            }
            // router.push(`/thank-you?id=${encoded}`)
            redirect(`/thank-you?id=${encoded}`)
        }
        return () => {
            if (initiateStatus == 'success' && (initiateData || setConfirmPayment)) {
                clearCheckout();
                clearCart();
            }
        }
    }, [initiateStatus])
    useEffect(() => {
        if (error) {
            setInitiateStatus('pending')
        }
    }, [error])


    // looking navbar height
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const objerver = new ResizeObserver(function (e) {
                if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
                    const ele = document.getElementById('mob-navbar')
                    if (ele) {
                        if (ele.offsetWidth != mobNavHeight) {
                            console.log(ele);
                            setMobNavHeight(ele.offsetHeight)
                        }

                    }
                }
            });
            objerver.observe(document.body)
        }
    }, [])

    if (!info) { // If store details are not awilable
        return <Loader />
    }
    if (!cart.length) {
        return (
            <>
                <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                    <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </button>
                    <span className='text-base font-semibold'>My Caer</span>
                </div>
                <div className="flex justify-center items-center empty-cart" style={{ minHeight: '80vh' }}>
                    <div className="h-64 w-64 text-center flex justify-center items-center" style={{ borderRadius: '50%', background: 'rgba(246, 75, 93, 0.13)', boxShadow: 'rgb(246 75 93 / 13%) 0px 0px 100px 100px' }}>
                        <h4>Your Cart is Empty,
                            <span className="red-color">
                                <Link href='/'> Shop now!</Link>
                            </span>
                        </h4>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
                <span className='text-base font-semibold'>My Cart</span>
            </div>
            <section className="bg-black-color-lighter cart relative pb-16">
                <div className="wrapper mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-6 2xl:gap-10">
                        <div className="w-full lg:col-span-7 xl:col-span-8 col-auto ">
                            <div className="w-full bg-white rounded">
                                <div className="px-3 py-10 sm:px-10 border-b-2">
                                    <h2>Review your order</h2>
                                </div>
                                <div className="flex px-3 sm:px-10 pt-10 justify-between">
                                    <div className="flex items-center">
                                        {/* <div className="h-10 w-10 ">
                                            <img className="w-full h-full rounded" src="https://dsa0i94r8ef09.cloudfront.net/264/assets/60cc53e3a47e4_paneer exotic pizza.png" alt="..." />
                                        </div>
                                        <h4 className="text-xl inline ml-4">Pazha Mudhir Cholai</h4> */}
                                    </div>
                                    <span className="text-base font-medium black-color-75">{totalItems} items</span>
                                </div>
                                {/* cart Item list */}
                                <div className="p-3 py-6 md:py-6 sm:p-6 md:p-10 flex flex-col space-y-4 sm:space-y-8 divide-y sm:divide-y-0">
                                    {
                                        cart.map((item, i) => (
                                            <div className="pt-4 sm:pt-0">
                                                <CartItem data={item} key={i} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                !!purchaseDetails &&
                                <>
                                    {/* Delivery method */}
                                    <div className="w-full mt-10 px-3 py-10 sm:px-10 bg-white rounded">
                                        <div className="">
                                            <h2>Delivery Method</h2>
                                        </div>
                                        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 divide-y sm:divide-y-0 ">
                                            {
                                                storeSettings.is_delivery_available == 'Y' &&
                                                <div className="">
                                                    <label className="sm:p-8 delivery-inputs border-color  border-dashed sm:border-2 rounded block w-full" htmlFor="delivery">
                                                        <Radio id='delivery' name='deliveryMethod' value={'Y'} onChange={onChangeHandler} checked={checkoutDetails.deliveryMethod == 'Y'} />
                                                        <span className="ml-4 font-semibold text-base">Delivery</span>
                                                    </label>
                                                </div>
                                            }
                                            {
                                                storeSettings.is_parcel_available == 'Y' &&
                                                <div className="pt-4 sm:pt-0">
                                                    <label className="sm:p-8 delivery-inputs border-color  border-dashed sm:border-2 rounded block w-full" htmlFor="pickup">
                                                        <Radio id='pickup' name='deliveryMethod' value={'N'} onChange={onChangeHandler} checked={checkoutDetails.deliveryMethod == 'N'} />
                                                        <span className="ml-4 font-semibold text-base">Self Pick Up</span>
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                        <div className="pt-10 w-full">
                                            {
                                                checkoutDetails.deliveryMethod == 'N' &&
                                                <div className="">
                                                    <h2>Delivery Pickup Address</h2>
                                                    <div className="py-6">
                                                        {
                                                            storeSettings &&
                                                            <p className="text-base ">
                                                                {storeSettings.pickupPointDetails.pickup_point_name}, {storeSettings.pickupPointDetails.address}, {storeSettings.pickupPointDetails.city},{' '}
                                                                <br />
                                                                {storeSettings.pickupPointDetails.state}, {storeSettings.pickupPointDetails.country}, <br /> Pin: {storeSettings.pickupPointDetails.zip_code}

                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                            }{
                                                checkoutDetails.deliveryMethod == 'Y' && <>
                                                    <div className="">
                                                        <h2>Choose Delivery Address</h2>
                                                    </div>
                                                    <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                                                        {
                                                            userAddress.map((item, i) => (
                                                                <div className="address flex h-full" key={i}>
                                                                    <div className="p-0 sm:p-8 delivery-inputs border-color border-dashed sm:border-2 rounded block w-full" >
                                                                        <Radio className='hidden' id={`address${i}`} name='deliveryAddress' checked={checkoutDetails.deliveryAddress == item.address_id} value={item.address_id} onChange={onChangeHandler} />
                                                                        <div className="flex">
                                                                            <div className="btn-color-revers">
                                                                                {
                                                                                    item.address_tag == 'Home' ?
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: 'inherit' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                                        </svg>
                                                                                        : <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'inherit' }} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                                        </svg>
                                                                                }
                                                                            </div>
                                                                            <div className="ml-2 w-full">
                                                                                <h3 className="text-xl font-semibold">{item.address_tag}</h3>
                                                                                <div className="my-4">
                                                                                    <span className="home">{item.address_line_1}, {item.address_line_2}</span>
                                                                                    <span className="state-pin">{item.city}, {item.state} {item.zip_code},</span>
                                                                                    <span className="country">{item.country},</span>
                                                                                    <span className="country font-w-bold">+91 {item.phone}</span>
                                                                                </div>
                                                                                <button className="btn-color-revese my-2">Edit</button>
                                                                                {
                                                                                    checkoutDetails.deliveryAddress != item.address_id &&
                                                                                    <label className="block my-2 btn-bg btn-color py-3.5 px-8 rounded max-w-fit" htmlFor={`address${i}`} >Deliver Here</label>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className=" py-6">
                                                            <Button className="flex items-center btn-color-revese" type="link" href="/account/savedplaces">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span>Add New Address</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    {/* Payment options */}
                                    <div className="w-full px-3 mt-10 py-10 sm:px-10 bg-white rounded">
                                        <div className="">
                                            <h2>Choose Payment Option </h2>
                                        </div>
                                        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 divide-y sm:divide-y-0 ">
                                            {
                                                storeSettings?.is_payment_accepted == 'Y' &&
                                                <div className="">
                                                    <label className="sm:p-8 delivery-inputs border-color border-dashed sm:border-2 rounded block w-full" htmlFor="online">
                                                        <div className="flex">
                                                            <Radio className='mt-2' id='online' name='paymentMethod' value="Y" onChange={onChangeHandler} checked={checkoutDetails.paymentMethod == 'Y'} />
                                                            <div className="pl-4">
                                                                <h3 className="font-semibold text-base block">Online Payment</h3>
                                                                <span className="block text-base black-color-75 tracking-tight">( UPI, Credit/Debit cards, Wallet, Net banking )</span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            }
                                            {
                                                storeSettings?.is_cod_accepted == 'Y' &&
                                                <div className="pt-4 sm:pt-0">
                                                    <label className="sm:p-8 delivery-inputs border-color border-dashed sm:border-2 rounded block w-full" htmlFor="cod">
                                                        <div className="flex">
                                                            <Radio className='mt-2' id='cod' name='paymentMethod' value="N" onChange={onChangeHandler} checked={checkoutDetails.paymentMethod == 'N'} />
                                                            <div className="pl-4">
                                                                <h3 className="font-semibold text-base block">Cash On Delivery</h3>
                                                                <span className="block text-base black-color-75 tracking-tight">( Cash, UPI)</span>
                                                            </div>
                                                        </div>
                                                        <span className="ml-8 sm:ml-0 text-xs red-color tracking-tighter">Cash on delivery is not eligible for wallet transactions</span>
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {/* Invoice section */}
                        <div className="w-full col-span-auto lg:col-span-5 xl:col-span-4 ">
                            {
                                !!user &&
                                <>
                                    <div className="bg-white">
                                        <div className="px-2 py-10 sm:px-10 border-b-2 rounded">
                                            <h2>Promo / Gift Code</h2>
                                        </div>
                                        <div className="w-full p-10 flex justify-between items-baseline space-x-2">
                                            <input type="text" className="text-lg font-medium w-full border-b-2 focus:outline-none focus:border-b-2 " placeholder="Have any Promo Code?" />
                                            <button className="py-2 btn-color rounded px-4 text-base btn-bg ">Apply</button>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="mt-10 pb-10 bg-white rounded">
                                            <div className="px-3 py-10 sm:px-10 border-b-2 rounded">
                                                <h2>Invoice</h2>
                                            </div>
                                            {
                                                !!purchaseDetails &&
                                                <>
                                                    <div className="px-3 py-10 sm:px-10">
                                                        <div className="flex justify-between space-x-2 border-b-2 border-dashed pb-6">
                                                            <h6 className="text-lg font-semibold">Item Total</h6>
                                                            <div>
                                                                <span className="black-color-75 text-base">{purchaseDetails.itemCount} item(s)</span>
                                                                <span className="text-lg font-medium ml-2">₹ {Number(purchaseDetails.totalOrderAmount).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        <div className=" border-b-2 border-dashed">

                                                            <div className="flex justify-between space-x-2 my-4">
                                                                <h6 className="text-lg black-color font-medium">Delivery Charge</h6>
                                                                <div>
                                                                    <span className="text-lg black-color font-medium ml-2">{purchaseDetails.totalDeliveryCharge ? `₹ ${Number(purchaseDetails.totalDeliveryCharge).toFixed(2)}` : 'Free'}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between space-x-2 my-4">
                                                                <h6 className="text-lg black-color font-medium">Tax</h6>
                                                                <div>
                                                                    <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalTaxAmount).toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                            {
                                                                purchaseDetails?.totalConvenienceCharge ?
                                                                    <div className="flex justify-between space-x-2 my-4">
                                                                        <h6 className="text-lg black-color font-medium">Convenience Charge</h6>
                                                                        <div>
                                                                            <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalConvenienceCharge).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>
                                                                    : null
                                                            }
                                                            <div className="flex justify-between space-x-2 my-4">
                                                                <h6 className="text-lg black-color font-medium">Coupon Applied</h6>
                                                                <div>
                                                                    <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalCouponSavingsAmount).toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between space-x-2 my-4">
                                                                <h6 className="text-lg success-color font-medium">Discount</h6>
                                                                <div>
                                                                    <span className="text-lg success-color font-medium ml-2">- ₹{Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-4 border-dashed">
                                                            <h2 className="text-2xl font-bold">Total Amount</h2>
                                                            <h2 className="text-2xl font-bold">₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</h2>
                                                        </div>

                                                    </div>
                                                    <div className="text-center bg-success-color-lighter success-color py-4">
                                                        <span className="text-base fonr-medium">Savings on Bill ₹ {Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                            <div id='cart-total-btn' className="mt-0 sm:mt-20 w-full left-0 fixed sm:relative bottom-0 p-4 sm:p-0 grid grid-cols-2 sm:grid-cols-1 bg-white sm:bg-transparent" style={{
                                bottom: `${mobNavHeight}px`
                            }}>
                                {
                                    user ?

                                        !!purchaseDetails &&
                                        <>
                                            <div className="block sm:hidden">
                                                <h2 className="text-sm font-bold black-color-75">Item total <sub> {totalItems} item(s)</sub> </h2>
                                                <h2 className="text-base font-bold mt-2">₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</h2>
                                            </div>
                                            <div className="flex justify-end items-center" >
                                                {
                                                    !!purchaseDetails ?
                                                        <Button className="w-full py-3 sm:py-4 white-color rounded btn-bg text-center" onClick={initiatePayment} disabled={!enablePayment || storeSettings.is_checkout_enabled == 'N'} style={{
                                                            ...(!enablePayment || storeSettings?.is_checkout_enabled == 'N') && {
                                                                opacity: 0.6,
                                                                cursor: "not-allowed"
                                                            },
                                                        }} >
                                                            <span className="hidden sm:inline">
                                                                Proceed to Pay ₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}
                                                            </span>
                                                            <span className="sm:hidden inline">Check Out</span>
                                                        </Button>
                                                        :
                                                        <Button className="w-full py-3 sm:py-4 white-color rounded btn-bg text-center opacity-70" disabled={true} >Loading...</Button>
                                                }

                                            </div>
                                        </>
                                        :
                                        <div className=" col-span-full">
                                            <Button className="w-full py-3 sm:py-4 white-color rounded btn-bg text-center mx-auto" onClick={authToggle} >Login to Proceed</Button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                initiateStatus == 'loading' && !rzpOrder ?
                    <div className="fixed inset-0 left-0 bg-black-color-75">
                        <div className="relative w-full h-full">
                            <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                    : initiateStatus == 'loading' && rzpOrder
                        ? <OnlienPayment  {...{ store: info, user, checkout, setConfirmPayment, rzpOrder, setInitiateStatus, setError }} />
                        : null
            }
            {
                !!error &&
                <div className="py-4 px-8 fixed right-0 bottom-3 rounded-l-md bg-red-color white-color text-base font-medium">
                    {error.message}
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    info: state.store.info,
    storeSettings: state.store.settings,
    user: state.user.currentUser,
    userAddress: state.user.address,
    checkout: state.checkout,

})
const mapDispatchToProps = dispatch => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id)),
    getAddress: (id) => dispatch(getAddressStart(id)),
    updateAddress: data => dispatch(updateAddressStart(data)),
    addAddressStart: data => dispatch(addAddressStart(data)),

    setDeliveryAddressToPurchase: (id) => dispatch(setDeliveryAddressToPurchase(id)),
    setPaymentMethod: data => dispatch(setPaymentMethod(data)),
    setShipmentMethod: data => dispatch(setShipmentMethod(data)),

    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data)),
    clearCart: () => dispatch(clearCart()),

    authToggle: () => dispatch(authShowToggle())
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Cart))
