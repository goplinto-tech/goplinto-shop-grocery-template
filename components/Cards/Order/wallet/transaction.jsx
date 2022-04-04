import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';

function transaction() {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">


      <div className="lg:p-4  w-full flex ">
      <div className="  w-full  m-4 ">
         <p className="text-left font-bold text-lg traxt-dark ">Your Transactions</p>

       </div>





    </div>

    <div className="mb-4 border-t-2 border-gray-200  w-full flex justify-between ">
    <div className=' w-full m-4 mt-4'>
    <p className="text-left font-bold text-base traxt-dark  mx-4 ">Refund issued</p>
    <p className="text-left font-normal text-sm text-dark mx-4 my-2 ">Order #1208</p>
   <p className="text-left text-sm  font-normal  text-gray-400  mx-4 ">05th Sept 2021, 12:30 Pm</p>



    </div>

<div>
<p className=" text-right font-bold text-lg mt-12  text-green-600 w-max mr-4 ">₹ 548</p>

</div>



    </div>




    </div>
  )
}

export default transaction
