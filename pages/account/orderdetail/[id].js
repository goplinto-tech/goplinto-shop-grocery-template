import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

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


function orderDetail({ getOrderDetails }) {
  const [isReturnActive, setIsReturnActive] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null) // {}
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null) // {}
  const router = useRouter()

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

  return (
    <>
      <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
        {
          orderDetails?.orderId &&
          <span className='text-base text-gray-400 '>Order Id - {orderDetails?.orderId} </span>
        }
      </div>
      <section className="bg-gray-100 w-full ">
        <div className=' mx-auto'>
          {
            !orderDetails && !error ?
              <Loader />
              : error ?
                <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
                :
                <div className="grid grid-cols-1 lg:grid-cols-12 ">
                  <div className="lg:col-span-12 lg:mb-10 ">
                    <div className="bg-white">
                      <List orderId={orderDetails.orderId} storeName={orderDetails.storeName} createTime={orderDetails.createTime} list={Object.values(orderDetails.orderItems)} />
                      <Ordertracker data={{ orderId: orderDetails.orderId }} details={orderDetails} openReturn={setIsReturnActive} />
                    </div>
                    {
                      !!address &&
                      <Address address={address} type={'order'} orderDetails={orderDetails} />
                    }
                    <div className="py-6 bg-white">
                      {/* <FiHome className='text-red-500' size={20} /> */}
                      <p className="text-left text-lg m-6 font-bold text-dark ">Billing Details</p>

                      {
                        !!orderDetails &&
                        <>
                          <div className=" px-6 pb-6 text-base">
                            <div className=" border-b-2 border-dashed space-y-2">

                              <div className="flex justify-between space-x-2 ">
                                <h6 className="text-base black-color font-medium">Item Total</h6>
                                <div>
                                  <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.orderAmount).toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex justify-between space-x-2 ">
                                <h6 className="text-base black-color font-medium">Delivery Charge</h6>
                                <div>
                                  <span className="text-base black-color font-medium ml-2">{parseFloat(orderDetails.deliveryCharge) ? `₹${Number(orderDetails.deliveryCharge).toFixed(2)}` : 'Free'}</span>
                                </div>
                              </div>
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
                                orderDetails.convenienceFee ?
                                  <div className="flex justify-between space-x-2 ">
                                    <h6 className="text-base black-color font-medium">Convenience Charge</h6>
                                    <div>
                                      <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.convenienceFee).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  : null
                              }
                              <div className="flex justify-between space-x-2 ">
                                <h6 className="text-base black-color font-medium">Coupon Applied</h6>
                                <div>
                                  <span className="text-base black-color font-medium ml-2">₹ {Number(orderDetails.couponSavingsAmount).toFixed(2)}</span>
                                </div>
                              </div>
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
                    <div className="px-6 rounded mt-4 bg-white  w-full flex ">
                      <div className="w-full my-4  ">
                        {
                          !!orderDetails?.paymentDetails &&
                          <div className="flex">
                            <p className="text-left mr-4 mb-0 font-[600] text-lg  text-black"> Payment Method: </p>
                            <p className="text-center  mt-0 mb-0 font-[300] text-lg  text-green-400">{orderDetails?.paymentDetails[0].payment_mode ? "Cash On Delivery (COD)" : 'Online'}</p>
                          </div>
                        }
                      </div>
                    </div>
                    {/* <Review /> */}
                  </div>

                </div>
          }
        </div>
        {
          isReturnActive && orderDetails &&
          <Return action={'return'} items={orderDetails.orderItems} orderId={orderDetails.orderId} closeRetun={setIsReturnActive} />
        }
      </section>
      <div className={`md:hidden fixed top-0     shadow-lg nav-bg h-[122px] w-full `} style={{ zIndex: 1200 }}>
        {/* <Tracker status={cartHeader.status}/> */}
        <div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4`} size={35} color={'white'} />
          <p className={`text-2xl text-[white] mx-4`}>Order Details</p>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  getOrderDetails: (payload) => dispatch(getOrderDetailsStart(payload))
})

export default connect(null, mapDispatchToProps)(PageWrapper(accountLayout(orderDetail)))
