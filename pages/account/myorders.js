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
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs'

function Myorders({ user, getCurrentOrders, getPastOrders,info }) {
  const [orderList, setOrderList] = useState([]);
  const [orderListPast, setOrderListPast] = useState([]);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState('loading')
  const [isLoadingPast, setIsLoadingPast] = useState('loading')
  const [error, setError] = useState("");
  const router = useRouter()
  console.log('storeIdddd',info)

  useEffect(() => {
    getCurrentOrders({ userId: user.customer_id, setOrderList, setError, setIsLoadingCurrent,storeId:info.store_id })
    // getPastOrders({ userId: user.customer_id, setOrderList: setOrderListPast, setError, status: setIsLoadingPast })
  }, [])

  // useEffect(()=>{
  //   if(isLoadingCurrent=="success"){
  //     getPastOrders({ userId: user.customer_id, orderList, setOrderList: setOrderList, setError, status: setIsLoadingPast })
  //   }
  // },[isLoadingCurrent])

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


              <div className="grid grid-cols-1 gap-4 md:mt-5 mt-28 lg:mt-0 mb-[90px] md:mb-4">
                {
                  orderList.length ? orderList.map((item, i) => (
                    <div className="w-full rounded shadow bg-white" key={i}>
                      <OrderCard data={item} />
                    </div>
                  ))
                    :
                    <div className=" col-span-full h-40 flex justify-center items-center">
                      <p className='text-lg'>You don't have any active orders!.</p>
                    </div>
                }
              </div>

              {/* <div className="grid grid-cols-1 gap-6 mb-4">
                {
                  orderListPast.length ?
                    orderListPast.map((item, i) => (
                      <div className="w-full rounded shadow bg-white" key={i}>
                        <OrderCard data={item} status={'past'} message={'Delivery Success'} />
                      </div>
                    ))
                    :
                    <div className=" col-span-full h-40 flex justify-center items-center">
                      <p className='text-lg'>You haven't past ordered !</p>
                    </div>
                }
              </div> */}
            </>
      }
      <div className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `} style={{ zIndex: 1200 }}>

        {/* <Tracker status={cartHeader.status}/> */}
        <div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4 nav-items-color`} size={35} />
          <p className={`text-2xl nav-items-color mx-4`}>My Orders</p>
        </div>




      </div>
    </>
  )
}


const mapDispatchToProps = dispatch => ({
  getCurrentOrders: (payload) => dispatch(getCurrentOrdersListStart(payload)),
  // getPastOrders: (payload) => dispatch(getPastOrdersListStart(payload))
})
const mapStateToProps = (state) => ({
  info: state.store.info,

})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Myorders))))
