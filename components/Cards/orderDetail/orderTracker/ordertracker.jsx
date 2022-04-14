import React from 'react'
import Tracker from './tracker';

function Ordertracker({ data,details,openReturn }) {
  console.log(details)
  return (
    <div className="w-full border-t-2 border-[#00000]  rounded-b  bg-white">

      <div className="    w-full flex justify-between">
        <div className=' w-full mt-6 '>
          <div className="px-4  w-full  ">
            <div className="  w-full    ">
              <Tracker details={details} />
            </div>

          </div>
          <div className="mt-4 w-full border-t-2 border-[#00000] h-full">
          <div className=" px-4 my-4  w-full flex justify-end  items-center  ">
            {
              details.orderStatus!=="CANCELLED_BY_CUSTOMER"?
              <p className='text-[#48887B] cursor-pointer mr-6 font-bold'  onClick={() => openReturn(true)}>Cancel</p>
 :
 <p className='text-[#48887B] cursor-pointer mr-6 font-bold'  >Order Cancelled</p>

            }
                 <p className='text-[#48887B] cursor-pointer font-bold '>Need Help?</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Ordertracker
