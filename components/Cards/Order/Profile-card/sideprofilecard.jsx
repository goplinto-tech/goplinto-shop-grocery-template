import { logOutStart } from "@redux/user/user-action";
import Link from "@components/link";
import Router from "next/router";
import React from "react";
import { connect } from "react-redux";

function Sideprofilecard({ user, logout }) {

  const active = Router?.router?.state?.pathname.split('/')[2]

  return (
    <div className="w-full  h-full hidden md:block lg:block rounded-t-xl bg-white shadow-lg md:pb-20">
      <div className="w-full h-40  rounded-t-xl bg-gray-900 ">
        <img
          className="w-full rounded-t-xl  h-full opacity-70"
          src="https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/k/w/p5605-15644763495d4003bdce387.jpg?tr=tr:n-xlarge"
        />
      </div>
      <div className="w-full  ">
        <div className=" flex justify-between relative">
          <div className="w-full px-6">
            <div className="w-full flex justify-center relative  -top-8">
              <div className="rounded-full border-4 border-white w-20 h-20 bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
                <span className='text-3xl font-extrabold	' >
                  {(() => {
                    const name = user.full_name.split(' ')
                    if (name.length) {
                      if (name.length > 1) {
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
                {user?.email_id === null ? "N/A" : user?.email_id}

              </p>
            </div>
            <div className="absolute top-0 right-4 ">
              <Link href='/account/profile ' >
                <p className=" cursor-pointer text-lg m-2 font-medium btn-color-revers  relative ">
                  Edit
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray w-full">
        <div className="mt-12  ">
          {
            active === 'account' ?
              <div className="border-l-4 border-static  h-10 my-6">
                <Link href='/account ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers ">
                    {" "}
                    Account
                  </p>
                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold text-gray-600">
                    Account
                  </p>
                </Link>
              </div>


          }
          {
            active === 'myorders' ?
              <div className="border-l-4 border-static h-10 my-6">
                <Link href='/account/myorders ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold btn-color-revers ">
                    {" "}
                    My Orders
                  </p>
                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/myorders ' >
                  <p className=" flex mx-8 py-2 text-lg relative  font-semibold text-gray-600">
                    My Orders
                  </p>
                </Link>
              </div>


          }

          {
            // active === 'wishlist' ?
            //   <div className="border-l-4 border-static  h-10 my-6">

            //     <Link href='/account/wishlist ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  btn-color-revers ">

            //         Wishlist

            //       </p>
            //     </Link>
            //   </div> :
            //   <div className=" cursor-pointer h-10 my-6">
            //     <Link href='/account/wishlist ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            //         Wishlist

            //       </p>
            //     </Link>

            //   </div>
          }

          {
            // active === 'wallet' ?
            //   <div className="border-l-4 border-static  h-10 my-6">

            //     <Link href='/account/wallet ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  btn-color-revers ">

            //         Wallet

            //       </p>
            //     </Link>
            //   </div> :
            //   <div className=" cursor-pointer h-10 my-6">
            //     <Link href='/account/wallet ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            //         Wallet

            //       </p>
            //     </Link>

            //   </div>
          }
          {
            active === 'savedplaces' ?
              <div className="border-l-4 border-static  h-10 my-6">
                <Link href='/account/savedplaces ' >
                  <p className=" flex mx-8 py-2 text-lg font-semibold relative  btn-color-revers ">
                    Saved Places
                  </p>
                </Link>
              </div> :
              <div className=" cursor-pointer h-10 my-6">
                <Link href='/account/savedplaces ' >
                  <p className=" flex mx-8 py-2 text-lg font-semibold relative  text-gray-600">
                    Saved Places
                  </p>
                </Link>
              </div>
          }
          {
            // active === 'subscription' ?
            //   <div className="border-l-4 border-static  h-10 my-6">

            //     <Link href='/account/subscription ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  btn-color-revers ">

            //         Subscription

            //       </p>
            //     </Link>
            //   </div> :
            //   <div className=" cursor-pointer h-10 my-6">
            //     <Link href='/account/subscription ' >
            //       <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            //         Subscription

            //       </p>
            //     </Link>

            //   </div>
          }
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg font-semibold relative cursor-pointer text-gray-600" onClick={logout}>
              {" "}
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sideprofilecard);
