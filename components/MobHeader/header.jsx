import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
function header({display, topic}) {
  return (
    <div className="bg-white flex block md:hidden lg:hidden shadow-lg">
      <div className="mx-2 my-2">
        {
          display&&
      <BsArrowLeft color={"black"} size={25}/>

        }
      </div>
        <p className="text-lg font-bold text-dark flex justify-start  m-2 ">{topic}</p>

    </div>
  )
}

export default header
