import React from 'react'
import { FiHome } from 'react-icons/fi'

function adress({ address }) {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
      <div className="my-4  w-full flex justify-between">
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
      </div>
    </div>
  )
}

export default adress
