import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import accountLayout from '@components/layout/account-layout'
import Header from '@components/MobHeader/index'
import Address from '@components/Cards/Order/address/address'
import { BsPlusCircle } from 'react-icons/bs'
import withAuth from '@components/auth/withAuth'
import Loader from '@components/loading/loader'
import ErrorPage from '@components/error'
import { Input, Button } from '@components/inputs'
// Actions
import { getAddressStart, addAddressStart, updateAddressStart, removeAddressStart } from "@redux/user/user-action";
import PageWrapper from '@components/page-wrapper/page-wrapper'

function Savedplaces({ user, address, getAddress, addAddress, removeAddress, updateAddress }) {

  const addressStructure = {
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    address_fields: {},
    address_tag: "Home",
    country: "India",
    is_default: "",
    latitude: null,
    longitude: null,
    state: "",
    zip_code: ""
  }
  const [newAddress, setNewAddress] = useState(addressStructure)
  const [isAddressActive, setIsAddressActive] = useState(false);

  const [isLoadding, setIsLoadding] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState('')
  useEffect(() => {
    // if (!address.length) {
    getAddress({ userId: user.customer_id, setError })
    // }
  }, [])
  useEffect(() => {
    setIsLoadding(!!address.length)
  })
  const onChangeAddress = (e) => {
    const { value, name } = e.target;
    setFormError("")
    if (name == 'phone' || name == 'zip_code') {
      if (!(/^\d*$/.test(value))) return;
    }
    setNewAddress({ ...newAddress, [name]: value });
  }
  const onSave = () => {
    if (!newAddress.full_name || !newAddress.phone || !newAddress.address_line_1 || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.zip_code) {
      setFormError("Please fill all Required(*) field")
      return;
    }
    if (newAddress?.address_id) {
      updateAddress({
        userId: user.customer_id, addressId: newAddress.address_id, address: (({ full_name, phone, address_line_1, address_line_2, city, address_fields, address_tag, country, is_default, latitude, longitude, state, zip_code }) =>
          ({ full_name, phone, address_line_1, address_line_2, city, address_fields: {}, address_tag, country, is_default, latitude, longitude, state, zip_code }))(newAddress),
        setError
      })
    } else {
      addAddress({ userId: user.customer_id, address: newAddress, setError });
    }
    setIsAddressActive(false);
    setNewAddress(addressStructure);
  }
  return (
    <>
      {
        isLoadding ?
          <div className='w-full'>
            {/* <Header display={true} topic="Saved Address" /> */}
            <p className="text-xl hidden md:block lg:block text-gray-900 font-bold">
              {' '}
              Delivery Address
            </p>
            <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-0 md:my-5 lg:my-5  ">
              {
                [...address].map((item, i) => (
                  <div className="w-full rounded-lg shadow" key={i}>
                    <Address type={item.address_tag == `Home` ? 'Home' : 'Work'} data={item} onEdit={() => { setNewAddress(item); setIsAddressActive(true) }} onRemove={() => removeAddress({ userId: user.customer_id, addressId: item.address_id, setError })} />
                  </div>
                ))
              }
            </div>
            <div className="flex cursor-pointer mt-24 justify-center md:mt-0 lg:mt-0 md:justify-start lg:justify-start ">
              <BsPlusCircle className="btn-color-revers" size={30} />
              <Button className="text-lg btn-color-revese btn-color-revers font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                Add New Address
              </Button>
            </div>
          </div>
          : error ?
            <ErrorPage message={error.message} statusCode={404} />
            :
            <>
              <p className="text-xl hidden md:block lg:block text-gray-900 font-bold">
                {' '}
                Delivery Address
              </p>
              <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-0 md:my-5 lg:my-5  ">
                {
                  [...address].map((item, i) => (
                    <div className="w-full rounded-lg shadow" key={i}>
                      <Address type={item.address_tag == `Home` ? 'Home' : 'Work'} data={item} onEdit={() => { setNewAddress(item); setIsAddressActive(true) }} onRemove={() => removeAddress({ userId: user.customer_id, addressId: item.address_id, setError })} />
                    </div>
                  ))
                }
              </div>
              <div className="flex cursor-pointer mt-24 justify-center md:mt-0 lg:mt-0 md:justify-start lg:justify-start ">
                <BsPlusCircle className="text-red-500" size={30} />

                <Button className="text-lg btn-color-revese  font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                  Add New Address
                </Button>
              </div>
            </>
        // <Loader />
      }
      {
        isAddressActive &&
        <div className="fixed inset-0 px-4 sm:px-8 md:px-20 bg-black-color-lighter address-form">
          <div className='py-6 md:px-20 flex justify-end '>
            <svg onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className=" absolute inset-y-14  overflow-auto inset-x-0 mx-4 sm:mx-16 md:mx-32 lg:mx-80" >
            <div className="add-c">
              <div className="row">
                <div className="mt-4 col-12">
                  <span>Full Name*</span>
                  <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} />
                </div>
                <div className="mt-4 col-12">
                  <span>Phone*</span>
                  <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Phone number" value={newAddress.phone} />
                </div>
                <div className="mt-4 col-12">
                  <span>Address Line 1*</span>
                  <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="An Address" value={newAddress.address_line_1} />
                </div>
                <div className="mt-4 col-12">
                  <span>Address Line 2</span>
                  <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="An Address" value={newAddress.address_line_2} />
                </div>
                <div className="mt-4 col-md-6">
                  <span>City*</span>
                  <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} />
                </div>
                <div className="mt-4 col-md-6">
                  <span>State*</span>
                  <Input onChange={onChangeAddress} type="text" name='state' placeholder="State" value={newAddress.state} />
                </div>
                <div className="mt-4 col-md-6">
                  <span>Zin code*</span>
                  <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="Zin Code" value={newAddress.zip_code} />
                </div>
                <div className="mt-4 col-md-6">
                  <span>Country*</span>
                  <p>{newAddress.country}</p>
                </div>
                <div className="mt-4 col-md-12">
                  <span>Address Type</span>
                  <div className="flex justify-start items-start  p-2">
                    <div>
                      <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                      <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'>Home</label></div>
                    <div className="ml-24">
                      <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                      <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' >Work</label></div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <span className="red-color">{formError ? formError : ""}</span>
                </div>
                <div className="flex justify-between items-center space-x-4">
                  <Button className="w-full bg-success-color py-4 rounded white-color" onClick={onSave} >Save</Button>
                  <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
const mapStateToProps = state => ({
  address: state.user.address
})
const mapDispatchToProps = dispatch => ({
  getAddress: (payload) => dispatch(getAddressStart(payload)),
  addAddress: (payload) => dispatch(addAddressStart(payload)),
  updateAddress: (payload) => dispatch(updateAddressStart(payload)),
  removeAddress: (payload) => dispatch(removeAddressStart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Savedplaces))))
