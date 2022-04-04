import Sideprofilecard from './sideprofilecard.jsx';
import React from 'react'
import Mobileprofile from './mobprofile.jsx'
function index({ userdetail, user }) {

  return (
    <div>
      <Sideprofilecard user={user} />
      <Mobileprofile user={user} />
    </div>

  )
}

export default index
