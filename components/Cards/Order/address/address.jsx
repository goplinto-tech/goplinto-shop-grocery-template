import React from 'react'
import { FiHome } from 'react-icons/fi'

function address({ type, data, onEdit, onRemove,ids }) {

  return (
    <div className="w-full    bg-white">

        <div className=" pr-5   md:p-4  w-full md:flex  ">
        <div className="  w-full  m-2  border-[1px] rounded-lg border-[#C4C4C4] pr-4 md:border-[0px]  md:pr-0 md:mx-8 "  onClick={()=>{localStorage.setItem('addId',data.address_id)}}>
          <div className="hidden md:block   btn-color-revers">
            <div className='mt-2'>
              {
                data?.address_tag === 'Home' ?
                <div className="flex items-center mr-4 mb-4">
                <input id="radio1" type="radio" name="radio" className="" defaultChecked />
                <span className='mx-2 text-lg text-black font-[300]'>
                   { data?.full_name} ({data?.address_tag})
                </span>

               </div>
                  :
                  <div className="flex items-center mr-4 mb-4">
                  <input id="radio1" type="radio" name="radio" className=""  />
                  <span className='mx-2 text-lg text-black font-[300]'>
                     { data?.full_name} ({data?.address_tag})
                  </span>

                 </div>
              }

            </div>
            <div className='w-full'>


              <p className="text-left m-4 font-medium text-lg  h-[168px] text-gray-500">
                {data?.address_line_1  }{', '} {data?.address_line_2 } <br/>
                {data?.city }{ ' - '}{data?.zip_code}<br/>
               {data.state}{', '}{data.country},
                <br />
                <span> mob.  {data.country_code?data?.country_code:"+91"} {data.phone}</span>
              </p>
              <div className='flex justify-start items-center'>
                <p className="text-left mt-4 mx-4  text-lg font-bold cursor-pointer  text-[#48887B]" onClick={onEdit}>Edit</p>
                <p className="text-left mt-4 mx-4  text-lg font-bold cursor-pointer  text-[#48887B]" onClick={onRemove}>Remove</p>
              </div>
            </div>
          </div>
          <div className="md:hidden   btn-color-revers">
            <div className='mt-2'>
              {
                data?.address_tag === 'Home' ?
                <div className="flex items-center ml-2  mb-4 w-full justify-between">
                   <span className='mx-2 text-lg text-black font-[300]'>
                   { data?.full_name} ({data?.address_tag})
                </span>
                <input id="radio1" type="radio" name="radio" className="mr-2" defaultChecked />


               </div>
                  :
                  <div className="flex items-center ml-2 mb-4 w-full justify-between">
                   <span className='mx-2 text-lg text-black font-[300]'>
                   { data?.full_name} ({data?.address_tag})
                </span>
                <input id="radio1" type="radio" name="radio" className="mr-2" defaultChecked />


               </div>
              }

            </div>
            <div className='w-full'>


              <p className="text-left m-4 font-medium text-lg  md:h-[168px] text-gray-500">
                {data?.address_line_1  }{', '} {data?.address_line_2 } <br/>
                {data?.city }{ ' - '}{data?.zip_code}<br/>
               {data.state}{', '}{data.country},
                <br />
                <span> mob.  {data.country_code?data?.country_code:"+91"} {data.phone}</span>
              </p>

            </div>
          </div>
        </div>
        <div className=' md:hidden flex justify-end items-center'>
                <p className="text-left mt-4 mx-4  text-lg font-bold cursor-pointer  text-[#48887B]" onClick={onEdit}>Edit</p>
                <p className=" flex  justify-end mt-4 ml-4  text-lg font-bold cursor-pointer  text-[#48887B]" onClick={onRemove}>Remove</p>
              </div>
      </div>


    </div>
  )
}

export default address
