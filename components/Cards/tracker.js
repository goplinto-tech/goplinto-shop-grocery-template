import React, { useEffect, useState } from 'react'


// import the stylesheet
import 'react-step-progress/dist/index.css'
import { TiTick } from 'react-icons/ti'
import { BsDot } from 'react-icons/bs'
import { CgBorderStyleDotted } from 'react-icons/cg'

export default function Tracker({ status,active2 }) {
const track={
  active1:status==='payment'?'active':status==='review'||status==='order'||status==='failed'&&'completed',
  active2:status==='review'?'active':status==='order'?'completed':status==='failed'&&'completed',
  active3:status==='order'&&'active',

}
console.log(track,status,active2)
  return (
    <div className="my-[24px]">

 <div
        id="tracker"
        className=" flex md:flex lg:flex mx-10  justify-center items-center"
      >
        <div className="flex  flex-col justify-center items-center text-center">
          <div
            className={`w-10 h-10  border-2 border-[#F58634] ${track.active1===true&&'bg-[#F58634]'} ${track.active1==='completed'&&'bg-[#F58634]'} ${track.active1==='active'&&'bg-[transparent]'}   rounded-full flex justify-center items-center  `}

          >

{
  track.active1==='active'?
<BsDot size={50} color={'#F58634'} />

:
<TiTick size={50} color={'white'} />


}

          </div>
        </div>

        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />
        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />
        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />
        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />

        <div className="flex flex-col  justify-center items-center text-center">
          <div
            className={`w-10 h-10 border-2 ${track.active2===false?"border-[#E5E5E5]":"border-[#F58634]"} ${track.active2==='completed'&&'bg-[#F58634]'||active2&&'bg-[#F58634]'}    rounded-full flex justify-center items-center  `}

          >
{
  track.active2!=='completed' ?
  active2?
<TiTick size={50} color={'white'} />
:
<BsDot size={50} color={track.active1!==true?'#E5E5E5':'#F58634'} />

:
<TiTick size={50} color={'white'} />

}




          </div>
        </div>

        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />

        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />

        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />
        <CgBorderStyleDotted
          size={40}
         color="#E5E5E5"
        />

        <div className="flex flex-col justify-center items-center text-center">
        <div
            className={`w-10 h-10 border-2 ${track.active2!=='completed'?"border-[#E5E5E5]":"border-[#F58634]"} ${track.active3==='active'&&'bg-[#F58634]'}  rounded-full flex justify-center items-center  `}

          >

{
  track.active3!=='active'?

// {/* <BsDot size={50} color={track.active1!==true?'#E5E5E5':'#F58634'} /> */}
                <BsDot size={50} color={track.active2!=='completed'?'#E5E5E5':'#F58634'} />


:
<TiTick size={50} color={'white'} />

}

          </div>
        </div>
      </div>
      <div
        id="tracker"
        className=" flex md:flex lg:flex mx-4  justify-center items-center"
      >
        <div className="flex w-1/4 flex-col  items-center text-center">



                <p className="text-[13px] text-[#F9F6ED]  "> Add payment
method  </p>


        </div>

        <div className="flex  w-1/2 flex-col justify-center  items-center text-center">



<p className="text-[13px] text-[#F9F6ED]  mx-6   w-max "> Review order  </p>


</div>

<div className="flex w-1/4  flex-col justify-center items-center text-center">



<p className="text-[13px] text-[#F9F6ED] w-full"> Order placed  </p>


</div>








      </div>

    </div>
  )
}
