import Header from '@components/MobHeader/index'
import React from 'react'
import accountLayout from '@components/layout/account-layout'
import Edit from '@components/Cards/Order/profile/index'
import withAuth from '@components/auth/withAuth'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { connect } from "react-redux"

function Profile({ user}) {
  return (
    <>
      {/* <Header display={false} topic="Edit Profile" /> */}
      <div className="grid lg:grid-cols-1   ">
        <div className="w-full bg-white md:rounded-lg lg:rounded-lg shadow">
          <Edit user={user} />
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
