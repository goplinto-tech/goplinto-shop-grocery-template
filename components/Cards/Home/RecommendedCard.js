import React from 'react'
import {AiOutlineHeart,AiFillStar} from 'react-icons/ai'
import { Button } from '@components/inputs'

function RecommendedCard({offer}) {
  const  truncate=(str, no_words)=> {
    return str.split(" ").splice(0,no_words).join(" ");
}
  return (
    <>
    <div className="md:border-2 md:border-gray-400 bg-white  ">
     <div className="flex justify-between w-full">
       <img  className="m-2" src="/img/square.png"/>
       <AiOutlineHeart className="m-2 hidden md:block" size={18} />
       <div className="md:hidden flex">
    <p className=" text-sm flex items-center">4.5</p>
    <div className="flex items-center">
    <AiFillStar color="orange" />

    </div>
    </div>
     </div>
     <div className="w-10/12 h-30 mx-6 ">
     <img className="w-full h-full " src="/img/fresh1.png"/>

     </div>
     {
  offer?
 <div className="w-8/12 rounded-r-full h-8  relative -top-2  white-color flex items-center justify-center" style={{backgroundColor:"#44ADF4"}}>
  <p className="md:text-sm lg:text-base">Flat Rs. 200 OFF</p>
  </div>
  :
  <div className="lg:w-8/12 w-full rounded-r-full h-8 bg-white  relative -top-2  white-color flex items-center justify-center" >
  <p>Flat Rs. 200 OFF</p>
  </div>

}

    </div>
    <div className="flex justify-between my-2 mx-1">
    <div className="flex">
      <p className="font-bold text-lg">₹ 850</p>
      <p className="text-gray-400 font-thinner text-sm mx-4 flex items-center"> (MPR. 1249)</p>

    </div>
    <div className="md:flex hidden">
    <p className=" text-sm flex items-center">4.5</p>
    <div className="flex items-center">
    <AiFillStar color="orange" />

    </div>
    </div>

    </div>
    <div className="w-11/12 mx-1">
    <p className="text-sm">
      {
        truncate('Maggie combo of 4 | 52g each I Aproduct from Nestle in india ',20)
      }...
</p>
     </div>
    <div className="my-2 white-color ">
    <Button  className="w-full py-2 rounded" style={{backgroundColor:"#F58634"}} type="button" href="/" title="ADD TO CART"/>

    </div>
    </>

  )
}

export default RecommendedCard
