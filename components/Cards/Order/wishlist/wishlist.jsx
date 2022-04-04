import React from 'react'
import {AiOutlineClose} from 'react-icons/ai';

function Wishlist() {
  return (
    <div className="w-full  border-2 rounded-lg   bg-white">


    <div className="  border-gray-100 border-b-2 p-4 md:p-0 lg:p-0  w-full flex justify-between">
    <div className=' lg:m-6 md:m-4 flex w-full '>
    <div className="px-2   w-full flex ">
       <div className="lg:w-1/4 md:w-3/4 rounded-xl bg-gray-900" style={{height:'110px'}}>
         <img className="w-full h-full rounded-xl object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"/>
       </div>
       <div className="  w-full  m-4 mt-6  ">
       <p className="text-left lg:text-lg font-medium text-dark md:text-base ">Chicken Tikka Pizza</p>

         <p className="text-left font-semibold lg:text-lg  text-dark  md:text-base"> ₹ 180</p>
       </div>
      </div>

      <div className="   w-full flex justify-end w-max align-center">
       <AiOutlineClose className=" cursor-pointer text-red-500" size={20}/>


      </div>

    </div>

    </div>

    <div className="w-full flex justify-center align-center"></div>

    <p className="text-center cursor-pointer p-4 font-medium text-base  text-red-600">Move to cart</p>

    </div>
  )
}

export default Wishlist
