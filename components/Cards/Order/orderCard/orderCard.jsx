import moment from 'moment';
import { Button } from '../../../inputs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import Rating from '@components/rating-stars/rating';
import { useState } from 'react';
import Link from 'next/link'
function OrderCard({ status, message, data }) {
  const [first, setfirst] = useState(0)


  const changevalue = (value) => {
    setfirst(value)

  }

  let orderStatus = ""
  if (data.orderStatus == "PAYMENT_COMPLETED") {
    orderStatus = "Ordered by " + moment.unix(data.orderPlacedTime).format("MMM, YY")
  }
  else if (data.orderStatus == "ORDER_DELIVERED_SUCCESS") {
    orderStatus = "Delivered on " + moment.unix(data.deliveredTime).format("MMM, YY")
  }
  else if (data.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || data.orderStatus == "CANCELLED_BY_CUSTOMER") {
    orderStatus = "Order Cancelled on " + moment.unix(data.orderCancelledTime).format("MMM, YY")
  }
  console.log(data)

  return (
    <div className="w-full  rounded  bg-white">

      <div className="my-4 px-2 md:mx-0 lg:mx-0 border-gray-200 w-full grid grid-cols-4">
        {/* <div className='w-full flex my-6'> */}
        {/* <div className=" px-2 md:px-8 flex md:grid md:grid-cols-2  w-full items-center "> */}
        <div className=" w-[100px] h-[100px] rounded bg-gray-900 shrink-0 col-span-1">
          <img className=" w-[100px] h-[100px] rounded object-cover opacity-80" src={` ${Object.values(data.orderItems)[0]?.itemImg || '/img/default.png'}`} />
        </div>
        {/* <div className=" ml-4 md:ml-0 w-full  ">
              <p className={`text-left font-bold  ${data?.orderStatus === 'CANCELLED_BY_CUSTOMER' ? " text-sm text-[red]" : " text-base text-[#1DAE81]"} `}>{data?.deliveredTime !== null ? `Delivered on ${data?.deliveredTime} ` : data?.orderStatus} </p>
              <p className="text-left text-base font-medium text-black mt-4">{Object.values(data.orderItems)[0]?.itemName}</p>
            </div> */}
        {/* </div> */}
        <div className='flex justify-between col-span-3'>
          <div className="ml-8 lg:ml-4 flex flex-col justify-center">
            <p className={`font-bold  ${data?.orderStatus == 'CANCELLED_BY_CUSTOMER' || data?.orderStatus=='ORDER_DECLINED_BY_RESTAURANT' ? "text-xs lg:text-base text-[red]" : "text-xs lg:text-base btn-color-revese"} `}>{orderStatus} </p>
            <p className="text-left text-sm lg:text-base font-medium text-black mt-4">{Object.values(data.orderItems)[0]?.itemName}</p>
          </div>
          <div className="mr-2  w-max flex justify-end items-center cursor-pointer">
            <Button type="link" href={`/account/orderdetail/${data.orderId}`}>
              <MdKeyboardArrowRight className="text-gray-500" size={30} />
            </Button>

          </div>
        </div>

        {/* </div> */}

      </div>
      {/* {
        data?.deliveredTime !== null ? <>
          <div className="flex justify-between mx-4 lg:mx-8">
            <div className=" text-black">
              <p className={`text-left font-bold text-xs lg:text-base text-black flex items-center`}>Rate Your Purchase</p>
              <Rating place="order" className="h-max" size={24}  count={5} value={0} changevalue={changevalue} />

            </div>
            <p className={`text-left flex  font-bold text-xs lg:text-base text-[#1DAE81] items-end mb-2`}>Write a Review </p>

          </div>

        </> : ""
      } */}
      {/* {
        status === 'past' ?
          <div className=" m-4 w-full h-full flex justify-between align-center">
            <p className="text-lg font-semibold text-dark mb-2">{data.isDelivery=== "N"? 'Order Cancelled':"Delivery Success"}</p>
          </div>
          :
          <Button type='link' href={`/account/orderdetail/${data.orderId}`}>
            <div className=" m-4 w-full h-full flex justify-center align-center">
              <p className="text-lg font-semibold text-red-500 mb-2">Track Order</p>
            </div>
          </Button>
      } */}

    </div>
  )
}

export default OrderCard
