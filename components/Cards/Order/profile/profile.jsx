import React, { useState } from 'react'
import fetcher from '@redux/utility'
import {AiOutlineCamera} from 'react-icons/ai';
import { Button } from '@components/inputs';

function Profile({ type, fullname, email_id, phone, id }) {
  const [profile, setprofile] = useState({
    fullName: fullname,
    emailId: email_id,
    phone: phone
  })
  const[state,setstae]=useState({file:'',imageurl:''})
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value)
    setprofile({ ...profile, [name]: value })
  }
  const onSubmitHandler = () => {
    fetcher('post', `?r=customer/update-login-details&customerId=${id}`, profile).then((response) => { console.log(response) }).catch((err) => { console.log(err) })

  }
  const handleSubmit=()=>{

  }
  const imagepreview=(  <div className="rounded w-[200px] h-[200px] bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
  <span className='text-3xl font-extrabold	' >
    {(() => {
      const name = fullname?.split(' ')
      if (name.length) {
        if (name.length > 1) {
          return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
        }
        return `${name[0][0]}${name[0][1]}`.toUpperCase()
      }
      return 'A'
    })()}
  </span>
  <span className=' cursor-pointer relative -top-20 left-10 text-3xl font-extrabold	'onClick={(e)=>handleSubmit(e)} >
   <AiOutlineCamera color={'gray'}/>
  </span>
</div>)
  return (

    <div className={` w-full ${type === 'index' ? "lg:w-full" : "lg:w-1/2"}  md:w-full  `}>
      {/* <p className="m-8 mb-4 text-lg text-dark h md:block lg:block" >My Profile</p> */}
      {/* <div className="rounded w-[200px] h-[200px] bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
        <span className='text-3xl font-extrabold	' >
          {(() => {
            const name = fullname?.split(' ')
            if (name.length) {
              if (name.length > 1) {
                return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
              }
              return `${name[0][0]}${name[0][1]}`.toUpperCase()
            }
            return 'A'
          })()}
        </span>
        <span className=' relative -top-20 left-10 text-3xl font-extrabold	' >
         <AiOutlineCamera color={'gray'}/>
        </span>
      </div> */}
      {
        <div className="my-8">
        {imagepreview}
        </div>
      }
      <div className="mx-8 my-6">
        <div className="mb-2">
          <p className="mb-2 text-sm" >Name</p>
          <input type="text" value={profile.fullName} name="fullName" placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " onChange={(e) => { onChange(e) }} />

        </div>
        <div className="mb-2">
          <p className="mb-2 text-sm" >Phone Number</p>
          <input type="text" name="phone" value={profile.phone} placeholder="Phone number" onChange={(e) => { onChange(e) }} className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " />

        </div>
        <div className="mb-2 text-sm">
          <p className="mb-2">Email</p>
          <input type="text" name="emailId" value={profile.emailId} placeholder="Email" onChange={(e) => { onChange(e) }} className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none" />

        </div>
        <div className="  flex  justify-end">
        <div className="flex items-center mr-16 ">
          <p className="   rounded text-sm text-green-500 " >Dont Save </p>

        </div>
<Button className="  p-4 py-2 justify-end text-right  bg-[#48887B] rounded text-base my-4  text-white  "onClick={onSubmitHandler} >Submit</Button>

</div>

      </div>

    </div>
  )
}

export default Profile
