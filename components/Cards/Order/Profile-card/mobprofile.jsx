import React, { useEffect } from 'react'
import Link from "@components/link";
import Router from "next/router";
import { connect } from 'react-redux';
import { getWalletBalance,logOut, logOutStart } from '@redux/user/user-action';
import { AiOutlineUser } from 'react-icons/ai'

function mobprofile({storeSettings, user, logout, getWalletBalance, customerWallet, info }) {
  const active = Router?.router?.state?.pathname.split('/')[2]

  // useEffect(() => {
  //   if (customerWallet == null) {
  //     getWalletBalance({ customerId: user.customer_id, storeId: info.store_id })
  //   }
  // }, [])

  return (
    <div>
      <div className=" block lg:hidden md:hidden shadow-xl bg-white  " style={{ height: '80vh' }}>
        {/* <p className="text-base font-bold text-dark flex justify-start px-4 py-2 shadow-md">Profile</p> */}
        <div className=" flex justify-between my-4  md:my-6 mx-2">
          <div className="flex justify-around my-2">
            <div className="w-full flex justify-center  md:my-4">
              <div className="rounded-full border-4 border-white w-20 h-20 bg-gray-100 text-gray-400  lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
                {
                  !user ?
                    <span className='text-3xl font-extrabold	' >
                      <AiOutlineUser size={40} color={'gray'} />
                    </span> :
                    <span className='text-3xl font-extrabold	' >

                      {(() => {
                        const name = user?.full_name.split(' ')
                        if (name?.length) {
                          if (name?.length > 1) {
                            return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
                          }
                          return `${name[0][0]}${name[0][1]}`.toUpperCase()
                        }
                        return 'A'
                      })()}
                    </span>

                }

              </div>
            </div>
            <div className="  w-full ">

              {
                !user ? <p className="text-lg font-bold absolute m-4  text-[#F58634]">
                  Login / Signup
                </p> :
                  <div className=" text-left ml-4 mt-4 relative ">
                    <p className="text-base md:text-sm   font-bold  leading-4  text-gray-900">
                      {user?.full_name}

                    </p>
                    <p className="text-base md:text-sm  font-semibold leading-4 my-2  text-gray-400">
                      {user?.phone}

                    </p>
                    <p className="text-base md:text-sm  font-semibold leading-4  text-gray-400">
                      {user?.email_id}

                    </p>
                  </div>
              }

            </div>
          </div>

          {/* <div className={`${!user && 'hidden'}  w-max mt-4 mr-2 `}>
            <Link href='/account/profile ' >
              <svg width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.474 3.40799L15.592 5.52499L13.474 3.40799ZM14.836 1.54299L9.109 7.27C8.81309 7.56549 8.61128 7.94198 8.529 8.35199L8 11L10.648 10.47C11.058 10.388 11.434 10.187 11.73 9.891L17.457 4.16399C17.6291 3.9919 17.7656 3.78759 17.8588 3.56273C17.9519 3.33788 17.9998 3.09688 17.9998 2.85349C17.9998 2.61011 17.9519 2.36911 17.8588 2.14426C17.7656 1.9194 17.6291 1.71509 17.457 1.54299C17.2849 1.3709 17.0806 1.23438 16.8557 1.14124C16.6309 1.04811 16.3899 1.00017 16.1465 1.00017C15.9031 1.00017 15.6621 1.04811 15.4373 1.14124C15.2124 1.23438 15.0081 1.3709 14.836 1.54299V1.54299Z" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 13V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H6" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Link>
          </div> */}
        </div>

        <div className=" mb-6 ">

          <div className="my-2 pt-4 border-t-2 border-gray-600 space-y-4">
            {
              active === 'myorders' ?
                <div className="border-l-4 border-rose-700 h-10 flex">

                  <Link href='/account/myorders ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/my orders.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
                        {" "}
                        My Orders
                      </p>
                    </div>


                  </Link>

                </div> :
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/myorders ' >

                    <div className="mx-4  pt-2 flex">
                      <img src='/img/my orders.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                        {" "}
                        My Orders
                      </p>
                    </div>
                  </Link>
                </div>


            }
            {
              active === 'wishlist' ?
                <div className="border-l-4 border-rose-700 h-10 ">

                  <Link href='/account/wishlist ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/wishlist.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
                        {" "}
                        Wishlist
                      </p>
                    </div>
                  </Link>
                </div> :
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/wishlist ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/wishlist.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                        {" "}
                        Wishlist
                      </p>
                    </div>
                  </Link>

                </div>
            }

            {
              active === 'wallet' ?
              storeSettings?.isWalletEnabled=='Y'&&
                <div className="border-l-4 border-rose-700 h-10 ">

                  <Link href='/account/wallet ' >
                    <div className="mx-4  pt-2 flex justify-between">
                      <div className='flex'>
                        <img src='/img/wallet.svg' />
                        <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
                          {" "}
                          Wallet
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-base text-[#44ADF4] bg-[#44ADF440] mr-7 px-2 rounded-3xl"><span className="text-[#44ADF4] mr-1">₹</span> {+customerWallet?.customer_wallet_balance}</p>
                      </div>
                    </div>
                  </Link>
                </div> :
                storeSettings?.isWalletEnabled=='Y'&&
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/wallet ' >
                    <div className="mx-4  pt-2 flex justify-between">
                      <div className='flex'>
                        <img src='/img/wallet.svg' />
                        <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                          {" "}
                          Wallet
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-base text-[#44ADF4] bg-[#44ADF440] mr-7 px-2 rounded-3xl"><span className="text-[#44ADF4] mr-1">₹</span> {+customerWallet?.customer_wallet_balance}</p>
                      </div>
                    </div>
                  </Link>

                </div>
            }
            {
              active === 'savedplaces' ?
                <div className="border-l-4 border-rose-700 h-10 ">

                  <Link href='/account/savedplaces ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/saved address.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
                        {" "}
                        Saved Address
                      </p>
                    </div>
                  </Link>
                </div> :
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/savedplaces ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/saved address.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                        {" "}
                        Saved Address
                      </p>
                    </div>
                  </Link>

                </div>
            }

            <div className=" h-10 mb-6 ">
              <div className="mx-4  pt-2 flex">
                <img src='/img/login.svg' />
                <p className="  mx-2   text-sm font-semibold relative text-gray-600" onClick={logout}>
                  {" "}
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  customerWallet: state.user.customerWallet,
  info: state.store.info,
  storeSettings: state.store.settings,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOut()),
  getWalletBalance: (data) => dispatch(getWalletBalance(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(mobprofile)
