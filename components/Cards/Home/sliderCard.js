import React from 'react'
import {    AiOutlineLeft,AiOutlineRight} from 'react-icons/ai';

function SliderCard({color, title}) {
  return (
    <div>
  <p className="my-4"> {title}</p>
    <div className="flex w-full">
      <div className="flex items-center"><AiOutlineLeft /></div>
      <div className="w-full " style={{backgroundColor:color}}>
        <div className="w-full p-1 grid grid-rows-1 grid-flow-col gap-4">
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>
          <div className="w-max">
            <div >
              <img className=" w-40 h-30" src="/img/fresh1.png"/>
            </div>
<div  className="  bg-white">
<p className="mx-2 text-sm text-left">item1</p>

</div>
          </div>



        </div>
      </div>
      <div className="  flex items-center "><AiOutlineRight/></div>

    </div>
    </div>
  )
}

export default SliderCard
