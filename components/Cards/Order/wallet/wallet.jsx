import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';

function wallet() {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
    <div className="mt-4  w-full flex justify-between">

      <div className="lg:pl-4  w-full flex ">
      <div className="  w-full mx-4 my-4 ">
         <p className="text-left font-bold text-lg traxt-dark ">Total Wallet Of Money</p>
         <p className="text-left text-xl mt-4 font-extrabold text-green-600 ">₹ 548</p>
       </div>
       <div className="w-40  rounded " styl={{height:"120px"}}>
         <img className="w-full lg:ml-0 md:ml-0 h-full rounded object-center opacity-80" src="/img/walletheader.svg"/>
       </div>

      </div>


    </div>

    <div className="mb-4 border-t-2  border-gray-200   w-full ">
    <div className=' w-full m-4 mt-4'>
    <p className="text-left font-bold text-lg traxt-dark  mx-4 ">Wallet Benefits</p>
    <div className="mt-4  w-full ">

<div className="lg:pl-4  w-full my-5  flex ">
<div className="w-30  rounded " styl={{height:"60px"}}>
   <img className="w-full  md:ml-0 h-full rounded object-center opacity-80" src="/img/instant checkout.svg"/>
 </div>
<div className="  w-full mx-6   ">
   <p className="text-left font-semibold text-base text-dark ">Instant Checkout</p>
   <p className="text-left text-base  font-medium  text-gray-400 ">One-click easy and fast checkout</p>
 </div>


</div>
<div className="lg:pl-4  w-full  flex my-5">
<div className="w-30  rounded " styl={{height:"60px"}}>
   <img className="w-full  md:ml-0 h-full rounded object-center opacity-80" src="/img/fast returns.svg"/>
 </div>
<div className="  w-full mx-6   ">
   <p className="text-left font-semibold text-base text-dark ">Instant Checkout</p>
   <p className="text-left text-base  font-medium  text-gray-400 ">One-click easy and fast checkout</p>
 </div>


</div>
<div className="lg:pl-4  w-full  flex my-5">
<div className="w-30  rounded " styl={{height:"60px"}}>
   <img className="w-full  md:ml-0 h-full rounded object-center opacity-80" src="/img/money.svg"/>
 </div>
<div className="  w-full mx-6   ">
   <p className="text-left font-semibold text-base text-dark ">Instant Checkout</p>
   <p className="text-left text-base  font-medium  text-gray-400 ">One-click easy and fast checkout</p>
 </div>


</div>

</div>

    </div>

    </div>

    <div className=" m-4 w-full h-full flex justify-center align-center">



    </div>


    </div>
  )
}

export default wallet
