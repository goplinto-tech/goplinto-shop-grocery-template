import React from 'react'
import Link from "@components/link";
import Router from "next/router";
import { connect } from 'react-redux';
import { logOutStart } from '@redux/user/user-action';


function mobprofile({ user, logout }) {
  const active = Router?.router?.state?.pathname.split('/')[2]


  return (
    <div>
      <div className=" block lg:hidden md:hidden shadow-xl bg-white  " style={{ height: '80vh' }}>
        {/* <p className="text-base font-bold text-dark flex justify-start px-4 py-2 shadow-md">Profile</p> */}
        <div className=" flex justify-between my-6 mx-2">
          <div className="flex justify-around my-2">
            <div className="w-full flex justify-center mx-2  ">
              <div className="rounded-full w-20 h-20 bg-gray-900  ring-2 z-100  bg-gray-900  ring-white">
                <img
                  className="w-full h-full opacity-90 rounded-full"
                  src="https://images.indulgexpress.com/uploads/user/imagelibrary/2020/11/7/original/Chef_Ranveer_Brar.jpg"
                />
              </div>
            </div>
            <div className="  w-full ">
              <div className=" text-left ml-4 mt-1 relative    ">
                <p className="text-sm   font-bold    text-gray-900">
                  {user?.full_name}

                </p>
                <p className="text-sm font-semibold  my-2  text-gray-400">
                  {user?.phone}

                </p>
                <p className="text-sm font-semibold   text-gray-400">
                  {user?.email_id === null ? "N/A" : user?.email_id}

                </p>
              </div>
            </div>
          </div>

          <div className="  w-max ">
            <Link href='/account/profile ' >
              <p className=" cursor-pointer text-lg m-2 font-semibold text-red-600 relative ">
                Edit
              </p>
            </Link>
          </div>
        </div>

        <div ClassName=" mb-6 ">

          <div className="my-2 pt-4 border-t-2 border-gray-600 ">
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
              // active === 'wishlist' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/wishlist ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
              //           {" "}
              //           Wishlist
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/wishlist ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Wishlist
              //         </p>
              //       </div>
              //     </Link>

              //   </div>
            }

            {
              // active === 'wallet' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/wallet ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
              //           {" "}
              //           Wallet
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/wallet ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wallet.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Wallet
              //         </p>
              //       </div>
              //     </Link>

              //</div>
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



            {
              // active === 'subscription' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/subscription ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/help.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-red-600">
              //           {" "}
              //           Help
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/subscription ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/help.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Help
              //         </p>
              //       </div>
              //     </Link>

              //   </div>
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
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(mobprofile)
