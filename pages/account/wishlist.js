import React,{useEffect, useState} from 'react'

import WishItem from '@components/Cards/Order/wishlist'
import accountLayout from '@components/layout/account-layout'
import Header from '@components/MobHeader/index'
import withAuth from '@components/auth/withAuth'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import {BsArrowLeft} from 'react-icons/bs'
import { useRouter } from 'next/router';
import { connect } from 'react-redux'

import {getWishlistStart,getWishlistSuccess,addWishlistStart,addWishlistSuccess,}from '@redux/wishlist/wishlist-action'
function Wishlist({ user,info, getWishlist,wishItem }) {

  const router=useRouter()
  // console.log(user,'line123415',info)
  useEffect(() => {
   const wishlist=()=>{
     const payload={
      userId:user.customer_id,
      storeId:info.store_id
     }
     getWishlist(payload)
   }
   return wishlist()

  }, [])
console.log(wishItem)
  return (


    <div className="relative -top-[19px] bg-[#f3f4f6] md:relative md:-top-[0px] md:bg-[transparent]">

    <div className='hidden md:block bg-white '>
    <p className=" hidden md:block text-xl mx-2 bg-white p-4 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold">

<span className=" text-[#F58634] ">3 items </span>  in your Wishlist</p>
    </div>

      <div className="grid grid-cols-2 md:grid-cols-1  px-2 md:px-0 gap-6  py-8">
        <div className="w-full md:rounded md:shadow md:bg-white  md:px-4">

          <WishItem />
        </div>

        <div className="w-full md:rounded md:shadow md:bg-white  md:px-4">

          <WishItem />
        </div>
        <div className="w-full md:rounded md:shadow md:bg-white  md:px-4">

          <WishItem />
        </div>


      </div>

      <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[121px] w-full `} style={{zIndex:1200}}>

{/* <Tracker status={cartHeader.status}/> */}
<div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
  <BsArrowLeft className={`mx-4`} size={35} color={'white'}/>
   <p className={`text-2xl text-[white] mx-4`}>Wishlist</p>
</div>




</div>



    </div>


  )
}
const mapStateToProps = state => ({
  user: state.user,
  info: state.store.info,
  wishItem:state.wishlist
})
const mapDispatchToProps = dispatch => ({
  getWishlist: (payload) => dispatch(getWishlistStart(payload)),
  // addWishlist: (payload) => dispatch(addWishlistStart(payload)),
  // updateAddress: (payload) => dispatch(updateAddressStart(payload)),
  // removeAddress: (payload) => dispatch(removeAddressStart(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Wishlist))))



  // <>
  //                               <p className="text-xl text-gray-900 font-bold"> Wishlist</p>
  //                               <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>

  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>
  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>
  //                               </div>
  //                           </>
