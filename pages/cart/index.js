import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link, { redirect } from '@components/link'
import { Button } from '@components/inputs'
import { Input } from '@components/inputs'

// Components
import CartItem from '@components/cart-item/cart-item'
import { Radio } from '@components/inputs'
import OnlienPayment from '@components/online-payment/online-payment'
import Loader from '@components/loading/loader'
import CartList from '@components/cart-item/cart-list'
import PageWrapper from '@components/page-wrapper/page-wrapper'

// Actions
import { clearCart, deleteItemFromCart } from '@redux/cart/cart-actions'
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle, } from '@redux/user/user-action'
import {
    setBackendCartStart, getPurchageStart, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod,
    initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart, applyCouponCodeStart,
} from '@redux/checkout/checkout-action'
import OrderSummry from '@components/order-summry/order-summry'
import { getShopSettingsStart } from '@redux/shop/shop-action'


const Cart = ({ user, userAddress, isDetailsLoading, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle, initiateOrder, clearCheckout, createNewRzpOrder, clearCart, deleteItemFromCart, applyCouponCode ,getShopSettings}) => {
    const purchaseDetails = checkout.purchaseDetails
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    const [mobNavHeight, setMobNavHeight] = useState(0)
    const [initiateData, setInitiateData] = useState(null) // For cod
    const [confirmPayment, setConfirmPayment] = useState(null) // For online
    const [initiateStatus, setInitiateStatus] = useState('pending') // pending, loading, failure
    const [error, setError] = useState(null)
    const [cpError, setCpError] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [success, setOnSuccess] = useState(null)
    const [rzpOrder, setRzpOrder] = useState(null)
    const [enablePayment, setEnablePayment] = useState(false)
    const [coupon, setcoupon] = useState('')
    const [payment, setpayment] = useState(false)
    const [active2, setactive2] = useState(false)
    const [confirmOrder, setConfirmOrder] = useState(false)
    const [navbarHeight, setNavbarHeight] = useState(166)

    useEffect(()=>{
        const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
        getShopSettings(storeId);
    },[])

    return (
        <>
            {
                totalItems ?
                    <div className="wrapper bg-[#f2f2f2] w-full ">
                        <div className="w-full py-0 sm:py-10 space-y-5 pb-[80px] sm:pb-10">
                            <h3 className='text-2xl font-semibold hidden sm:block'> <span className='btn-color-revers'>{totalItems} Items</span> In Your Cart</h3>
                            <div className='flex flex-col md:flex-row justify-between md:space-x-6'>
                                <div className='flex-1 space-y-5'>
                                    <CartList />
                                </div>
                                <div className='shrink-0 w-full md:w-5/12 xl:w-4/12'>
                                    {
                                        user ?
                                            <>
                                                <div className=' bg-white hidden sm:block p-4 sm:p-10'>
                                                    <OrderSummry />
                                                </div>
                                                <div className='w-full flex fixed sm:static inset-x-0 justify-between items-center px-4 py-4  bottom-[0] z-[1001] bg-white sm:bg-transparent'>
                                                    <div className=' space-y-1 block sm:hidden'>
                                                        <span className='block'>{totalItems} Items in cart</span>
                                                        <span className=' text-base block font-semibold'>
                                                        {info.currency_symbol}{' '}
                                                            {purchaseDetails?.calculatedPurchaseTotal ? Number(
                                                                purchaseDetails?.calculatedPurchaseTotal
                                                            ).toFixed(2) : 0}
                                                        </span>
                                                    </div>
                                                    {
                                                        (info.store_status == "INACTIVE" || info.is_open_today=="N" || purchaseDetails?.invalidReason=="STORE_CLOSED")?
                                                            <Button disabled={true} className="w-fit sm:w-3/4 sm:mt-10 sm:mx-auto px-14 sm:px-0 py-3  block  sm:py-4 white-color rounded btn-bg text-center">Store Closed</Button>
                                                            :
                                                            <Button type='link' disabled={isDetailsLoading || !purchaseDetails?.isPurchaseValid} href='/cart/address' className="w-fit sm:w-3/4 sm:mt-10 sm:mx-auto px-14 sm:px-0 py-3  block  sm:py-4 white-color rounded btn-bg text-center">Proceed </Button>
                                                    }
                                                    {/* <Button type='link' disabled={isDetailsLoading} href='/cart/address' className="w-fit sm:w-3/4 sm:mt-10 sm:mx-auto px-14 sm:px-0 py-3  block  sm:py-4 white-color rounded btn-bg text-center">Proceed </Button> */}
                                                </div>
                                            </>
                                            :
                                            <div className='w-full flex fixed sm:static inset-x-0 justify-center items-center px-4 py-4  bottom-[0] z-[1001] bg-white sm:bg-transparent'>
                                                <Button onClick={authToggle} className="w-full sm:w-3/4 sm:mx-auto px-14 sm:px-0 py-3  block  sm:py-4 white-color rounded btn-bg text-center">Login to proceed </Button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center items-center' style={{ minHeight: '85vh' }}>
                        <div className='w-64 h-64'>
                            <img src="/img/empty.png" alt="..." />
                            <h4 class="my-4">Your Cart is Empty,<span class="btn-color-revers my-6">
                                <Link href="/shop">
                                    <a > Shop now!</a>
                                </Link>
                            </span></h4>
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    info: state.store.info,
    storeSettings: state.store.settings,
    user: state.user.currentUser,
    userAddress: state.user.address,
    isDetailsLoading: state.ui.isDetailsLoading,
    checkout: state.checkout,
})
const mapDispatchToProps = (dispatch) => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id)),
    getAddress: (id) => dispatch(getAddressStart(id)),
    updateAddress: (data) => dispatch(updateAddressStart(data)),
    addAddressStart: (data) => dispatch(addAddressStart(data)),

    setDeliveryAddressToPurchase: (id) =>
        dispatch(setDeliveryAddressToPurchase(id)),
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
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Cart))