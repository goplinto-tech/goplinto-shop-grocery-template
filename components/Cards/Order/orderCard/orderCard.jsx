import moment from 'moment';
import { Button } from '../../../inputs'
import { MdKeyboardArrowRight } from 'react-icons/md';
import Rating from '@components/rating-stars/rating';
import { useState } from 'react';
import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
function OrderCard({ status, message, data }) {
  const router = useRouter()
  const [first, setfirst] = useState(0)
  const [orderCardImg, setOrderCardImg] = useState([])

  useEffect(() => {
    if (data) {
      var item = Object.values(data.orderItems)[0]
      if(item){
      var img = []
      if (item.customizationDetails != null) {
        if (item.customizationDetails.variant_item_attributes) {
          for (let i = 1; i <= Object.keys(item.customizationDetails.variant_item_attributes).length; i++) {
            if (item.customizationDetails.variant_item_attributes[`variant_value_${i}`] != null) {
              if (item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images != null) {
                if (typeof item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'string') {
                  img = Object.values(JSON.parse(item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                  setOrderCardImg(img)
                }
                else if (typeof item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'object') {
                  img = Object.values(item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images).filter(Boolean);
                  setOrderCardImg(img)
                }
              }
            }

          }
          if (!img.length) {
            img = ['/img/default.png']
            setOrderCardImg(img)
          }

        }
      }
      else {
        img = [item.itemImg || '/img/default.png']
        setOrderCardImg(img)
      }
    }
    }
  }, [data])

  const changevalue = (value) => {
    setfirst(value)

  }

  let orderStatus = ""
  if (data.orderStatus == "PAYMENT_COMPLETED" || data.orderStatus == "ORDER_CONFIRMED_BY_REST" || data.orderStatus == "PENDING_PICKUP_BY_CUST") {
    orderStatus = "Ordered on " + moment.unix(data.orderPlacedTime).format("MMM DD, YYYY")
  }
  else if (data.orderStatus == "ORDER_DELIVERED_SUCCESS") {
    orderStatus = "Delivered on " + moment.unix(data.deliveredTime).format("MMM DD, YYYY")
  }
  else if (data.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || data.orderStatus == "CANCELLED_BY_CUSTOMER") {
    orderStatus = "Order Cancelled on " + moment.unix(data.orderCancelledTime).format("MMM DD, YYYY")
  }
  console.log(data)

  return (
    <div className="w-full  rounded  bg-white">

      <div className="p-2 sm:p-4 md:mx-0 lg:mx-0 border-gray-200 flex justify-between">
        <div className='flex'>
          <div className="h-[86px] w-[86px] sm:w-[150px] sm:h-[150px] rounded bg-gray-900 shrink-0 col-span-2">
            {/* <img className=" w-full h-full rounded object-cover opacity-80" src={` ${Object.values(data.orderItems)[0]?.itemImg || '/img/default.png'}`} /> */}
            <img onClick={()=>router.push(`/account/orderdetail/${data.orderId}`)} className="cursor-pointer w-full h-full rounded object-cover opacity-80" src={orderCardImg[0]} />
          </div>
          <div onClick={()=>router.push(`/account/orderdetail/${data.orderId}`)} className="ml-8 lg:ml-4 flex flex-col justify-center cursor-pointer">
            <p className={`font-bold  ${data?.orderStatus == 'CANCELLED_BY_CUSTOMER' || data?.orderStatus == 'ORDER_DECLINED_BY_RESTAURANT' ? " text-[red]" : `${data.orderStatus == "ORDER_DELIVERED_SUCCESS" ? "text-[green]" : "text-black"} `} `}>{orderStatus} </p>
            <p className="text-left text-sm lg:text-base font-medium text-black mt-4 line-truncate-2">{Object.values(data.orderItems)[0]?.itemName}</p>
            {Object.values(data.orderItems).length>1&&<p className='text-sm mt-2 text-[#f68d3d] font-medium'>{`+${Object.values(data.orderItems).length-1} more items`}</p>}
          </div>
        </div>
        <div className='flex justify-between col-span-3'>
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
