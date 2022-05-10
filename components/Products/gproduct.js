import React from 'react'
import { Router, useRouter } from 'next/router';

import Link from "@components/link"

// import RecommendedCard from '@components/Cards/Home/RecommendedCard'
import {BsFilterLeft} from 'react-icons/bs'
import ProductItem from '@components/product-item/product-item'
function products({products,status,lastEleRef,wishlist}) {

  return (
    <div className="bg-[#F5F5F5] md:bg-white">

      <div className="flex flex-row md:ml-4 md:wrapper w-full ">
        <div className="w-1/12 hidden md:block "></div>
        <div className=" w-12/12 md:w-10/12 md:ml-16 md:mr-12 ">
          <div className="md:mr-16">
          <div className=" flex justify-between   my-2  bg-white p-2 py-4 md:py-0 md:p-0 md:my-4">

<p className="   flex items-center font-bold md:ml-3 ">All Items</p>
<div className="flex font-bold    ">
  <div className="flex items-center  ">
  <BsFilterLeft size={20} className='mx-4'/>

  </div>
   <p className="flex items-center ">Filter / Sort By</p>
</div>
</div>
          </div>

        <div className="  grid  mx-2 md:mx-2 grid-cols-2 lg:grid-cols-4 md:grid-cols-2 md:gap-2 gap-4">

        {         status == 'success' || status == 'loading'?
            products.length && (status == 'loading' || status == 'success')
            ?<>
             {
              products.map((item, i) => (
                 <div >
                <ProductItem key={i} data={item} addItemToWishlist={wishlist} />
                </div>
              ))}
              {



             status == 'loading' &&
              <>
                Loading...
              </>
}
              <div className="h-6"></div>
                <div className="h-8" ref={lastEleRef}></div>
                </>
              : products.length < 1 && status == 'success' ?


               <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                <h6>
                  <span className="">No items found{' '}
                    <Link href={`/`}>
                      <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                        Show All Products.
                      </a>
                    </Link>
                  </span>
                </h6>
              </div>
               : products.length < 1 && status == 'success' ?
               <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                 <h6>
                   <span className="">No items found{' '}
                     <Link href={`/`}>
                       <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                         Show All Products.
                       </a>
                     </Link>
                   </span>
                 </h6>
               </div>
               :
               <>
                 <ProductItem />
                 <ProductItem />
                 <ProductItem />
                 <ProductItem />

               </>

           : status == 'success' ?
             <>
               <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                 <h6>
                   <span className="">No items found{' '}
                     <Link href={`/`}>
                       <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                         Show All Products.
                       </a>
                     </Link>
                   </span>
                 </h6>
               </div>
             </>
             :
             <div className="flex justify-center items-center" style={{ height: "30vh" }}>
               <h6 className="text-center">
                 <span className="">Unexpected error occurred{' '}
                   <span className="red-color block" onClick={Router.reload} style={{ cursor: 'pointer' }}>{' '}
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise inline" viewBox="0 0 16 16">
                       <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                     </svg> Please Reload
                   </span>
                 </span>
               </h6>
             </div>
       }

  </div>




        </div>
        <div className="w-1/12 hidden md:block "></div>
      </div>

    </div>
  )
}

export default products
