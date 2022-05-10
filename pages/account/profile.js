
import React from 'react'
import accountLayout from '@components/layout/account-layout'
import Edit from '@components/Cards/Order/profile/index'
import withAuth from '@components/auth/withAuth'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { connect } from "react-redux"
import {BsArrowLeft} from 'react-icons/bs'
import { useRouter } from 'next/router';

function Profile({ user}) {
const router=useRouter()
  return (
    <>
      {/* <Header display={false} topic="Edit Profile" /> */}
      <div className="grid lg:grid-cols-1   ">
        <div className="w-full bg-white md:rounded-lg lg:rounded-lg shadow">
          <Edit user={user} />
        </div>
      </div>
      <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[121px] w-full `} style={{zIndex:1200}}>

{/* <Tracker status={cartHeader.status}/> */}
<div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
  <BsArrowLeft className={`mx-4`} size={35} color={'white'}/>
   <p className={`text-2xl text-[white] mx-4`}>Edit Profile</p>
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
