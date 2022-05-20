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

// Actions
import { clearCart, deleteItemFromCart } from '@redux/cart/cart-actions'
import {
  getAddressStart,
  addAddressStart,
  updateAddressStart,
  authShowToggle,
} from '@redux/user/user-action'
import {
  setBackendCartStart,
  getPurchageStart,
  setDeliveryAddressToPurchase,
  setPaymentMethod,
  setShipmentMethod,
  initiateOrderPymentStart,
  clearCheckout,
  createNewRzpOrderStart,
  applyCouponCodeStart,
} from '@redux/checkout/checkout-action'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import Tracker from '@components/Cards/tracker'

const Cart = ({
  user,
  userAddress,
  storeSettings,
  cart,
  info,
  checkout,
  setBackendCart,
  getPurchage,
  getAddress,
  setDeliveryAddressToPurchase,
  setPaymentMethod,
  setShipmentMethod,
  authToggle,
  initiateOrder,
  clearCheckout,
  createNewRzpOrder,
  clearCart,
  deleteItemFromCart,
  applyCouponCode
}) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const purchaseDetails = checkout.purchaseDetails
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
  const [checkoutDetails, setcheckoutDetails] = useState({
    deliveryAddress: null,
    deliveryMethod: '',
    paymentMethod: '',
  })
  //cart tracking headers
  const [cartHeader, setcartHeader] = useState({
    active: false,
    status: 'desktop'
  })
  const [addId, setaddId] = useState(0)
  // console.log(userAddress,'line74444...')
  useEffect(() => {
    var ids = localStorage.getItem('addId')
    const getId = () => {
      setaddId(userAddress.filter((x, index) => x.address_id === ids))

    }
    console.log(addId, `line145`)
    return getId()
  }, [user])
  const router = useRouter()
  useEffect(() => {
    // Do nothing if don't have storeId, user and cart length is zero
    if (!info || !user || !cart.length) return
    const data = {
      [info.store_id]: [
        ...cart.map((item) => ({
          item_id: item.item_id,
          barcode_id: null,
          quantity: item.quantity,
          variant_item_id: item.defaultVariantItem?.variant_item_id | null,
        })),
      ],
    }
    console.log('Cartipdate');
    //  Creating browsercart
    setBackendCart({ userId: user.customer_id, groupId: info.group_id, purchaseId: checkout?.purchase?.purchase_id, data })
    // if (!checkout.purchase) {
    //   setBackendCart({ userId: user.customer_id, groupId: info.group_id, data })
    // }

    // Setting default details
    // if (checkout.purchase) {
    //   setPaymentMethod({
    //     purchaseId: checkout.purchase?.purchase_id,
    //     flag: checkoutDetails.paymentMethod,
    //   })
    // }
    // if (checkout.purchase) {
    //   setShipmentMethod({
    //     purchaseId: checkout.purchase?.purchase_id,
    //     flag: checkoutDetails.deliveryMethod,
    //   })
    // }
  }, [user, totalItems, info])

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
    const { name, value } = e.target
    console.log(checkoutDetails, 'line133', name, value)
    setcheckoutDetails({
      ...checkoutDetails,
      [name]: value,
    })
    if (name == 'deliveryAddress' && checkout.purchase) {
      setDeliveryAddressToPurchase({
        purchaseId: checkout.purchase?.purchase_id,
        addressId: value,
      })
    }
    if (name == 'paymentMethod' && checkout.purchase) {
      setPaymentMethod({
        purchaseId: checkout.purchase?.purchase_id,
        flag: value,
      })
    }
    if (name == 'deliveryMethod' && checkout.purchase) {
      setShipmentMethod({
        purchaseId: checkout.purchase?.purchase_id,
        flag: value,
      })
    }
  }
  useEffect(() => {
    const { deliveryAddress, deliveryMethod, paymentMethod } = checkoutDetails
    setEnablePayment(
      (() => {
        let [d, p] = [false, false]
        if (
          (deliveryMethod == '' || deliveryAddress) ||
          deliveryMethod == 'N'
        ) {
          d = true
        } else {
          d = false
        }
        if (paymentMethod) {
          p = true
        } else {
          p = false
        }
        return d && p
      })()
    )
  }, [checkoutDetails])

  // Initial Payment function
  const initiatePayment = () => {

    if (!enablePayment) return
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
      setInitiateStatus('loading')
      createNewRzpOrder({
        purchaseId: purchase?.purchase_id,
        totalPurchaseAmount: purchaseDetails?.calculatedPurchaseTotal,
        currency: purchaseDetails?.currencyCode,
        setRzpOrder,
        setError,
        setError,
      })
    }
  }
  useEffect(() => {
    if (initiateStatus == 'success' && (initiateData || setConfirmPayment)) {
      // const orderId = Object.keys(initiateData.orders)[0]
      const orderId = Object.keys(purchaseDetails.orders)[0]
      const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? 'PAY' : 'COD'
      let encoded = ''
      if (initiateData) {
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
            id,
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
              // console.log(ele)
              setMobNavHeight(ele.offsetHeight)
            }
          }
        }
      })
      objerver.observe(document.body)
    }
  }, [])
  const onCouponAppyHandler = () => {
    if (couponCode.length < 3) return;
    // const orderId = checkout.purchase.orders.find(item => Object item)[shop.store_id].order_id;
    const order = Object.values(checkout.purchaseDetails.orders).find(item => item.storeId == info.store_id);
    const orderId = order?.orderId
    applyCouponCode({ purchaseId: checkout.purchase?.purchase_id, storeId: info.store_id, couponCode, orderId, userId: user.customer_id, onSuccess: setOnSuccess, onError: setCpError })
    setCouponCode("")
  }


  console.log(userAddress?.filter(x => x?.address_id === +localStorage.getItem('addId')))
  if (!info) {
    // If store details are not awilable
    return <Loader />
  }
  if (!cart.length) {
    return (
      <>
        <div className=" py-4 px-4 flex md:hidden bg-white items-center border-b-[1px] border-[#E7E7E7] ">
          <span className="text-black mx-2  text-lg font-bold">
            <svg width="25" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9688 10.1562C17.9688 8.29145 17.2872 6.50302 16.0741 5.18441C14.861 3.86579 13.2156 3.125 11.5 3.125C9.78438 3.125 8.13903 3.86579 6.9259 5.18441C5.71278 6.50302 5.03125 8.29145 5.03125 10.1562C5.03125 13.0406 7.15444 16.8 11.5 21.3031C15.8456 16.8 17.9688 13.0406 17.9688 10.1562ZM11.5 23.4375C6.22869 18.2297 3.59375 13.8016 3.59375 10.1562C3.59375 7.87705 4.42673 5.69119 5.90944 4.07955C7.39215 2.46791 9.40313 1.5625 11.5 1.5625C13.5969 1.5625 15.6079 2.46791 17.0906 4.07955C18.5733 5.69119 19.4062 7.87705 19.4062 10.1562C19.4062 13.8016 16.7713 18.2297 11.5 23.4375Z" fill="#313031" />
              <path d="M11.5 12.5C12.0719 12.5 12.6203 12.2531 13.0247 11.8135C13.4291 11.374 13.6562 10.7779 13.6562 10.1562C13.6562 9.53465 13.4291 8.93851 13.0247 8.49897C12.6203 8.05943 12.0719 7.8125 11.5 7.8125C10.9281 7.8125 10.3797 8.05943 9.9753 8.49897C9.57093 8.93851 9.34375 9.53465 9.34375 10.1562C9.34375 10.7779 9.57093 11.374 9.9753 11.8135C10.3797 12.2531 10.9281 12.5 11.5 12.5ZM11.5 14.0625C10.5469 14.0625 9.63279 13.6509 8.95884 12.9184C8.28488 12.1858 7.90625 11.1923 7.90625 10.1562C7.90625 9.12025 8.28488 8.12668 8.95884 7.39411C9.63279 6.66155 10.5469 6.25 11.5 6.25C12.4531 6.25 13.3672 6.66155 14.0412 7.39411C14.7151 8.12668 15.0938 9.12025 15.0938 10.1562C15.0938 11.1923 14.7151 12.1858 14.0412 12.9184C13.3672 13.6509 12.4531 14.0625 11.5 14.0625Z" fill="#313031" />
            </svg>
          </span>
          <div className="w-3/4 leading-5">
          </div>
          <Button className={`btn-color btn-bg m text-sm  rounded-2xl py-3 px-4  `} pdp={true} style={{ backgroundColor: "#F58634" }} onClick={() => {
            router.push(`/account/savedplaces`)
          }}  >Change </Button>
        </div>
        <div
          className=" hidden w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 "
        // style={{ boxShadow: `0px 2px 8px #0000001A` }}
        >
          <button
            className="flex hidden items-center black-color-75 mr-4"
            onClick={router.back}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi hidden bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>
          <span className="text-base hidden font-semibold">My Caer</span>
        </div>
        <div
          className="flex justify-center items-center empty-cart"
          style={{ minHeight: '80vh' }}
        >
          <div
            className="h-64 w-64 text-center  "
            style={{
              borderRadius: '50%',
              // background: 'rgba(246, 75, 93, 0.13)',
              // boxShadow: 'rgb(246 75 93 / 13%) 0px 0px 100px 100px',
            }}
          >
            <img src="/img/empty.png" />
            <h4 className="my-4">
              Your Cart is Empty,
              <span className=" my-4">
                <Link href="/"> Shop now!</Link>
              </span>
            </h4>
          </div>
        </div>
        <div id="cart-total-btn md:hidden"
          className=" border-[1px] border-[#E7E7E7]   md:border-[0px] mt-0 sm:mt-20 w-full left-0 fixed sm:relative bottom-0 p-4 sm:p-0  bg-white sm:bg-transparent"
          style={{
            bottom: `${mobNavHeight}px`,
            zIndex: 1
          }}
        >
          {/* */}
        </div>
      </>
    )
  }
  return (
    <>
      <div className="flex wrapper bg-[#f2f2f2] flex-row  w-full ">
        <div className="w-full">
          <div className=" w-full flex hidden justify-start items-center p-5 bg-white sticky top-0 z-10 " style={{ boxShadow: `0px 2px 8px #0000001A` }}>
            <button
              className="flex items-center black-color-75 mr-4"
              onClick={router.back}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            <span className="text-base hidden font-semibold">My Cart</span>
          </div>
          <section className=" bg-white md:bg-[#f2f2f2]  relative pb-16">
            <div className=" mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 2xl:gap-10">
                <div className="w-full col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-8  ">
                  {payment && (
                    <>
                      <div className=" py-4 hidden md:flex ">
                        <span className="text-lg font-bold ">
                          Select Payment Method
                        </span>
                        {/* Payment Method */}

                      </div>
                      <div className="w-fullhidden md:block px-4 md:px-0  ">

                        <div className="pt-2 hidden md:block divide-y sm:divide-y-0 ">
                          {storeSettings?.is_payment_accepted == 'Y' && (
                            <div className="">
                              <label
                                className="sm:p-8 md:p-6 delivery-inputs bg-white rounded block w-full"
                                htmlFor="online"
                              >
                                <div className="flex justify-between items-center">

                                  <div className="pl-2 md:pl-4">
                                    <h3 className="font-semibold text-base block">
                                      Online Payment
                                    </h3>
                                    <span className="block text-base black-color-75 tracking-tight">
                                      ( UPI, Credit/Debit cards, Wallet, Net banking
                                      )
                                    </span>
                                  </div>
                                  <Radio
                                    className="mt-2"
                                    id="online"
                                    name="paymentMethod"
                                    value="Y"
                                    onChange={onChangeHandler}
                                    checked={checkoutDetails.paymentMethod == 'Y'}
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                          {storeSettings?.is_cod_accepted == 'Y' && (
                            <div className="pt-4 my-6 sm:pt-0">
                              <label
                                className="sm:p-8 md:p-6 delivery-inputs bg-white rounded block w-full"
                                htmlFor="cod"
                              >
                                <div className="flex justify-between items-center ">

                                  <div className="pl-4">
                                    <h3 className="font-semibold text-base block">
                                      Cash On Delivery
                                    </h3>
                                    <span className="block text-base black-color-75 tracking-tight">
                                      ( Cash, UPI)
                                    </span>
                                  </div>
                                  <Radio
                                    className="mt-2"
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
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full hidden flex justify-center mt-2">
                        {user ? (
                          !!purchaseDetails && (
                            <>
                              <div className="block sm:hidden">
                                <h2 className="text-sm font-bold black-color-75">
                                  Item total <sub> {totalItems} item(s)</sub>{' '}
                                </h2>
                                <h2 className="text-base font-bold mt-2">
                                  ₹{' '}
                                  {Number(
                                    purchaseDetails?.calculatedPurchaseTotal
                                  ).toFixed(2)}
                                </h2>
                              </div>

                              <div className=" w-full flex justify-center items-center">
                                {!!purchaseDetails ? (
                                  <Button
                                    className="w-3/4 py-4 white-color rounded btn-bg text-center"
                                    onClick={initiatePayment}
                                    disabled={
                                      !enablePayment ||
                                      storeSettings.is_checkout_enabled == 'N'
                                    }
                                    style={{
                                      backgroundColor: '#F58634', ...((!enablePayment ||
                                        storeSettings?.is_checkout_enabled == 'N') && {
                                        opacity: 0.6,
                                        cursor: 'not-allowed',
                                        backgroundColor: '#F58634'
                                      }),
                                    }}
                                  >
                                    <span className="hidden sm:inline">
                                      Proceed to Pay ₹{' '}
                                      {Number(
                                        purchaseDetails?.calculatedPurchaseTotal
                                      ).toFixed(2)}
                                    </span>
                                    <span className="sm:hidden inline">Check Out</span>
                                  </Button>
                                ) : (
                                  <Button
                                    className="w-full py-4 white-color rounded btn-bg text-center opacity-70"
                                    disabled={true}
                                    style={{ backgroundColor: '#F58634' }}
                                  >
                                    Loading...
                                  </Button>
                                )}
                              </div>
                            </>
                          )
                        ) : (
                          <div className=" col-span-full">
                            <Button
                              className="w-full py-4 rounded btn-bg btn-color text-center mx-auto"
                              onClick={authToggle}
                            >
                              Login to Proceed
                            </Button>
                          </div>
                        )}

                      </div>
                    </>
                  )}
                  {/* Payment section for mobile view */}
                  {cartHeader.status === 'payment' && (
                    <>

                      <div
                        className="w-[94%] h-16 px-2 ml-3 my-6  justify-bewteen border-[1px] border-gray-100 rounded-lg flex items-center"
                      >
                        <Input
                          className="   bg-transparent border-none  focus:outline-none"
                          placeholder="Apply coupon code"
                          value={coupon}
                          onChange={(e) => { setcoupon(e.target.value) }}
                        />
                        <Button
                          className="px-4  py-2 sm:py-4 white-color rounded btn-bg text-center"
                        // onClick={initiatePayment}

                        >

                          <span className="sm:hidden inline">Apply</span>
                        </Button>

                      </div>

                      <span className="text-lg font-bold w-full flex justify-center my-12">
                        Payment Method
                      </span>



                      <div className="w-[100vw]  md:px-0  ">

                        <div className="pt-2  md:divide-y md:divide-y-0 ">
                          {storeSettings?.is_payment_accepted == 'Y' && (
                            <div className=" border-t-2 border-b-2 border-gray-200">
                              <label
                                className=" my-6 mb-8 md:p-6 delivery-inputs bg-white rounded block w-full"
                                htmlFor="online"
                              >
                                <div className="flex px-4 justify-between items-center">

                                  <div className="pl-2 md:pl-4">
                                    <h3 className="font-semibold text-base block mt-4">
                                      Online Payment
                                    </h3>
                                    <span className="  w-full block text-base text-white tracking-tight">
                                      {/* ( UPI, Credit/Debit cards, Wallet, Net banking
                                  ) */}
                                    </span>
                                  </div>
                                  <Radio
                                    className="mt-2"
                                    id="online"
                                    name="paymentMethod"
                                    value="Y"
                                    onChange={onChangeHandler}
                                    checked={checkoutDetails.paymentMethod == 'Y'}
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                          {storeSettings?.is_cod_accepted == 'Y' && (
                            <div className="pt-4 border-b-2 border-gray-200  my-6 sm:pt-0">
                              <label
                                className="pb-8  md:p-6 delivery-inputs bg-white rounded block w-full"
                                htmlFor="cod"
                              >
                                <div className="flex  px-4 justify-between items-center ">

                                  <div className="pl-2">
                                    <h3 className="font-semibold text-base block">
                                      Cash On Delivery
                                    </h3>
                                    <span className="block text-base black-color-75 tracking-tight">
                                      {/* ( Cash, UPI) */}
                                    </span>
                                  </div>
                                  <Radio
                                    className="mt-2"
                                    id="cod"
                                    name="paymentMethod"
                                    value="N"
                                    onChange={onChangeHandler}
                                    checked={checkoutDetails.paymentMethod == 'N'}
                                  />
                                </div>
                                <span className="md:ml-4 pl-6 sm:ml-0 text-xs text-gray-400 ">
                                  *Cash on delivery is not eligible for wallet
                                  transactions
                                </span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex justify-center mt-2">
                        {user ? (
                          // checkout button for payments
                          !!purchaseDetails && (
                            <>
                              <div className="block hidden">
                                <h2 className="text-sm font-bold black-color-75">
                                  Item total <sub> {totalItems} item(s)</sub>{' '}
                                </h2>
                                <h2 className="text-base font-bold mt-2">
                                  ₹{' '}
                                  {Number(
                                    purchaseDetails?.calculatedPurchaseTotal
                                  ).toFixed(2)}
                                </h2>
                              </div>

                              <div className=" hidden w-full flex justify-center items-center">
                                {!!purchaseDetails ? (
                                  <Button
                                    className="w-3/4 py-3 sm:py-4 white-color rounded btn-bg text-center"
                                    onClick={initiatePayment}
                                    disabled={
                                      !enablePayment ||
                                      storeSettings.is_checkout_enabled == 'N'
                                    }
                                    style={{
                                      backgroundColor: '#F58634', ...((!enablePayment ||
                                        storeSettings?.is_checkout_enabled == 'N') && {
                                        opacity: 0.6,
                                        cursor: 'not-allowed',
                                        backgroundColor: '#F58634'
                                      }),
                                    }}
                                  >
                                    <span className="hidden sm:inline">
                                      Proceed to Pay ₹{' '}
                                      {Number(
                                        purchaseDetails?.calculatedPurchaseTotal
                                      ).toFixed(2)}
                                    </span>
                                    <span className="sm:hidden inline">Check Out</span>
                                  </Button>
                                ) : (
                                  <Button
                                    className="w-full py-3 sm:py-4 white-color rounded btn-bg text-center opacity-70"
                                    disabled={true}
                                    style={{ backgroundColor: '#F58634' }}
                                  >
                                    Loading...
                                  </Button>
                                )}
                              </div>
                            </>
                          )
                        ) : (
                          <div className=" col-span-full">
                            <Button
                              className="w-full py-3 sm:py-4 white-color rounded btn-bg text-center mx-auto"
                              onClick={authToggle}
                            >
                              Login to Proceed
                            </Button>
                          </div>
                        )}

                      </div>
                    </>
                  )}
                  <div className=" pt-4 hidden  md:flex ">
                    {
                      !payment ? <>
                        <span className="  text-lg font-bold">
                          {totalItems} items
                        </span>
                        <span className="text-lg font-bold mx-2">In your cart</span>
                      </> :
                        <span className="text-lg hidden md:block font-bold ">Review your order</span>

                    }

                  </div>

                  {
                    cartHeader.status === 'desktop' &&
                    <div className=" py-4 px-4 flex md:hidden bg-white items-center border-b-[1px] border-[#E7E7E7] ">
                      {
                        !payment ? <>
                          <span className="text-black mx-2  text-lg font-bold">
                            <svg width="25" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.9688 10.1562C17.9688 8.29145 17.2872 6.50302 16.0741 5.18441C14.861 3.86579 13.2156 3.125 11.5 3.125C9.78438 3.125 8.13903 3.86579 6.9259 5.18441C5.71278 6.50302 5.03125 8.29145 5.03125 10.1562C5.03125 13.0406 7.15444 16.8 11.5 21.3031C15.8456 16.8 17.9688 13.0406 17.9688 10.1562ZM11.5 23.4375C6.22869 18.2297 3.59375 13.8016 3.59375 10.1562C3.59375 7.87705 4.42673 5.69119 5.90944 4.07955C7.39215 2.46791 9.40313 1.5625 11.5 1.5625C13.5969 1.5625 15.6079 2.46791 17.0906 4.07955C18.5733 5.69119 19.4062 7.87705 19.4062 10.1562C19.4062 13.8016 16.7713 18.2297 11.5 23.4375Z" fill="#313031" />
                              <path d="M11.5 12.5C12.0719 12.5 12.6203 12.2531 13.0247 11.8135C13.4291 11.374 13.6562 10.7779 13.6562 10.1562C13.6562 9.53465 13.4291 8.93851 13.0247 8.49897C12.6203 8.05943 12.0719 7.8125 11.5 7.8125C10.9281 7.8125 10.3797 8.05943 9.9753 8.49897C9.57093 8.93851 9.34375 9.53465 9.34375 10.1562C9.34375 10.7779 9.57093 11.374 9.9753 11.8135C10.3797 12.2531 10.9281 12.5 11.5 12.5ZM11.5 14.0625C10.5469 14.0625 9.63279 13.6509 8.95884 12.9184C8.28488 12.1858 7.90625 11.1923 7.90625 10.1562C7.90625 9.12025 8.28488 8.12668 8.95884 7.39411C9.63279 6.66155 10.5469 6.25 11.5 6.25C12.4531 6.25 13.3672 6.66155 14.0412 7.39411C14.7151 8.12668 15.0938 9.12025 15.0938 10.1562C15.0938 11.1923 14.7151 12.1858 14.0412 12.9184C13.3672 13.6509 12.4531 14.0625 11.5 14.0625Z" fill="#313031" />
                            </svg>
                          </span>

                          <div className="w-3/4 leading-5">
                            <p className="text-base md:text-lg font-bold ">{userAddress.filter(x => x.address_id === +localStorage.getItem('addId'))[0]?.full_name === [] || userAddress[0]?.full_name}</p>
                            <span className="text-sm md:text-base leading-3 ">{userAddress.filter(x => x.address_id === +localStorage.getItem('addId'))[0]?.address_line_1 || userAddress[0]?.address_line_1},{userAddress.filter(x => x.address_id === +localStorage.getItem('addId'))[0]?.address_line_2 || userAddress[0]?.address_line_2}</span>

                          </div>
                          <Button className={`btn-color btn-bg text-sm  rounded-2xl py-3 px-4  `} pdp={true} onClick={() => {
                            router.push(`/account/savedplaces`)
                          }}  >Change </Button>

                        </> :
                          <span className="text-lg  hidden md:block font-bold ">Review your order</span>

                      }

                    </div>
                  }

                  {
                    cartHeader.status !== ('payment' || 'order') &&
                    <>
                      {cart.map((item, i) => (
                        <div key={i}>
                          <div className=" md:my-4  w-full bg-white rounded border-b-[1px] border-[#E7E7E7] md:border-[0px]">
                            {/* <div className="flex w-full p-2 justify-end text-gray-400   ">
                              <IoIosCloseCircleOutline className="cursor-pointer hidden md:block" onClick={(e) => { deleteItemFromCart(item) }} size={20} />
                            </div> */}
                            {/* cart Item list */}
                            <div className="p-3 lg:p-6  flex flex-col  divide-y sm:divide-y-0">
                              <CartItem data={item} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  }
                  {!!purchaseDetails && payment && (

                    <>
                      {/* Delivery method */}
                      <div className="w-full hidden md:block mt-10 px-3 py-10 sm:px-10 bg-white rounded">
                        <div className="">
                          <h2>Delivery Method</h2>
                        </div>
                        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 divide-y sm:divide-y-0 ">
                          {storeSettings.is_delivery_available == 'Y' && (
                            <div className="">
                              <label
                                className="sm:p-8 delivery-inputs border-color  border-dashed sm:border-2 rounded block w-full"
                                htmlFor="delivery"
                              >
                                <Radio
                                  id="delivery"
                                  name="deliveryMethod"
                                  value={'Y'}
                                  onChange={onChangeHandler}
                                  checked={checkoutDetails.deliveryMethod == 'Y'}
                                />
                                <span className="ml-4 font-semibold text-base">
                                  Delivery
                                </span>
                              </label>
                            </div>
                          )}
                          {storeSettings.is_parcel_available == 'Y' && (
                            <div className="pt-4 sm:pt-0">
                              <label
                                className="sm:p-8 delivery-inputs border-color  border-dashed sm:border-2 rounded block w-full"
                                htmlFor="pickup"
                              >
                                <Radio
                                  id="pickup"
                                  name="deliveryMethod"
                                  value={'N'}
                                  onChange={onChangeHandler}
                                  checked={checkoutDetails.deliveryMethod == 'N'}
                                />
                                <span className="ml-4 font-semibold text-base">
                                  Self Pick Up
                                </span>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="pt-10 w-full">
                          {checkoutDetails.deliveryMethod == 'N' && (
                            <div className="">
                              <h2>Delivery Pickup Address</h2>
                              <div className="py-6">
                                {storeSettings && (
                                  <p className="text-base ">
                                    {
                                      storeSettings.pickupPointDetails
                                        .pickup_point_name
                                    }
                                    , {storeSettings.pickupPointDetails.address},{' '}
                                    {storeSettings.pickupPointDetails.city}, <br />
                                    {storeSettings.pickupPointDetails.state},{' '}
                                    {storeSettings.pickupPointDetails.country},{' '}
                                    <br /> Pin:{' '}
                                    {storeSettings.pickupPointDetails.zip_code}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                          {checkoutDetails.deliveryMethod == 'Y' && (
                            <>
                              <div className="">
                                <h2>Choose Delivery Address</h2>
                              </div>
                              <div className="hidden md:grid pt-10  grid-cols-1 md:grid-cols-2 gap-10">
                                {userAddress.map((item, i) => (
                                  <div className="address flex h-full" key={i + i}>
                                    <div className="p-0 sm:p-8 delivery-inputs border-color border-dashed sm:border-2 rounded block w-full">
                                      <Radio
                                        className="hidden"
                                        id={`address${i}`}
                                        name="deliveryAddress"
                                        checked={
                                          checkoutDetails.deliveryAddress ==
                                          item.address_id
                                        }
                                        value={item.address_id}
                                        onChange={onChangeHandler}
                                      />
                                      <div className="flex">
                                        <div className="btn-color-revers">
                                          {item.address_tag == 'Home' ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              style={{ color: 'inherit' }}
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              style={{ color: 'inherit' }}
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                        <div className="ml-2 w-full">
                                          <h3 className="text-xl font-semibold">
                                            {item.address_tag}
                                          </h3>
                                          <div className="my-4">
                                            <span className="home">
                                              {item?.address_line_1},{' '}
                                              {item?.address_line_2}
                                            </span>
                                            <span className="state-pin">
                                              {item?.city}, {item?.state}{' '}
                                              {item?.zip_code},
                                            </span>
                                            <span className="country">
                                              {item?.country},
                                            </span>
                                            <span className="country font-w-bold">
                                              +91 {item?.phone}
                                            </span>
                                          </div>
                                          <button className="btn-color-revese my-2">
                                            Edit
                                          </button>
                                          {checkoutDetails.deliveryAddress !=
                                            item.address_id && (
                                              <label
                                                className="block my-2 btn-bg btn-color py-3.5 px-8 rounded max-w-fit"
                                                htmlFor={`address${i}`}
                                              >
                                                Deliver Here
                                              </label>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className=" py-6">
                                  <Button
                                    className="flex items-center btn-color-revese"
                                    type="link"
                                    href="/account/savedplaces"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 mr-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span>Add New Address</span>
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {/* Payment options */}

                    </>
                  )}
                </div>
                {/* payment for mobile view */}
                {/* Invoice section */}
                <div className="w-full col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-4 ">
                  {!!user && (
                    <>
                      {/* <div className="bg-white">
                                        <div className="px-2 py-10 sm:px-10 border-b-2 rounded">
                                            <h2>Promo / Gift Code</h2>
                                        </div>
                                        <div className="w-full p-10 flex justify-between items-baseline space-x-2">
                                            <input type="text" className="text-lg font-medium w-full border-b-2 focus:outline-none focus:border-b-2 " placeholder="Have any Promo Code?" />
                                            <button className="py-2 btn-color rounded px-4 text-base btn-bg ">Apply</button>
                                        </div>
                                    </div> */}
                      <div>
                        <div className="md:mt-16 md:pb-10 bg-white rounded hidden md:block  md:block">
                          {/* coupon field */}
                          <div className="px-3 md:py-10 sm:px-10  ">
                            <div>
                              <div className="">
                                <div className='mb-3 grid grid-cols-6 space-x-2'>
                                  <Input className=' col-span-4 rounded py-3' placeholder={'Coupon Code'} onChange={(e) => {
                                    setCpError("");
                                    // setOnSuccess(null)
                                    setCouponCode(e.target.value)
                                  }} value={couponCode} />
                                  <Button className=' col-span-2 rounded py-3 text-white btn-bg' onClick={onCouponAppyHandler} >Apply</Button>
                                </div>
                                {
                                  !!success &&
                                  <div className='mb-4 border-green-500 border rounded text-center text-green-600 bg-green-300 bg-opacity-20 py-3'>
                                    Applied successfully
                                  </div>
                                }
                                {
                                  !!cpError &&
                                  <div className='mb-4 border-red-500 border rounded text-center text-red-600 bg-red-300 bg-opacity-20 py-3'>
                                    {cpError}
                                  </div>
                                }
                                <div className="ml-2 w-full">
                                  <h3 className="text-xl hidden md:block font-semibold">
                                    Billing Details
                                  </h3>
                                  <div className="mt-4  hidden md:block mb-2 fle">
                                    <span className="home font-bold text-sm">
                                      Shipping to:{' '}
                                    </span>

                                    <span className="home">
                                      {userAddress[0]?.address_line_1},{' '}
                                      {userAddress[0]?.address_line_2}
                                    </span>
                                    <br></br>
                                    <span className="state-pin">
                                      {userAddress[0]?.city}, {userAddress[0]?.state}{' '}
                                      {userAddress[0]?.zip_code},
                                    </span>
                                    <br></br>
                                    <span className="country">
                                      {userAddress[0]?.country},
                                    </span>
                                    <br />
                                    <span className="country font-w-bold">
                                      +91 {userAddress[0]?.phone}
                                    </span>
                                  </div>

                                  {/* <span className="font-semibold">
                                    Get all Item before :
                                  </span>
                                  <span className="text-green-600">
                                    {' '}
                                    Wednesday 23 mar, 2022
                                  </span> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {!!purchaseDetails && (
                            <>
                              <div className="px-3 py-10 sm:px-10">
                                <div className="flex justify-between space-x-2 ">
                                  <h6 className="text-lg font-medium text-gray-400">
                                    Item Total
                                  </h6>
                                  <div>
                                    <span className="text-lg font-medium ml-2">
                                      ₹{' '}
                                      {Number(
                                        purchaseDetails?.totalOrderAmount
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between space-x-2 my-1">
                                    <h6 className="text-lg  font-medium text-gray-400">
                                      Delivery Charge
                                    </h6>
                                    <div>
                                      <span className="text-lg black-color font-medium ml-2">
                                        {purchaseDetails?.totalDeliveryCharge
                                          ? `₹ ${Number(
                                            purchaseDetails?.totalDeliveryCharge
                                          ).toFixed(2)}`
                                          : 'Free'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex justify-between space-x-2 my-1">
                                    <h6 className="text-lg  font-medium text-gray-400">
                                      Tax
                                    </h6>
                                    <div>
                                      <span className="text-lg black-color font-medium ml-2">
                                        ₹{' '}
                                        {Number(
                                          purchaseDetails.totalTaxAmount
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                  {purchaseDetails?.totalConvenienceCharge ? (
                                    <div className="flex justify-between space-x-2 my-1">
                                      <h6 className="text-lg  font-medium text-gray-400">
                                        Convenience Charge
                                      </h6>
                                      <div>
                                        <span className="text-lg black-color font-medium ml-2">
                                          ₹{' '}
                                          {Number(
                                            purchaseDetails.totalConvenienceCharge
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  ) : null}
                                  <div className="flex justify-between space-x-2 my-1">
                                    <h6 className="text-lg  font-medium text-gray-400">
                                      Coupon Applied
                                    </h6>
                                    <div>
                                      <span className="text-lg black-color font-medium ml-2">
                                        ₹{' '}
                                        {Number(
                                          purchaseDetails.totalCouponSavingsAmount
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between space-x-2 my-1">
                                    <h6 className="text-lg success-color font-medium text-gray-400">
                                      Discount
                                    </h6>
                                    <div>
                                      <span className="text-lg success-color font-medium ml-2">
                                        - ₹
                                        {Number(
                                          purchaseDetails.totalSavings
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-2 border-t-2 border-solid pt-2">
                                  <h2 className="text-lg font-bold">
                                    Total Amount
                                  </h2>
                                  <h2 className="text-lg font-bold">
                                    ₹{' '}
                                    {Number(
                                      purchaseDetails?.calculatedPurchaseTotal
                                    ).toFixed(2)}
                                  </h2>
                                </div>
                              </div>
                              {/* <div className="text-center bg-success-color-lighter success-color py-4">
                                                        <span className="text-base fonr-medium">Savings on Bill ₹ {Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                                                    </div> */}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {/* tracking page  */}
                  <div
                    id="cart-total-btn"
                    className=" border-[1px] border-[#E7E7E7] z-10 md:z-0  md:border-[0px] mt-0 sm:mt-20 w-full left-0 fixed sm:relative bottom-0 p-4 sm:p-0 grid grid-cols-2 sm:grid-cols-1 bg-white sm:bg-transparent"
                    style={{
                      bottom: `${mobNavHeight}px`,

                    }}
                  >
                    <div className={` w-full ${cartHeader.status !== 'review' ? 'flex' : 'block'}  md:justify-center md:flex col-span-full`}>

                      {
                        !!user ? (
                          (
                            <>
                              {
                                !payment ?
                                  <Button
                                    className="w-3/4 py-3 hidden md:block sm:py-4 white-color rounded btn-bg text-center"
                                    onClick={() => { setpayment(!payment) }}
                                  >Proceed</Button> :
                                  <Button
                                    className="w-3/4 py-3 hidden md:block sm:py-4 white-color rounded btn-bg text-center"

                                    onClick={() => { initiatePayment() }}
                                    disabled={
                                      cartHeader.status === 'payment' && checkoutDetails?.paymentMethod === ''

                                    }
                                    style={{

                                      opacity: `${checkoutDetails.paymentMethod === '' ? 0.6 : 1}`
                                    }}
                                  >Proceed To Pay</Button>
                              }
                              {
                                cartHeader.status !== 'review' && <div className="w-full md:hidden flex justify-start text-gray-400 ">
                                  <div className='p-3'>
                                    <span className=" text-lg font-semibold">
                                      {totalItems} Items In  cart
                                    </span>
                                    <div className="flex text-black ">
                                      <h2 className="text-lg font-bold">
                                        Total
                                      </h2>
                                      <h2 className="text-lg font-bold mx-2">
                                        ₹{' '}
                                        {Number(
                                          purchaseDetails?.calculatedPurchaseTotal
                                        ).toFixed(2)}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              }
                              {
                                cartHeader.status === 'review' &&
                                <>
                                  <div className="px-3 pb-2 md:hidden sm:px-10">
                                    <div className="flex justify-between space-x-2 ">
                                      <h6 className="text-lg font-medium text-gray-400">
                                        Item Total
                                      </h6>
                                      <div>
                                        <span className="text-lg font-medium ml-2">
                                          ₹{' '}
                                          {Number(
                                            purchaseDetails?.totalOrderAmount
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between space-x-2 my-1">
                                        <h6 className="text-lg  font-medium text-gray-400">
                                          Delivery Charge
                                        </h6>
                                        <div>
                                          <span className="text-lg black-color font-medium ml-2">
                                            {purchaseDetails?.totalDeliveryCharge
                                              ? `₹ ${Number(
                                                purchaseDetails?.totalDeliveryCharge
                                              ).toFixed(2)}`
                                              : 'Free'}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex justify-between space-x-2 my-1">
                                        <h6 className="text-lg  font-medium text-gray-400">
                                          Tax
                                        </h6>
                                        <div>
                                          <span className="text-lg black-color font-medium ml-2">
                                            ₹{' '}
                                            {Number(
                                              purchaseDetails?.totalTaxAmount
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                      {purchaseDetails?.totalConvenienceCharge ? (
                                        <div className="flex justify-between space-x-2 my-1">
                                          <h6 className="text-lg  font-medium text-gray-400">
                                            Convenience Charge
                                          </h6>
                                          <div>
                                            <span className="text-lg black-color font-medium ml-2">
                                              ₹{' '}
                                              {Number(
                                                purchaseDetails?.totalConvenienceCharge
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      ) : null}
                                      <div className="flex justify-between space-x-2 my-1">
                                        <h6 className="text-lg  font-medium text-gray-400">
                                          Coupon Applied
                                        </h6>
                                        <div>
                                          <span className="text-lg black-color font-medium ml-2">
                                            ₹{' '}
                                            {Number(
                                              purchaseDetails?.totalCouponSavingsAmount
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex justify-between space-x-2 my-1">
                                        <h6 className="text-lg success-color font-medium text-gray-400">
                                          Discount
                                        </h6>
                                        <div>
                                          <span className="text-lg success-color font-medium ml-2">
                                            - ₹
                                            {Number(
                                              purchaseDetails?.totalSavings
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between mt-2 border-t-2 border-solid pt-2">
                                      <h2 className="text-lg font-bold">
                                        Total Amount
                                      </h2>
                                      <h2 className="text-lg font-bold">
                                        ₹{' '}
                                        {Number(
                                          purchaseDetails?.calculatedPurchaseTotal
                                        ).toFixed(2)}
                                      </h2>
                                    </div>
                                  </div>
                                  {/* <div className="text-center bg-success-color-lighter success-color py-4">
                                <span className="text-base fonr-medium">Savings on Bill ₹ {Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                            </div> */}
                                </>
                              }

                              {
                                cartHeader.status !== 'review' ?
                                  <div className="p-3 w-full items-center flex justify-end md:hidden">
                                    <Button
                                      className="w-full   md:block py-4 white-color rounded btn-bg text-center"
                                      onClick={() => {
                                        setcartHeader({
                                          ...cartHeader,
                                          active: true, status: cartHeader.status === 'payment' ? 'review' : 'payment'

                                        })
                                      }}
                                      disabled={
                                        cartHeader.status === 'payment' && checkoutDetails?.paymentMethod === ''

                                      }

                                      style={{
                                        opacity: `${cartHeader.status === 'payment' && checkoutDetails.paymentMethod === '' ? 0.6 : 1}`
                                      }}
                                    >Proceed</Button>
                                  </div> :
                                  <div className=" w-full p-3  items-center flex justify-center md:hidden">
                                    <Button
                                      className="w-full  md:block py-4 white-color rounded btn-bg btn-color text-center"
                                      onClick={() => { initiatePayment(), setactive2(true) }}

                                    >Proceed To Pay</Button>
                                  </div>
                              }


                            </>
                          )) :
                          <Button
                            className="w-3/4 py-4 white-color rounded btn-bg btn-color text-center mx-auto"
                            onClick={authToggle}
                          >
                            Login
                          </Button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {
            confirmOrder &&
            <div className="fixed inset-0 z-50 bg-slate-500 bg-opacity-50 " >
              <div className=" absolute left-1/2 h-fit bottom-0 sm:bottom-auto sm:top-1/2 bg-white rounded-md w-full -translate-x-1/2 sm:-translate-y-1/2 p-6" style={{ maxWidth: "556px" }}>
                <h2 className="text-center text-2xl btn-color-revers m-auto"> {'Proceed?'}</h2>
                <div className="py-4 text-center text-base font-medium w-full mb-6">
                  Confirm your Order for  Cash On Delivery
                </div>
                <div className="flex justify-between space-x-4 pt-4 w-full text-white">
                  <Button className="py-3 w-full  font-semibold hover:bg-red-500 hover:text-white text-red-500 border-2 border-red-500 rounded transition-all " onClick={() => setConfirmOrder(false)}>Cancel</Button>
                  <Button className="py-3 w-full bg-red-500  font-semibold   border-2  rounded transition-all" onClick={() => { initiatePayment(); setConfirmOrder(false) }} >Confirm</Button>
                </div>
              </div>
            </div >
          }
          {initiateStatus == 'loading' && !rzpOrder ? (
            <div className="fixed inset-0 left-0 bg-black-color-75">
              <div className="relative w-full h-full">
                <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <h5 className="white-color-75">We are processing your order </h5>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ margin: 'auto', display: 'block' }}
                      width="75px"
                      height="75px"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                    >
                      <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="57.5;42.5;57.5;57.5"
                          keyTimes="0;0.3;0.6;1"
                          dur="1s"
                          begin="-0.6s"
                        ></animate>
                      </circle>{' '}
                      <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="57.5;42.5;57.5;57.5"
                          keyTimes="0;0.3;0.6;1"
                          dur="1s"
                          begin="-0.44999999999999996s"
                        ></animate>
                      </circle>{' '}
                      <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="57.5;42.5;57.5;57.5"
                          keyTimes="0;0.3;0.6;1"
                          dur="1s"
                          begin="-0.3s"
                        ></animate>
                      </circle>{' '}
                      <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="57.5;42.5;57.5;57.5"
                          keyTimes="0;0.3;0.6;1"
                          dur="1s"
                          begin="-0.15s"
                        ></animate>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : initiateStatus == 'loading' && rzpOrder ? (
            <OnlienPayment
              {...{
                store: info,
                user,
                checkout,
                setConfirmPayment,
                rzpOrder,
                setInitiateStatus,
                setError,
              }}
            />
          ) : null}
          {!!error && (
            <div className="py-4 px-8 fixed right-0 bottom-3 rounded-l-md bg-red-color white-color text-base font-medium">
              {error.message}
            </div>
          )}
        </div>
      </div>
      <div className={`md:hidden fixed top-0  ${!cartHeader.active && 'hidden'}   shadow-lg bg-[#48887B] h-[124px] w-full `} style={{ zIndex: 1200 }}>

        <Tracker status={cartHeader.status} active2={active2} />


      </div>

    </>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  info: state.store.info,
  storeSettings: state.store.settings,
  user: state.user.currentUser,
  userAddress: state.user.address,
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
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Cart))
