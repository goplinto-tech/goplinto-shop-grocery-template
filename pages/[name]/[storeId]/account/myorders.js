import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import withAuth from '@components/auth/withAuth'
import OrderCard from '@components/Cards/Order/orderCard/orderCard'
import accountLayout from '@components/layout/account-layout'
import Loader from '@components/loading/loader'
import ErrorPage from '@components/error'
// Actions
import { getCurrentOrdersListStart, getPastOrdersListStart } from '@redux/orders/orders-action'
import PageWrapper from '@components/page-wrapper/page-wrapper'

function Myorders({ user, getCurrentOrders, getPastOrders }) {
  const [orderList, setOrderList] = useState([]);
  const [orderListPast, setOrderListPast] = useState([]);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState('loading')
  const [isLoadingPast, setIsLoadingPast] = useState('loading')
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentOrders({ userId: user.customer_id, setOrderList, setError, setIsLoadingCurrent })
    getPastOrders({ userId: user.customer_id, setOrderList: setOrderListPast, setError, status: setIsLoadingPast })
  }, [])

  // useEffect(() => {
  //   setIsLoading((orderList.length || orderListPast.length) && true)
  // }, [orderList, orderListPast])
  console.log(orderList, orderListPast);
  return (
    <>
      {
        isLoadingCurrent == 'loading' && isLoadingPast == 'loading' && !error ?
          <Loader />
          : error ?
            <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
            :
            <>
              {/* <Header display={true} topic="My Orders" /> */}

              <p className="text-xl mx-2 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold">
                {' '}
                Current Orders
              </p>
              <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                {
                  orderList.length ? orderList.map((item, i) => (
                    <div className="w-full rounded-lg shadow " key={i}>
                      <OrderCard data={item} />
                    </div>
                  ))
                    :
                    <div className=" col-span-full h-40 flex justify-center items-center">
                      <p className='text-lg'>You don't have any active orders!.</p>
                    </div>
                }
              </div>
              <p className="text-xl mx-2 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold"> Past Orders</p>
              <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                {
                  orderListPast.length ?
                    orderListPast.map((item, i) => (
                      <div className="w-full rounded-lg shadow" key={i}>
                        <OrderCard data={item} status={'past'} message={'Delivery Success'} />
                      </div>
                    ))
                    :
                    <div className=" col-span-full h-40 flex justify-center items-center">
                      <p className='text-lg'>You haven't past ordered !</p>
                    </div>
                }
              </div>
            </>
      }
    </>
  )
}


const mapDispatchToProps = dispatch => ({
  getCurrentOrders: (payload) => dispatch(getCurrentOrdersListStart(payload)),
  getPastOrders: (payload) => dispatch(getPastOrdersListStart(payload))
})

export default connect(null, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Myorders))))
