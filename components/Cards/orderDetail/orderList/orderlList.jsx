import moment from 'moment'
import { Button } from '../../../inputs'

function orderlList({ list, storeName, orderId, createTime, openReturn }) {
  return (
    <div className="w-full   mb-1  ">
      <div className=" lg:w-full  bg-white ">
        <div className="flex lg:grid lg:grid-cols-1   ">
          <div className=" bg-white w-full  ">

            <div className=" flex w-full justify-between    my-2 md:my-2   ">
              <p className="hidden md:block lg:block  mx-4 text-left font-bold text-sm md:w-max">Order Details</p>



              <p className=" hidden md:block text-left mx-4 text-sm font-medium text-gray-500 md:w-max ">OrderId- #{orderId}</p>


            </div>
          </div>


        </div>
      </div>
      {
            list?.map((item, i) => (
      <div key={i} className="mt-1 rounded bg-white ">
        <div className=' px-4 md:px-0  py-6'>

              <div className="grid grid-cols-2 items-center" >
                <div className="flex justify-start">
                  <div className=" lg:mx-6  md:mx-6 flex max-w-fill ">
                    <Button className=" mt-2 rounded bg-gray-900 md:w-[131px] md:h-[131px] w-20 h-20 shrink-0 block" type='link' href={`/product/${item.orderItemId}`}>
                      <img className="w-full h-full rounded object-cover opacity-80" src={item.itemImg || '/img/default.png'} />
                    </Button>


                  </div>
                </div>
                <div className='flex justify-start'>

                <div className=" flex-col items-center  mt-4 mx-6 md:ml-6 ">
                      <Button type='link' href={`/product/${item.orderItemId}`}>
                        <p className="text-left font-semibold text-base text-dark mt-2 ">{item.itemName}</p>
                      </Button>
                      <div className="  my-2  ">
                  <div className="   items-center ">
                    <p className="text-left  text-lg font-bold text-gray-900  ">₹ {item.discountedOrderItemAmount}</p>
                  </div>
                </div>
                    </div>

                  </div>

              </div>

        </div>
        </div>
        ))
          }
          <div>
            {/* <div> */}
        {/* <div className='pt-8 px-8'>
          <span className='text-lg '>Having problem with order?</span>
          <Button className='inline ml-2 btn-color-revers' onClick={() => openReturn(true)} >Cancel Order</Button>
        </div>
      </div> */}
    </div>
    </div>
  )}

export default orderlList
