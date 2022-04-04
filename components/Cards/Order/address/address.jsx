import React from 'react'
import { FiHome } from 'react-icons/fi'

function address({ type, data, onEdit, onRemove }) {
  return (
    <div className="w-full  border-2 md:rounded-lg lg:rounded-lg   bg-white">
      <div className="p-4  w-full flex ">
        <div className="  w-full  m-2  ">
          <div className="flex btn-color-revers">
            <div className='mt-2'>
              {
                type == 'Home' ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
              }

            </div>
            <div className='w-full'>
              <p className="text-left m-4 my-2 font-bold text-base  text-dark">{type}</p>

              <p className="text-left m-4 font-medium text-base  text-gray-500">
                {data.full_name}{', '}<br />{data.address_line_1}, {data.address_line_2 && ','} {data.city},
                <br />{data.state}{', '}
                {data.zip_code}{', '}
                <br />
                {data.country},
                <br />
                <span>+91 {data.phone}</span>
              </p>
              <div className='flex justify-between items-center'>
                <p className="text-left mt-4 mx-4 font-medium text-base cursor-pointer btn-color-revers" onClick={onEdit}>Edit</p>
                <p className="text-left mt-4 mx-4 font-medium text-base cursor-pointer btn-color-revers" onClick={onRemove}>Remove</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default address
