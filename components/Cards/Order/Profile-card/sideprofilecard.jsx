import { getWalletBalance, logOut, logOutStart } from "@redux/user/user-action";
import Link from "@components/link";
import Router from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sideprofilecard({storeSettings, user, logout, customerWallet, info, getWalletBalance }) {

  let active = Router?.router?.state?.pathname.split('/')[2]
  active = active === undefined ? 'account' : active

  // useEffect(() => {
  //   if (customerWallet == null) {
  //     getWalletBalance({ customerId: user.customer_id, storeId: info.store_id })
  //   }
  // }, [])

  // console.log("wallet length",customerWallet?.customer_wallet_balance.length)

  return (
    <>
    {/* <ToastContainer /> */}
    <div className="w-full  h-full hidden md:block lg:block rounded-t-md bg-white shadow-lg md:pb-20">

      <div className="w-full  ">
        <div className=" flex justify-between relative">
          <div className="w-full p-4">
            <div className="w-full flex justify-center  my-4">
              <div className="rounded-full border-4 border-white w-20 h-20 bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
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
              </div>
            </div>
            <div className=" text-center relative -top-4 ">
              <p className="lg:text-base md:text-base   font-bold flex  justify-center  text-gray-900">
                {user?.full_name}
              </p>
              <p className="lg:text-base md:text-left  md:text-sm font-medium flex   justify-center text-gray-500">
                {user?.phone}
              </p>
              <p className="lg:text-sm text-xs flex  justify-center font-medium text-center  text-gray-500">
                {user?.email_id}

              </p>
            </div>

          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray w-full">
        <div className="mt-12  ">
          {
            // active === 'account' ?
            //   <div className=" h-10 my-6">
            //     <Link href='/account ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers items-center space-x-2">
            //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            //           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            //         </svg>
            //         <span>
            //           Account
            //         </span>
            //       </p>

            //     </Link>
            //   </div> :
            //   <div className=" cursor-pointer h-10 my-6">
            //     <Link href='/account ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold  items-center space-x-2">
            //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            //           <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            //         </svg>
            //         <span>
            //           Account
            //         </span>
            //       </p>

            //     </Link>
            //   </div>


          }
          {
            active === 'myorders' ?
              <div className="h-10 my-6">
                <Link href='/account/myorders ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span>
                      My Orders
                    </span>
                  </p>
                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/myorders ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span>
                      My Orders
                    </span>
                  </p>
                </Link>
              </div>


          }

          {
            active === 'wishlist' ?
              <div className=" h-10 my-6">

                <Link href='/account/wishlist ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Wishlist
                    </span>
                  </p>
                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/wishlist ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>
                      Wishlist
                    </span>
                  </p>
                </Link>

              </div>
          }

          {
            active === 'wallet' ?
            storeSettings?.isWalletEnabled=='Y'&&
              <div className=" h-10 my-6">

                <Link href='/account/wallet ' >
                  <div className="flex items-center justify-between">
                    <p className=" flex mx-8 py-2 text-lg font-semibold relative  btn-color-revers items-center space-x-2">
                      <svg className="w-6 h-6 " viewBox="0 0 21 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2226 7.16656H19.5282V3.49989C19.5282 3.33781 19.455 3.18238 19.3248 3.06777C19.1945 2.95317 19.0179 2.88878 18.8337 2.88878H2.16707C2.00263 2.89114 1.84258 2.84207 1.71541 2.7503C1.58824 2.65854 1.5022 2.53003 1.47262 2.38767V2.16767C1.5022 2.02531 1.58824 1.8968 1.71541 1.80504C1.84258 1.71327 2.00263 1.6642 2.16707 1.66656H18.5421C18.7262 1.66656 18.9029 1.60217 19.0331 1.48757C19.1633 1.37296 19.2365 1.21752 19.2365 1.05545C19.2365 0.89337 19.1633 0.737932 19.0331 0.623326C18.9029 0.508721 18.7262 0.444336 18.5421 0.444336H2.16707C1.61453 0.444336 1.08463 0.63749 0.693928 0.981307C0.303227 1.32512 0.0837338 1.79144 0.0837338 2.27767C0.0788596 2.35094 0.0788596 2.4244 0.0837338 2.49767V15.0682C0.0864597 15.3973 0.162808 15.7226 0.308418 16.0257C0.454028 16.3287 0.66605 16.6036 0.932375 16.8346C1.1987 17.0655 1.51411 17.2481 1.86061 17.3718C2.2071 17.4954 2.57788 17.5579 2.95179 17.5554H18.8337C19.0179 17.5554 19.1945 17.4911 19.3248 17.3765C19.455 17.2619 19.5282 17.1064 19.5282 16.9443V13.2777H20.2226C20.4068 13.2777 20.5834 13.2133 20.7137 13.0987C20.8439 12.9841 20.9171 12.8286 20.9171 12.6666V7.77767C20.9171 7.61559 20.8439 7.46015 20.7137 7.34555C20.5834 7.23094 20.4068 7.16656 20.2226 7.16656ZM18.1393 16.3332H2.95179C2.56554 16.3365 2.19344 16.2054 1.91644 15.9685C1.63943 15.7316 1.47993 15.4081 1.47262 15.0682V4.03767C1.69804 4.09515 1.9326 4.11992 2.16707 4.111H18.1393V7.16656H13.2782C12.3573 7.16656 11.4741 7.48848 10.8229 8.06151C10.1718 8.63454 9.80596 9.41173 9.80596 10.2221C9.80596 11.0325 10.1718 11.8097 10.8229 12.3827C11.4741 12.9557 12.3573 13.2777 13.2782 13.2777H18.1393V16.3332ZM19.5282 12.0554H13.2782C12.7256 12.0554 12.1957 11.8623 11.805 11.5185C11.4143 11.1747 11.1948 10.7083 11.1948 10.2221C11.1948 9.73588 11.4143 9.26957 11.805 8.92575C12.1957 8.58193 12.7256 8.38878 13.2782 8.38878H19.5282V12.0554Z" />
                      </svg>
                      <span>Wallet</span>
                    </p>
                    <p className={`font-semibold ${customerWallet?.customer_wallet_balance.length>=6 ? "text-sm mr-6":"text-base mr-7"} py-1 text-[#44ADF4] bg-[#44ADF440] px-2 rounded-3xl`}><span className="text-[#44ADF4] mr-1">{info.currency_symbol}</span> {customerWallet?.customer_wallet_balance}</p>
                  </div>
                </Link>
              </div> :
            storeSettings?.isWalletEnabled=='Y'&&
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/wallet ' >
                  <div className="flex items-center justify-between">
                    <p className=" flex mx-8 py-2 text-lg font-semibold relativ items-center space-x-2">
                      <svg className="w-6 h-6 " viewBox="0 0 21 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2226 7.16656H19.5282V3.49989C19.5282 3.33781 19.455 3.18238 19.3248 3.06777C19.1945 2.95317 19.0179 2.88878 18.8337 2.88878H2.16707C2.00263 2.89114 1.84258 2.84207 1.71541 2.7503C1.58824 2.65854 1.5022 2.53003 1.47262 2.38767V2.16767C1.5022 2.02531 1.58824 1.8968 1.71541 1.80504C1.84258 1.71327 2.00263 1.6642 2.16707 1.66656H18.5421C18.7262 1.66656 18.9029 1.60217 19.0331 1.48757C19.1633 1.37296 19.2365 1.21752 19.2365 1.05545C19.2365 0.89337 19.1633 0.737932 19.0331 0.623326C18.9029 0.508721 18.7262 0.444336 18.5421 0.444336H2.16707C1.61453 0.444336 1.08463 0.63749 0.693928 0.981307C0.303227 1.32512 0.0837338 1.79144 0.0837338 2.27767C0.0788596 2.35094 0.0788596 2.4244 0.0837338 2.49767V15.0682C0.0864597 15.3973 0.162808 15.7226 0.308418 16.0257C0.454028 16.3287 0.66605 16.6036 0.932375 16.8346C1.1987 17.0655 1.51411 17.2481 1.86061 17.3718C2.2071 17.4954 2.57788 17.5579 2.95179 17.5554H18.8337C19.0179 17.5554 19.1945 17.4911 19.3248 17.3765C19.455 17.2619 19.5282 17.1064 19.5282 16.9443V13.2777H20.2226C20.4068 13.2777 20.5834 13.2133 20.7137 13.0987C20.8439 12.9841 20.9171 12.8286 20.9171 12.6666V7.77767C20.9171 7.61559 20.8439 7.46015 20.7137 7.34555C20.5834 7.23094 20.4068 7.16656 20.2226 7.16656ZM18.1393 16.3332H2.95179C2.56554 16.3365 2.19344 16.2054 1.91644 15.9685C1.63943 15.7316 1.47993 15.4081 1.47262 15.0682V4.03767C1.69804 4.09515 1.9326 4.11992 2.16707 4.111H18.1393V7.16656H13.2782C12.3573 7.16656 11.4741 7.48848 10.8229 8.06151C10.1718 8.63454 9.80596 9.41173 9.80596 10.2221C9.80596 11.0325 10.1718 11.8097 10.8229 12.3827C11.4741 12.9557 12.3573 13.2777 13.2782 13.2777H18.1393V16.3332ZM19.5282 12.0554H13.2782C12.7256 12.0554 12.1957 11.8623 11.805 11.5185C11.4143 11.1747 11.1948 10.7083 11.1948 10.2221C11.1948 9.73588 11.4143 9.26957 11.805 8.92575C12.1957 8.58193 12.7256 8.38878 13.2782 8.38878H19.5282V12.0554Z" />
                      </svg><span>
                        Wallet
                      </span>
                    </p>
                    <p className={`font-semibold ${customerWallet?.customer_wallet_balance.length>=6 ? "text-sm mr-6":"text-base mr-7"} py-1 text-[#44ADF4] bg-[#44ADF440] px-2 rounded-3xl`}><span className="text-[#44ADF4] mr-1">{info.currency_symbol}</span> {customerWallet?.customer_wallet_balance}</p>
                  </div>

                </Link>

              </div>
          }
          {
            active === 'savedplaces' ?
              <div className=" h-10 my-6">
                <Link href='/account/savedplaces ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Saved Places
                    </span>
                  </p>

                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/savedplaces ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      Saved Places
                    </span>
                  </p>
                </Link>
              </div>
          }
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold items-center space-x-2 cursor-pointer" onClick={() => {
              console.log('fsdfsd');
              logout()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>
                Logout
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  customerWallet: state.user.customerWallet,
  info: state.store.info,
  storeSettings: state.store.settings,
})

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(logOutStart()),
  logout: () => dispatch(logOut()),
  getWalletBalance: (data) => dispatch(getWalletBalance(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sideprofilecard);
