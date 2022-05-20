import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import accountLayout from '@components/layout/account-layout'

import Address from '@components/Cards/Order/address/address'

import withAuth from '@components/auth/withAuth'

import ErrorPage from '@components/error'
import { Input, Button } from '@components/inputs'
// Actions
import {
  getAddressStart,
  addAddressStart,
  updateAddressStart,
  removeAddressStart,
} from '@redux/user/user-action'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'
import store from "@redux/store";

function Savedplaces({
  user,
  address,
  getAddress,
  addAddress,
  removeAddress,
  updateAddress,
  store,
}) {
  const router = useRouter()
  const addressdetails = router.query;
  const addressStructure = {
    full_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    address_fields: {},
    address_tag: 'Home',
    country: 'India',
    is_default: '',
    latitude: null,
    longitude: null,
    state: '',
    zip_code: '',
  }
  const [newAddress, setNewAddress] = useState({})
  const [isAddressActive, setIsAddressActive] = useState(false)

  const [isLoadding, setIsLoadding] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState('')
  const [mobNavHeight, setMobNavHeight] = useState(0)

  useEffect(()=>{
    const addressdetails = router.query;
    const isEmpty = Object.keys(addressdetails);
    console.log("isEmpty",isEmpty)
    if(isEmpty.length==0){            
      setNewAddress(addressStructure);
    }
    else{
      setNewAddress(addressdetails);
    }
},[router.query])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
          const ele = document.getElementById('mob-navbar')
          if (ele) {
            if (ele.offsetWidth != mobNavHeight) {
              // console.log(ele)
              setMobNavHeight(ele.offsetHeight)
            }
          }
        }
      })
      objerver.observe(document.body)
    }
  }, [])
  useEffect(() => {
    // if (!address.length) {
    getAddress({ userId: user.customer_id, setError })
    // }
  }, [])
  useEffect(() => {
    setIsLoadding(!!address.length)
  })
  const onChangeAddress = (e) => {
    const { value, name } = e.target
    setFormError('')
    if (name == 'phone' || name == 'zip_code') {
      if (!/^\d*$/.test(value)) return
    }
    setNewAddress({ ...newAddress, [name]: value })
  }
  const onSave = () => {
    if (
      !newAddress.full_name ||
      !newAddress.phone ||
      !newAddress.address_line_1 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country ||
      !newAddress.zip_code
    ) {
      setFormError('Please fill all Required(*) field')
      return
    }
    if (newAddress?.address_id) {
      updateAddress({
        userId: user.customer_id,
        addressId: newAddress.address_id,
        address: newAddress,
        setError,
      })
    } else {
      addAddress({ userId: user.customer_id, address: newAddress, setError })
    }
    setIsAddressActive(false)
    setNewAddress(addressStructure)
    const url = `/${store?.store_name.replaceAll(" ", '-').trim()}/${store.store_id}`
    router.push(`/account/savedplaces`)
    // window.location.href(`${url}/account/savedplaces`)
  }
  return (
    <>
      {
        isLoadding ? (
          <div className="w-full bg-white md:bg-[transparent] mt-28">
            {/* <Header display={true} topic="Saved Address" /> */}

            <div className="my-4 mb-20 bg-white">
              <div className="py-2 md:p-4 px-2 md:px-8 md:w-1/2  ">
                <span className=" font-bold text-lg md:block hidden  ">
                  Country*
                </span>
                <Input
                  onChange={onChangeAddress}
                  type="text"
                  name="country"
                  placeholder="Your Country/Region..."
                  value={newAddress.country}
                  className="h-[48px] my-2 rounded border border-gray-300 "
                />
              </div>
              <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2  ">
                <span className=" font-bold text-lg md:block hidden  ">
                  Name*
                </span>
                <Input
                  onChange={onChangeAddress}
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={newAddress.full_name}
                  className="h-[48px] my-2 rounded border border-gray-300 "
                />
              </div>

              <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2  ">
                <span className=" font-bold text-lg md:block hidden  ">
                  Mobile Number ( Commonly Used to Assist Delivery ) *
                </span>
                <Input
                  onChange={onChangeAddress}
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={newAddress.phone}
                  className="h-[48px] my-2 rounded border border-gray-300 "
                />
              </div>
              <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2  ">
                <span className=" font-bold text-lg md:block hidden  ">
                  Flat no., House no./ House Name, Road no.*
                </span>
                <Input
                  onChange={onChangeAddress}
                  type="text"
                  name="address_line_1"
                  placeholder="Flat, House no"
                  value={newAddress.address_line_1}
                  className="h-[48px] my-2 rounded border border-gray-300 "
                />
              </div>
              <div className="w-full md:flex">
                <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2   ">
                  <span className=" font-bold text-lg md:block hidden  ">
                    Colony, Area, Street, Village
                  </span>
                  <Input
                    onChange={onChangeAddress}
                    type="text"
                    name="address_line_2"
                    placeholder="Area, Colony, Street, Sector"
                    value={newAddress.address_line_2}
                    className="h-[48px] my-2 rounded border border-gray-300 "
                  />
                </div>
                <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2  ">
                  <span className=" font-bold text-lg md:block hidden  ">
                    City*
                  </span>
                  <Input
                    onChange={onChangeAddress}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    className="h-[48px] my-2 rounded border border-gray-300 "
                  />
                </div>
                <div className="py-2 md:p-4 px-2 md:px-8  md:w-1/2  ">
                  <span className=" font-bold text-lg md:block hidden  ">
                    State*
                  </span>
                  <Input
                    onChange={onChangeAddress}
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    className="h-[48px] my-2 rounded border border-gray-300 "
                  />
                </div>
              </div>


              <div className="py-2 px-2 md:py-4 flex">
                <div className="pl-1 w-96">
                  <span className="  font-bold text-lg md:block hidden  ">
                    Zip Code*
                  </span>
                  <Input
                    onChange={onChangeAddress}
                    type="text"
                    name="zip_code"
                    placeholder="Zip Code"
                    value={newAddress.zip_code}
                    className="h-[48px] my-2  rounded border border-gray-300 "
                  />
                </div>
                <div className="pl-1 w-96">
                    <select onChange={onChangeAddress} name="address_tag" className="h-[48px] my-2  rounded border border-gray-300 w-full text-gray-400" >
                      <option value="Home" selected>Home</option>
                      <option value="Work">Work</option>
                    </select>
                </div>
              </div>

              {/* <div className="p-4 px-8 ">
                <span className=" font-bold text-lg md:block hidden  ">
                  Address Type*
                </span>
                <div className=" justify-start items-start  p-2">
                  <div>
                    <input
                      type="radio"
                      name="address_tag"
                      id="add-t-1"
                      value="Home"
                      onChange={onChangeAddress}
                      checked={newAddress.address_tag == 'Home'}
                    />
                    <label
                      className={`font-12 ml-4 font-w-600 type-of-address ${
                        newAddress.address_tag == 'Home' ? 'selected' : ''
                      }`}
                      htmlFor="add-t-1"
                    >
                      {' '}
                      <span className="font-bold text-black">
                        Home Address{' '}
                      </span>{' '}
                      ( product will be delivered between 7 am to 9 pm){' '}
                    </label>
                  </div>
                  <div className="mt-4">
                    <input
                      type="radio"
                      name="address_tag"
                      value="Work"
                      id="add-t-2"
                      onChange={onChangeAddress}
                      checked={newAddress.address_tag == 'Work'}
                    />
                    <label
                      className={`font-12 ml-4 font-w-600 type-of-address ${
                        newAddress.address_tag == 'Work' ? 'selected' : ''
                      }`}
                      htmlFor="add-t-2"
                    >
                      {' '}
                      <span className="font-bold text-black">
                        Office/ Work Address{' '}
                      </span>{' '}
                      ( product will be delivered between 10 am - 6 pm){' '}
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="col-12 mt-4">
                <span className="red-color">{formError ? formError : ''}</span>
              </div>
              <div className=" hidden md:block p-4 px-8 flex justify-end items-center space-x-4">
                <Button
                  className="w-1/4  bg-[#48887B] py-4 rounded text-lg font-bold white-color"
                  onClick={onSave}
                >
                  Save
                </Button>
                {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
              </div>
            </div>
          </div>
        ) : error ? (
          <ErrorPage message={error.message} statusCode={404} />
        ) : (
          <>
            <p className="text-xl hidden md:block lg:block text-gray-900 font-bold">
              {' '}
              Delivery Address
            </p>
            <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-0 md:my-5 lg:my-5  ">
              {[...address].map((item, i) => (
                <div className="w-full rounded-lg shadow" key={i}>
                  <Address
                    type={item.address_tag == `Home` ? 'Home' : 'Work'}
                    data={item}
                    onEdit={() => {
                      setNewAddress(item)
                      setIsAddressActive(true)
                    }}
                    onRemove={() =>
                      removeAddress({
                        userId: user.customer_id,
                        addressId: item.address_id,
                        setError,
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex cursor-pointer mt-24 justify-center md:mt-0 lg:mt-0 md:justify-start lg:justify-start ">
              {/* <BsPlusCircle className="text-red-500" size={30} />

                <Button className="text-lg btn-color-revese  font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                  Add New Address
                </Button> */}
              <p className="text-xl hidden md:block lg:block text-gray-900 font-bold bg-white p-4">
                {' '}
                Saved Places
              </p>
            </div>
          </>
        )
        // <Loader />
      }
      <div
        className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `}
        style={{ zIndex: 1200 }}
      >
        {/* <Tracker status={cartHeader.status}/> */}
        <div
          className={`flex items-center absolute bottom-0  mb-4`}
          onClick={router.back}
        >
          <BsArrowLeft className={`mx-4`} size={35} color={'white'} />
          <p className={`text-2xl text-[white] mx-4`}>Enter New Address</p>
        </div>
        <div
          id="cart-total-btn md:hidden"
          className=" border-[1px] border-[#E7E7E7]   md:border-[0px]  w-full left-0 fixed sm:relative bottom-0 p-4 sm:p-0  bg-white sm:bg-transparent"
          style={{
            bottom: `${mobNavHeight}px`,
            zIndex: 1,
          }}
        >
          <div className="p-2 flex justify-end items-center ">
            <Button
              className="w-1/4 btn-bg px-4 py-2 rounded text-xl font-bold white-color"
              onClick={onSave}
            >
              Save
            </Button>
            {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  store: state.store.info,
  address: state.user.address,
})
const mapDispatchToProps = (dispatch) => ({
  getAddress: (payload) => dispatch(getAddressStart(payload)),
  addAddress: (payload) => dispatch(addAddressStart(payload)),
  updateAddress: (payload) => dispatch(updateAddressStart(payload)),
  removeAddress: (payload) => dispatch(removeAddressStart(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapper(withAuth(accountLayout(Savedplaces))))
