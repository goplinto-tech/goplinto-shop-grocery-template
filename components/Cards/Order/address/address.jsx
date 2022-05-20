import { Button } from '@components/inputs'
import { Popconfirm } from 'antd'
import React from 'react'
import { FiHome } from 'react-icons/fi'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function address({ type, data, onEdit, onRemove, ids }) {

  return (
    <div className="w-full  h-full  bg-white">
      <div className=" h-full md:p-4  w-full md:flex">
        <div className=" h-full w-full  m-2  border-[1px] rounded-xl border-[#C4C4C4] pr-4 md:border-[0px]  md:pr-0 md:mx-8 " onClick={() => { localStorage.setItem('addId', data.address_id) }}>
          <div className="hidden md:block h-full pb-4 btn-color-revers">
            <div className='w-full h-full flex flex-col items-stretch justify-between'>
              <div className='mt-2'>
                {
                  data?.address_tag === 'Home' ?
                    <div className="flex items-center mr-4 mb-4">
                      {/* <input id="radio1" type="radio" name="radio" className="" defaultChecked /> */}
                      <span className=' text-lg text-black font-semibold '>
                        {data?.full_name} ({data?.address_tag})
                      </span>
                    </div>
                    :
                    <div className="flex items-center mr-4 mb-4">
                      {/* <input id="radio1" type="radio" name="radio" className="" /> */}
                      <span className=' text-lg text-black font-semibold'>
                        {data?.full_name} ({data?.address_tag})
                      </span>
                    </div>
                }

                <p className="text-left  font-medium text-lg text-gray-500">
                  {data?.address_line_1}{', '} {data?.address_line_2} <br />
                  {data?.city}{' - '}{data?.zip_code}<br />
                  {data.state}{', '}{data.country},
                  <br />
                  <span> mob.  {data.country_code ? data?.country_code : "+91"} {data.phone}</span>
                </p>
              </div>
              <div className='flex justify-start items-center space-x-4'>
                <Button className="text-left text-sms  cursor-pointer btn-color-reverse " onClick={onEdit}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
                <Button className="text-left text-sm cursor-pointer btn-color-reverse " onClick={onRemove}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>4
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </Button>
              </div>
            </div>
          </div>
          <div className="md:hidden btn-color-revers">
            <div className='mt-2'>
              {
                data?.address_tag === 'Home' ?
                  <div className="flex items-center ml-2  mb-4 w-full justify-between">
                    <span className='mx-2 text-lg text-black font-[300]'>
                      {data?.full_name} ({data?.address_tag})
                    </span>
                    {/* <input id="radio1" type="radio" name="radio" className="mr-2" defaultChecked /> */}
                  </div>
                  :
                  <div className="flex items-center ml-2 mb-4 w-full justify-between">
                    <span className='mx-2 text-lg text-black font-[300]'>
                      {data?.full_name} ({data?.address_tag})
                    </span>
                    {/* <input id="radio1" type="radio" name="radio" className="mr-2" defaultChecked /> */}
                  </div>
              }
            </div>
            <div className='w-full'>
              <p className="text-left m-4 font-medium text-lg  md:h-[168px] text-gray-500">
                {data?.address_line_1}{', '} {data?.address_line_2} <br />
                {data?.city}{' - '}{data?.zip_code}<br />
                {data.state}{', '}{data.country},
                <br />
                <span> mob.  {data.country_code ? data?.country_code : "+91"} {data.phone}</span>
              </p>
            </div>
          </div>
        </div>
        <div className=' md:hidden flex justify-end items-center'>
          <Button className="text-left text-sms mt-3 mx-4 cursor-pointer btn-color-revese" onClick={onEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button className="text-left mt-4 mx-4  text-sm cursor-pointer btn-color-reverse btn-color-revese" onClick={onRemove}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>4
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

export default address
