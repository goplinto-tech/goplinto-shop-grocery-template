import React from 'react'
import { FiHome } from 'react-icons/fi'

function adress({ address, place, orderDetails }) {

  return (
    <div className="w-full mt-1  rounded  bg-white">
      <div className="my-4  w-full flex justify-between">

        {
          place = 'order' ? <>
            <div className="px-6   w-full flex ">
              <div className="  w-full mb-0  ">
                <p className="text-center font-bold text-xl  text-dark">Shipping Details and Invoice</p>
                <div className="flex mt-6">
                  {/* <FiHome className='text-red-500' size={20} /> */}
                  <div>
                    <p className="text-left font-bold text-lg  text-dark">Address</p>
                    {
                      address &&
                      <>
                        <p className="text-left text-base my-4 mb-0 font-[100]  text-black"> {address?.address_line_1}, {address?.address_line_2 && ","} </p>
                        <p className="text-left text-base my-4 mt-0 mb-0 font-[100]  text-black"> {address?.city}, {address?.state} - {address?.zip_code}</p>
                        <p className="text-left text-base my-4 mt-0 font-[100]  text-black"> mob. {address?.phone}</p>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </> :
            <div className="px-4  w-full flex ">
              <div className="  w-full  m-4  ">
                <p className="text-left font-bold text-xl  text-dark">Delivery Address</p>
                <div className="flex mt-6">
                  <FiHome className='text-red-500' size={20} />
                  <div>
                    <p className="text-left mx-4 font-bold text-base  text-dark">Home</p>
                    {
                      address &&
                      <p className="text-left m-4 font-medium text-base  text-gray-500">{address?.full_name}, {address?.address_line_1}, {address?.address_line_2 && ","} {address?.city}, {address?.state}, {address?.zip_code}</p>

                    }
                  </div>
                </div>
              </div>
            </div>
        }

      </div>
    </div>
  )
}

export default adress
