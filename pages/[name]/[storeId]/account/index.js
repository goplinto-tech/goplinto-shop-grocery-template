// import React from 'react'
// import { connect } from "react-redux"
// import Profile from '@components/Cards/Order/Profile-card/index.js';
// import Edit from '@components/Cards/Order/profile/index.js'
// import withAuth from '@components/auth/withAuth'
// import Router, { useRouter } from 'next/router';
// import PageWrapper from '@components/page-wrapper/page-wrapper';
// import Header from '@components/MobHeader/index'


// function index({ user }) {
//   const router = useRouter();
//   return (
//     <>
//       <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
//         <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
//             <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
//           </svg>
//         </button>
//         <span className='text-base font-semibold'>Profile</span>
//       </div>
//       <div className="   ">
//        <Header display={true} topic="Edit Profile" />
//        <div className="grid lg:grid-cols-1   ">
//          <div className="w-full bg-white rounded-lg shadow">
//            <Edit user={user} />
//         </div>       </div>

//       </div>
//     </>
//   )
// }
// const mapStateToProps = state => ({
//   show: state.user.show,
//   user: state.user.currentUser
// })

// export default connect(mapStateToProps, null)(PageWrapper(withAuth(index)))
// import Header from '@components/MobHeader/index'
import React from 'react'
import accountLayout from '@components/layout/account-layout'
import Edit from '@components/Cards/Order/profile/index'
import withAuth from '@components/auth/withAuth'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { connect } from "react-redux"
// import Mobileprofile from '@components/Cards/Order/Profile-card/index'
import Mobprofile from '@components/Cards/Order/Profile-card/mobprofile'
function Profile({ user}) {
  return (
    <>
      {/* <Header display={false} topic="Edit Profile" /> */}
      <div className="grid lg:grid-cols-1   ">
        <div className="w-full hidden md:block lg:block bg-white md:rounded-lg lg:rounded-lg shadow">
          <Edit user={user} />
        </div>
        <div className="w-full block md:hidden lg:hidden bg-white md:rounded-lg lg:rounded-lg shadow">
          <Mobprofile user={user} />
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  show: state.user.show,
  user: state.user.currentUser
})

export default connect(mapStateToProps, null)(PageWrapper(withAuth(accountLayout(Profile))))

