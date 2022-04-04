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
        <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </button>
        <span className='text-base font-semibold'>Order Details</span>
      </div>
      <section className="bg-gray-100 w-full ">
        <div className='wrapper mx-auto'>
          {
            !orderDetails && !error ?
              <Loader />
              : error ?
                <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
                :
                <div className="grid grid-cols-1 lg:grid-cols-12 ">
                  <div className="lg:col-span-8  mt-10 lg:mb-10 ">
                    <Ordertracker data={{ orderId: orderDetails.orderId }} details={orderDetails} />
                    <List orderId={orderDetails.orderId} storeName={orderDetails.storeName} createTime={orderDetails.createTime} list={Object.values(orderDetails.orderItems)} openReturn={setIsReturnActive} />
                    {
                      !!address &&
                      <Address address={address} />
                    }
                  </div>
                  <div className="  lg:col-span-4 lg:mx-8 ">
                    <div className="mt-10 pb-10 bg-white rounded">
                      <div className="px-3 py-8 sm:px-10 border-b-2 rounded">
                        <h2>Invoice</h2>
                      </div>
                      {
                        !!orderDetails &&
                        <>
                          <div className="px-3 py-10 sm:px-10">
                            <div className="flex justify-between space-x-2 border-b-2 border-dashed pb-6">
                              <h6 className="text-lg font-semibold">Item Total</h6>
                              <div>
                                <span className="black-color-75 text-base">{orderDetails.itemCount} item(s)</span>
                                <span className="text-lg font-medium ml-2">₹ {Number(orderDetails.orderAmount).toFixed(2)}</span>
                              </div>
                            </div>
                            <div className=" border-b-2 border-dashed">

                              <div className="flex justify-between space-x-2 my-4">
                                <h6 className="text-lg black-color font-medium">Delivery Charge</h6>
                                <div>
                                  <span className="text-lg black-color font-medium ml-2">{parseFloat(orderDetails.deliveryCharge) ? `₹${Number(orderDetails.deliveryCharge).toFixed(2)}` : 'Free'}</span>
                                </div>
                              </div>

                              <div className="flex justify-between space-x-2 my-4">
                                <h6 className="text-lg black-color font-medium">Tax</h6>
                                <div>
                                  <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.taxAmount).toFixed(2)}</span>
                                </div>
                              </div>
                              {
                                orderDetails.convenienceFee ?
                                  <div className="flex justify-between space-x-2 my-4">
                                    <h6 className="text-lg black-color font-medium">Convenience Charge</h6>
                                    <div>
                                      <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.convenienceFee).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  : null
                              }
                              <div className="flex justify-between space-x-2 my-4">
                                <h6 className="text-lg black-color font-medium">Coupon Applied</h6>
                                <div>
                                  <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.couponSavingsAmount).toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex justify-between space-x-2 my-4">
                                <h6 className="text-lg success-color font-medium">Discount</h6>
                                <div>
                                  <span className="text-lg success-color font-medium ml-2">- ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4 border-dashed">
                              <h2 className="text-2xl font-bold">Total Amount</h2>
                              <h2 className="text-2xl font-bold">₹ {Number(orderDetails.calculatedOrderTotal).toFixed(2)}</h2>
                            </div>

                          </div>
                          <div className="text-center bg-success-color-lighter success-color py-4">
                            <span className="text-base fonr-medium">Savings on Bill ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </div>
          }
        </div>
        {
          isReturnActive && orderDetails &&
          <Return action={'return'} items={orderDetails.orderItems} orderId={orderDetails.orderId} closeRetun={setIsReturnActive} />
        }
      </section>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  getOrderDetails: (payload) => dispatch(getOrderDetailsStart(payload))
})

export default connect(null, mapDispatchToProps)(PageWrapper(orderDetail))
