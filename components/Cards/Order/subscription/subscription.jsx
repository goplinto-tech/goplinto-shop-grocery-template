import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';

function subscription({status}) {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
    <div className="my-4  w-full flex justify-between">

      <div className="lg:px-4 md:pl-4 w-max flex ">

       <div className="  w-max mx-2 mt-4 ">
         <p className="text-left font-semibold text-base ">Dairy Items</p>

       </div>
      </div>

      <div className="mt-4  w-full flex justify-end ">
      <p className="text-left  text-sm font-medium text-gray-500 lg:mr-4  md:mr-4">Expires on 05th Oct 2021</p>


      </div>
    </div>

    <div className="my-4 border-t-2  border-gray-200 border-b-2  w-full flex justify-between">
    <div className='flex w-full my-6 mx-2'>
    <div className=" lg:px-4 md:pl-4  w-full flex ">
       <div className="w-20 h-20 rounded-lg bg-gray-900">
         <img className="w-full h-full rounded-lg object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"/>
       </div>
       <div className="  w-full  my-4 md:ml-4  lg:m-4">
         <p className="text-left font-semibold lg:text-lg md:text-sm  text-dark">Recently Delivered Yesterday</p>
         <div className="flex text-left lg:text-base md:text-sm font-medium text-gray-500 mt-2">
         <p >Every Day</p>
         <p className="mx-4">|</p>
         <p >3 months</p>

         </div>
       </div>
      </div>

      <div className="mt-5 mr-4 md:mr-0 w-max flex justify-end w-max align-center">
       <MdKeyboardArrowRight className="text-gray-500 " size={30}/>


      </div>

    </div>

    </div>
{
  status ==='Active' ?
  <div className=" mt-4 mx-6 w-full h-full flex justify-start align-center">

       <p className="text-lg font-medium text-dark mb-4">{status}</p>

    </div>
    :
    <div className=" mt-4 mx-6 w-full h-full flex justify-start align-center">

       <p className="text-lg font-medoium text-dark mb-4">Expired</p>

    </div>
}

    </div>
  )
}

export default subscription
