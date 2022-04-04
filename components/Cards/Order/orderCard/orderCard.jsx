import moment from 'moment';
import { Button } from '../../../inputs'
import { MdKeyboardArrowRight } from 'react-icons/md';
function OrderCard({ status, message, data }) {
  console.log(data)
  return (
    <div className="w-full  border-2 md:rounded-lg lg:rounded-lg  bg-white">
      <div className="my-4 mx-2 md:mx-0 lg:mx-0 w-full flex justify-between">

        <div className="lg:px-4 md:pl-4 w-full flex items-center ">
          {/* <div className="w-1/4  rounded bg-gray-900">
            <img className="w-full h-full rounded object-center opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" />
          </div> */}
          <div className=" w-max md:w-full lg:w-full ml-2 md:mx-2  lg:mx-2  ">
            <p className="text-left font-bold text-sm w-max capitalize">{data.storeName.toLowerCase()}</p>
            <p className="text-left text-sm font-medium text-gray-500 ">Order #{data.orderId}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-4 lg:mt-4  w-full relative -left-4 md:-left-0 lg:-left-0 flex justify-end ">
          <p className="text-left  text-sm font-medium text-gray-500  lg:mr-4  mr-2">{moment(data.orderPlacedTime).format('lll')}</p>
        </div>
      </div>
      <div className="my-4 mx-2 md:mx-0 lg:mx-0 border-t-2  border-gray-200 border-b-2  w-full flex justify-between">
        <div className='flex w-full my-6'>
          <div className=" lg:px-4 md:pl-4  w-full flex items-center space-x-4">
            <div className="w-28 h-28 rounded bg-gray-900 shrink-0">
              <img className="w-full h-full rounded object-cover opacity-80" src="/img/default.png" />
            </div>
            <div className="  w-full  ">
              <p className="text-left font-semibold text-lg  text-red-600">{data?.orderStatus}</p>
              {/* <p className="text-left text-base font-medium text-gray-500 mt-2">Waiting for Confirmation.!</p> */}
            </div>
          </div>
          <div className="mt-5 mr-4  w-full flex justify-end w-max align-center">
            <MdKeyboardArrowRight className="text-gray-500" size={30} />
          </div>
        </div>
      </div>
      {
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
      }

    </div>
  )
}

export default OrderCard
