import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WishItem from '@components/Cards/Order/wishlist'
import InfiniteScroll from 'react-infinite-scroll-component'
import accountLayout from '@components/layout/account-layout'
import Header from '@components/MobHeader/index'
import withAuth from '@components/auth/withAuth'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { connect } from 'react-redux'
import WishlistSkeleton from '@components/Cards/Order/wishlist/wishlistSkeleton';
import { Button, Input } from '@components/inputs';

import { getWishlistStart, getWishlistSuccess, addWishlistStart, addWishlistSuccess, } from '@redux/wishlist/wishlist-action'

function Wishlist({ user, info, getWishlist, wishItem,cart }) {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const [loading, setLoading] = useState('loading')
  const [wishListedItem, setWishListedItem] = useState([])
  const [noMore, setNoMore] = useState(true)
  const [page, setPage] = useState(2)
  const router = useRouter()
  // console.log(user,'line123415',info)
  useEffect(() => {
    const payload = {
      userId: user.customer_id,
      storeId: info.store_id,
      page: 1,
      wishListedItem: wishListedItem,
      setWishListedItem: setWishListedItem,
      setPage,
      setNoMore,
      setLoading
    }
    getWishlist(payload)
  }, [])
  const getMoreProducts = () => {
    const payload = {
      userId: user.customer_id,
      storeId: info.store_id,
      page,
      wishListedItem: wishListedItem,
      setWishListedItem: setWishListedItem,
      setPage,
      setNoMore,
      setLoading
    }
    getWishlist(payload)
  }
  return (
    <div className="relative -top-[19px] bg-[#f3f4f6] md:relative md:-top-[0px] md:bg-[transparent]">
      {/* <ToastContainer /> */}
      <div className='hidden md:block bg-white '>
        <p className=" hidden md:block text-xl mx-2 bg-white p-4 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold">

          <span className=" btn-color-revers">{wishListedItem.length} items </span>  in your Wishlist</p>
      </div>
      {
        wishListedItem.length == 0 && loading == 'loading' ? <div className='mt-32 lg:mt-4'><WishlistSkeleton /></div> :
          <InfiniteScroll
            dataLength={wishListedItem?.length}
            next={getMoreProducts}
            hasMore={noMore}
            loader={
              <WishlistSkeleton ></WishlistSkeleton>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-1 px-2 md:px-0 gap-6 lg:gap-4 py-8 mt-20 md:mt-2 lg:mt-0">
              {wishListedItem.map((item, idx) => <div key={idx} className="w-full md:rounded md:shadow md:bg-white md:px-4">
                <WishItem data={item} wishListedItem={wishListedItem} setWishListedItem={setWishListedItem} />
              </div>
              )}
            </div>
          </InfiniteScroll>
      }
      {
        wishListedItem.length == 0 && loading == 'success' ?
          <div className='bg-white p-5'>
            <div className='flex justify-center items-center'>
              <img className='w-[150px] h-[150px]' src="/img/wishlist.png" alt="" />

            </div>
            <div className='text-center mt-3'>
              <p className='text-xl font-bold'>No Product in the Wishlist</p>
            </div>
          </div>
          : ""
      }
      <div className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `} style={{ zIndex: 1200 }}>
        <div className={`flex justify-between w-full mt-6`}>
        <div className={`flex items-center mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4 nav-items-color`} size={35} />
          <p className={`text-2xl mx-4 nav-items-color`}>Wishlist</p>
        </div>
        <div>
          <Button
            className="flex items-center text-black mr-6"
            type="link"
            href="/cart"
          >
            <span className=" text-black nav-items-color font-bold  my-2 relative">
              {/* <IoMdCart size={30} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {
                !!totalItems &&
                <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center btn-bg text-white items-center text-xs text-center rounded-full btn-bgs btn-color border border-white">
                  {
                    totalItems

                  }
                </div>
              }
            </span>
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.user,
  info: state.store.info,
  wishItem: state.wishlist,
  cart: state.cart,
})
const mapDispatchToProps = dispatch => ({
  getWishlist: (payload) => dispatch(getWishlistStart(payload)),
  // addWishlist: (payload) => dispatch(addWishlistStart(payload)),
  // updateAddress: (payload) => dispatch(updateAddressStart(payload)),
  // removeAddress: (payload) => dispatch(removeAddressStart(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Wishlist))))

