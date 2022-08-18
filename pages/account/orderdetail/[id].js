import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import moment from 'moment';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Ordertracker from '@components/Cards/orderDetail/orderTracker/ordertracker.jsx'
import List from '@components/Cards/orderDetail/orderList/orderlList'
import Address from '@components/Cards/orderDetail/address/adress'
import Loader from '@components/loading/loader'
import Return from '@components/Cards/Order/Action/Return'
// Actions
import { getOrderDetailsStart } from '@redux/orders/orders-action'
import ErrorPage from '@components/error'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import accountLayout from '@components/layout/account-layout'
import Review from '@components/Cards/Review/review'
import { BsArrowLeft } from 'react-icons/bs'
import withAuth from '@components/auth/withAuth';
import Stepper from '@components/stepper/stepper';


function orderDetail({ getOrderDetails, display, info }) {
  const [isReturnActive, setIsReturnActive] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null) // {}
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null) // {}
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false)
  const [isTrackerOpen, setIsTrackerOpen] = useState(false)

  useEffect(() => {
    const { id } = router.query
    if (id) {
      getOrderDetails({ orderId: id, setOrderDetails, setError })
    }
  }, [router.isReady])
  useEffect(() => {
    if (orderDetails) {
      setAddress(orderDetails.deliveryAddressDetails)
    }
  })


  const steps = [
    {
      lable: 'Order Placed',
      dsc: moment.unix(orderDetails?.orderPlacedTime).format('LLL')
    },
    {
      lable: 'Order Confirmed',
    },
    {
      lable: 'Ready for pick-up',
    },
    {
      lable: 'Order Delivered Successfully',
    }

  ];

  const cancledStep = [
    {
      lable: 'Order Placed',
      dsc: moment.unix(orderDetails?.orderPlacedTime).format('LLL')
    },
    {
      lable: 'Order Canceled',
      icon: true
    }

  ]

  useEffect(() => {
    if (orderDetails?.orderStatus) {
      if (orderDetails?.orderStatus == "PAYMENT_COMPLETED") {
        setOrderStatus(0)
      }
      else if (orderDetails?.orderStatus == "ORDER_CONFIRMED_BY_REST") {
        setOrderStatus(1)
      }
      else if (orderDetails?.orderStatus == "PENDING_PICKUP_BY_CUST") {
        setOrderStatus(2)
      }
      else if (orderDetails?.orderStatus == "ORDER_DELIVERED_SUCCESS") {
        setOrderStatus(3)
      }
      else if (orderDetails?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || orderDetails?.orderStatus == "CANCELLED_BY_CUSTOMER" || orderDetails?.orderStatus == "ORDER_CANCELLED_BY_REST") {
        setIsCanceled(true)
        setOrderStatus(1)
      }
    }
  }, [orderDetails])
  const style = display ? {
    compoleted: {
      color: display.secondary_color || '#E83B3B'
    },
    active: {
      color: '#E83B3B'
    },
    pending: {
      color: '#c5c5c5'
    },
    check: {
      color: '#fff'
    },
  } : {}

  const handleCancel = () => {
    if (orderDetails?.orderStatus == "ORDER_CONFIRMED_BY_REST" || orderDetails?.orderStatus == "PENDING_PICKUP_BY_CUST" || orderDetails?.orderStatus == "ORDER_DELIVERED_SUCCESS") {
      toast.error(`Order can’t be canceled after confirmation, please reach out to ${"+" + info?.primary_phone}`, {
        autoClose: 2000
      })
    }
    else {
      setIsReturnActive(true)
    }
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 mt-20' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
        {
          orderDetails?.orderId &&
          <span className='text-base text-gray-400 '>Order Id - {orderDetails?.orderId} </span>
        }
      </div>
      <div className=" lg:w-full bg-white flex justify-between px-4 sm:px-6 mb-0 sm:mb-6 py-0 sm:py-6 md:py-3">
        <p className="hidden md:block lg:block text-left font-bold text-lg md:w-max">Order Details</p>
        <p className=" hidden md:block text-left font-medium text-lg text-gray-500 md:w-max ">OrderId- #{orderDetails?.orderId}</p>
      </div>
      <section className="bg-gray-100 w-full pb-1 lg:pb-0">
        <div className='mx-auto'>
          {
            !orderDetails && !error ?
              <Loader />
              : error ?
                <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
                :
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 ">
                    <div className="lg:col-span-12 mb-3 lg:mb-5 space-y-3 ">
                      <div className="bg-white">
                        <List orderId={orderDetails.orderId} storeName={orderDetails.storeName} createTime={orderDetails.createTime} list={Object.values(orderDetails.orderItems)} />
                        {/* <Ordertracker data={{ orderId: orderDetails.orderId }} details={orderDetails} openReturn={setIsReturnActive} /> */}
                        <div className='py-8 ml-8 lg:ml-14'>
                          <Stepper vertical={true} steps={isCanceled ? cancledStep : steps} activeStep={orderStatus + 1} sx={style} openReturn={handleCancel} details={orderDetails} isCanceled={isCanceled} />
                        </div>
                      </div>
                      {
                        !!address &&
                        <div className='p-4 sm:p-6 bg-white'>
                          <Address address={address} type={'order'} orderDetails={orderDetails} />
                        </div>
                      }
                      <div className="p-4 sm:p-6 bg-white">
                        {/* <FiHome className='text-red-500' size={20} /> */}
                        <p className="text-left  text-lg sm:text-xl mb-6 font-bold text-dark ">Billing Details</p>

                        {
                          !!orderDetails &&
                          <>
                            <div className=" text-base">
                              <div className=" border-b-2 border-dashed space-y-2">

                                <div className="flex justify-between space-x-2 ">
                                  <h6 className="text-base black-color font-medium">Item Total</h6>
                                  <div>
                                    <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.orderAmount).toFixed(2)}</span>
                                  </div>
                                </div>
                                {parseFloat(orderDetails.deliveryCharge) ?<div className="flex justify-between space-x-2 ">
                                  <h6 className="text-base black-color font-medium">Delivery Charge</h6>
                                  <div>
                                    <span className="text-base black-color font-medium ml-2">{parseFloat(orderDetails.deliveryCharge) ? `₹${Number(orderDetails.deliveryCharge).toFixed(2)}` : 'Free'}</span>
                                  </div>
                                </div>:""}
                                {
                                  !!Number(orderDetails.parcelCharge) &&
                                  <div className="flex justify-between space-x-2 ">
                                    <h6 className="text-base black-color font-medium">Parcel Charge</h6>
                                    <div>
                                      <span className="text-base black-color font-medium ml-2">₹{Number(orderDetails.parcelCharge).toFixed(2)}</span>
                                    </div>
                                  </div>
                                }

                                <div className="flex justify-between space-x-2 ">
                                  <h6 className="text-base black-color font-medium">Tax</h6>
                                  <div>
                                    <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.taxAmount).toFixed(2)}</span>
                                  </div>
                                </div>
                                {
                                  Number(orderDetails.convenienceFee)>0 ?
                                    <div className="flex justify-between space-x-2 ">
                                      <h6 className="text-base black-color font-medium">Convenience Charge</h6>
                                      <div>
                                        <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.convenienceFee).toFixed(2)}</span>
                                      </div>
                                    </div>
                                    : null
                                }
                                {Number(orderDetails.couponSavingsAmount)>0&&<div className="flex justify-between space-x-2 ">
                                  <h6 className="text-base black-color font-medium">Coupon Applied</h6>
                                  <div>
                                    <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.couponSavingsAmount).toFixed(2)}</span>
                                  </div>
                                </div>}
                                <div className="flex justify-between space-x-2 ">
                                  <h6 className="text-base success-color font-medium">Discount</h6>
                                  <div>
                                    <span className="text-base success-color font-medium ml-2">- ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between mt-4 border-dashed">
                                <h2 className="text-lg font-bold">Total Amount</h2>
                                <h2 className="text-lg font-bold">₹ {Number(orderDetails.calculatedOrderTotal).toFixed(2)}</h2>
                              </div>

                              {/* <div className="text-center bg-success-color-lighter success-color py-3 mt-4">
                          <span className="text-base fonr-medium">Savings on Bill ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                        </div> */}
                            </div>
                          </>
                        }
                      </div>


                      {/* <div className="px-4 sm:px-6 py-0 sm:py-6 md:py-3 bg-white flex justify-between mb-96">
                      {
                        !!orderDetails?.paymentDetails &&
                        <div className="flex">
                          <p className="text-left mr-4 mb-0 font-[600]  text-base sm:text-xl  text-black"> Payment Method: </p>
                          <p className="text-center  mt-0 mb-0 font-[300] text-bae sm:text-xl  text-green-400 capitalize ">{orderDetails?.paymentDetails[0].payment_mode == 'WALLET' ? 'Wallet' : orderDetails?.paymentDetails[0].payment_mode ? orderDetails?.paymentDetails[0].payment_mode : 'Online'}</p>
                        </div>
                      }
                      <div className="flex">
                        <p className="text-left mr-4 mb-0 font-[600]  text-base sm:text-xl  text-black"> Shipping method: </p>
                        <p className="text-center  mt-0 mb-0 font-[300] text-bae sm:text-xl  text-green-400 capitalize ">Pick Up</p>
                      </div>
                    </div> */}

                    </div>
                  </div>

                  <div className="px-4 sm:px-6 py-3 md:py-3 bg-white md:flex md:justify-between mb-[70px] md:mb-[20px] ">
                    {
                      !!orderDetails?.paymentDetails &&
                      <div className="flex">
                        <p className="text-left mr-4 mb-0 font-[600]  text-base sm:text-xl  text-black"> Payment Method: </p>
                        <p className="text-center  mt-0 mb-0 font-[300] text-bae sm:text-xl  text-green-400 capitalize ">{orderDetails?.paymentDetails.map((item) => item.payment_mode).join('+')}</p>
                      </div>
                    }
                    <div className="flex mt-2 md:mt-0">
                      <p className="text-left mr-4 mb-0 font-[600]  text-base sm:text-xl  text-black"> Shipping method: </p>
                      <p className="text-center  mt-0 mb-0 font-[300] text-bae sm:text-xl  text-green-400 capitalize ">{orderDetails?.isDelivery == "Y" ? "Delivery" : "Pick Up"}</p>
                    </div>
                  </div>
                </>


          }
        </div>
        {
          isReturnActive && orderDetails &&
          <Return action={'Cancel'} items={orderDetails.orderItems} orderId={orderDetails.orderId} closeRetun={setIsReturnActive} />
        }
      </section>
      <div className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `} style={{ zIndex: 1200 }}>
        {/* <Tracker status={cartHeader.status}/> */}
        <div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4 nav-items-color`} size={35} />
          <p className={`text-2xl nav-items-color mx-4`}>Order Details</p>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  display: state.store.displaySettings,
  info: state.store.info,
})

const mapDispatchToProps = dispatch => ({
  getOrderDetails: (payload) => dispatch(getOrderDetailsStart(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(orderDetail))))
