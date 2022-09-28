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
import { getAddressStart, addAddressStart, updateAddressStart, removeAddressStart, getCountryAction } from "@redux/user/user-action";
import PageWrapper from '@components/page-wrapper/page-wrapper'
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs'
import { Modal } from 'antd'
import { useMediaQuery } from 'react-responsive'
import AddressForm from '@components/address-form/address-form'

function Savedplaces({ user, address, info, getAddress, addAddress, removeAddress, updateAddress ,getCountryAction}) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
  const router = useRouter()
  const addressStructure = {
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    address_fields: "",
    address_tag: "Home",
    country: "India",
    country_code: "IND",
    is_default: "",
    latitude: null,
    longitude: null,
    state: "Tamil Nadu",
    state_code: "TN",
    zip_code: "",
    isd_code:"91"
  }
  const [newAddress, setNewAddress] = useState(addressStructure)
  const [isAddressActive, setIsAddressActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoadding, setIsLoadding] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState('')
  const [countries,setCountries]=useState([])
  useEffect(() => {
    // if (!address.length) {
    getAddress({ userId: user.customer_id, setError })
    getCountryAction(setCountries)
    // }
  }, [])

  useEffect(() => {
    // setIsLoadding(!!address.length)
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
        userId: user.customer_id, addressId: newAddress.address_id, address: newAddress,
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
          <div className='w-full  bg-white md:bg-[transparent] '>
            {/* <Header display={true} topic="Saved Address" /> */}
            {
              !!address.length &&
              <p className="text-xl hidden md:block lg:block text-gray-900 font-bold bg-white px-4 sm:px-6 mb-0 sm:mb-6 py-0 sm:py-6 md:py-3">
                {' '}
                Saved Places
              </p>
            }

            {
              // !isAddressActive &&
              <div className="flex justify-center items-center btn-color-revese md:hidden mt-24" onClick={() => {
                router.push(`/account/newaddress`)
                // setIsAddressActive(true); setNewAddress(addressStructure)
              }}>
                <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 3.125C17.6562 3.125 21.875 7.34375 21.875 12.5C21.875 17.6562 17.6562 21.875 12.5 21.875C7.34375 21.875 3.125 17.6562 3.125 12.5C3.125 7.34375 7.34375 3.125 12.5 3.125ZM12.5 1.5625C6.48438 1.5625 1.5625 6.48438 1.5625 12.5C1.5625 18.5156 6.48438 23.4375 12.5 23.4375C18.5156 23.4375 23.4375 18.5156 23.4375 12.5C23.4375 6.48438 18.5156 1.5625 12.5 1.5625Z" />
                  <path d="M18.75 11.7188H13.2812V6.25H11.7188V11.7188H6.25V13.2812H11.7188V18.75H13.2812V13.2812H18.75V11.7188Z" />
                </svg>
                <p className="text-lg lg:block btn-color-revese font-bold bg-white p-4">
                  {' '}
                  Add New Address
                </p>
              </div>
            }

            {
              // !isAddressActive &&
              // <div className="grid lg:grid-cols-2 md:grid-cols-1 bg-white gap-6 my-0 md:my-5 lg:my-5  ">
              //   {
              //     [...address].map((item, i) => (
              //       <div className="w-full mt-4" key={i}>
              //         <Address type={item.address_tag == `Home` ? 'Home' : 'Work'} data={item} onEdit={() => { setNewAddress(item); setIsAddressActive(true) }} onRemove={() => removeAddress({ userId: user.customer_id, addressId: item.address_id, setError })} />
              //       </div>
              //     ))
              //   }
              // </div>
            }
            {
              isTabletOrMobile && <div className=" md:grid lg:grid-cols-2 md:grid-cols-1 bg-white gap-6 px-4 sm:px-6 sm:mb-6 py-2 sm:py-6 md:py-3 space-y-14 mb-[100px]">
                {
                  [...address].map((item, i) => (
                    <div className="w-full mt-4" key={i} >
                      <Address type={item.address_tag == `Home` ? 'Home' : 'Work'} ids={i} data={item} onEdit={() => router.push(
                        {
                          pathname: `/account/newaddress`,
                          query: item
                        },
                        // '/accounts/EditAddress'
                      )} onRemove={() => removeAddress({ userId: user.customer_id, addressId: item.address_id, setError })} />
                    </div>
                  ))
                }
              </div>
            }
            <div className="hidden md:grid lg:grid-cols-2 md:grid-cols-1 bg-white gap-6 my-0 md:my-5 lg:my-5  ">
              {
                [...address].map((item, i) => (
                  <div className="w-full mt-4" key={i} >
                    <Address type={item.address_tag == `Home` ? 'Home' : 'Work'} ids={i} data={item} onEdit={() => { setNewAddress(item); setIsAddressActive(true); }} onRemove={() => removeAddress({ userId: user.customer_id, addressId: item.address_id, setError })} />
                  </div>
                ))
              }
            </div>

            {/* <div className="flex cursor-pointer md:mt-24 justify-center lg:mt-0 md:justify-start lg:justify-start ">
              <BsPlusCircle className="btn-color-revers" size={30} />
              <Button className="text-lg btn-color-revese btn-color-revers font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                Add New Address
              </Button>
              <p className="text-xl w-full hidden md:block lg:block text-gray-900 font-bold bg-white px-4 sm:px-6 mb-0 sm:mb-6 py-0 sm:py-6 md:py-3">
                {' '}
                Add New Address
              </p>
            </div> */}
            {/* for desktop view */}
            {
              !isTabletOrMobile && <>
                {
                  !isAddressActive ?
                    <div className='flex-1 px-4 sm:px-8 py-6 sm:py-8  bg-white'>
                      <Button type='link' href='#address-form' className=' btn-color-revers' onClick={() => { 
                        setIsAddressActive(true); setNewAddress(addressStructure)
                         }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> Add new Address
                      </Button>
                    </div>
                    :
                    <div className='flex-1 p-6 sm:p-8 bg-white' id={'address-form'}>
                      <AddressForm countries={countries} edit={newAddress} close={() => setIsAddressActive(false)} />
                    </div>
                }
              </>
            }
            {/* <div className=" hidden md:block bg-white">
              <div className="py-2 md:p-4 px-2 md:px-8  w-full xl:w-1/2  ">
                <span className=" font-[500] text-lg md:block hidden  ">Country*</span>
                <Input onChange={onChangeAddress} type="text" name='country' placeholder="Your Country/Region..." value={newAddress.country} className="h-[48px] my-2 rounded border border-gray-300 " />
              </div>
              <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
                <span className=" font-[500] text-lg md:block hidden  ">Name*</span>
                <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} className="h-[48px] my-2 rounded border border-gray-300 " />
              </div>

              <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
                <span className=" font-[500] text-lg md:block hidden  ">Mobile Number ( Commonly Used to Assist Delivery ) *</span>
                <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} className="h-[48px] my-2 rounded border border-gray-300 " />
              </div>
              <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
                <span className=" font-[500] text-lg md:block hidden  ">Flat no., House no./ House Name, Road no.*</span>
                <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} className="h-[48px] my-2 rounded border border-gray-300 " />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                <div className="py-2 md:p-4 px-2 md:px-8 w-full   ">
                  <span className=" font-[500] text-lg md:block hidden  ">Colony, Area, Street, Village</span>
                  <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="More Address Details" value={newAddress.address_line_2} className="h-[48px] my-2 rounded border border-gray-300 " />
                </div>
                <div className="py-2 md:p-4 px-2 md:px-8 w-full ">
                  <span className=" font-[500] text-lg md:block hidden  ">City*</span>
                  <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} className="h-[48px] my-2 rounded border border-gray-300 " />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                <div className="py-2 md:p-4 px-2 md:px-8 w-full  ">
                  <span className=" font-[500] text-lg md:block hidden  ">State*</span>
                  <Input onChange={onChangeAddress} type="text" name='state' placeholder="state" value={newAddress.state} className="h-[48px] my-2 rounded border border-gray-300 " />
                </div>
                <div className="py-2 md:p-4 px-2 md:px-8 w-full     ">

                  <span className="  font-[500] text-lg md:block hidden  ">Zip Code*</span>
                  <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="zip_code" value={newAddress.zip_code} className="h-[48px] my-2  rounded border border-gray-300 " />
                </div>
              </div>
              <div className="p-4 px-8 ">
                <span className=" font-[500] text-lg md:block hidden  ">Address Type*</span>
                <div className=" justify-start items-start  p-2">
                  <div>
                    <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                    <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'> <span className="font-[500] text-black">Home Address </span> ( product will be delivered between 7 am to 9 pm) </label></div>
                  <div className="mt-4">
                    <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                    <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' > <span className="font-[500] text-black">Office/ Work Address </span> ( product will be delivered between 10 am - 6 pm) </label></div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <span className="red-color">{formError ? formError : ""}</span>
              </div>
              <div className=" p-4 px-8">
                <Button className="w-1/4 btn-bg btn-color py-4 px-10 rounded text-lg font-bold white-color" onClick={onSave} >Save</Button>
                {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
            {/*</div>
            </div> * /}
            {/* for mobile view */ }
            {
              isAddressActive && isTabletOrMobile &&
              <div className='flex-1 p-6 pb-20 sm:p-8 bg-white' id={'address-form'}>
                <AddressForm countries={countries} edit={newAddress} close={() => setIsAddressActive(false)} />
              </div>
              // <div className="mb-14 bg-white">
              //   <div className="py-2 md:p-4 px-2 md:px-8  w-full xl:w-1/2  ">
              //     <span className=" font-bold text-lg md:block hidden  ">Country*</span>
              //     <Input onChange={onChangeAddress} type="text" name='country' placeholder="Your Country/Region..." value={newAddress.country} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //   </div>
              //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
              //     <span className=" font-bold text-lg md:block hidden  ">Name*</span>
              //     <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //   </div>

              //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
              //     <span className=" font-bold text-lg md:block hidden  ">Mobile Number ( Commonly Used to Assist Delivery ) *</span>
              //     <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //   </div>
              //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
              //     <span className=" font-bold text-lg md:block hidden  ">Flat no., House no./ House Name, Road no.*</span>
              //     <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //   </div>
              //   <div className="w-full md:flex">
              //     <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2   ">
              //       <span className=" font-bold text-lg md:block hidden  ">Colony, Area, Street, Village</span>
              //       <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="More Address Details" value={newAddress.address_line_2} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //     </div>
              //     <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
              //       <span className=" font-bold text-lg md:block hidden  ">City*</span>
              //       <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //     </div>
              //   </div>

              //   <div className="py-2 px-2 md:py-4  w-full flex">
              //     <div className="pr-1 md:p-4 md:px-2 md:px-8 w-full xl:w-1/2  ">
              //       <span className=" font-bold text-lg md:block hidden  ">State*</span>
              //       <Input onChange={onChangeAddress} type="text" name='state' placeholder="state" value={newAddress.state} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
              //     </div>
              //     <div className="pl-1 md:p-4 md:px-2 md:px-8 w-full xl:w-1/2   ">

              //       <span className="  font-bold text-lg md:block hidden  ">Zip Code*</span>
              //       <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="zip_code" value={newAddress.zip_code} className="h-[48px] my-2  rounded border-2 border-gray-300 " />
              //     </div>
              //   </div>
              //   <div className="p-4 px-8 ">
              //     <span className=" font-bold text-lg md:block hidden  ">Address Type*</span>
              //     <div className=" justify-start items-start  p-2">
              //       <div>
              //         <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
              //         <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'> <span className="font-bold text-black">Home Address </span> ( product will be delivered between 7 am to 9 pm) </label></div>
              //       <div className="mt-4">
              //         <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
              //         <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' > <span className="font-bold text-black">Office/ Work Address </span> ( product will be delivered between 10 am - 6 pm) </label></div>
              //     </div>
              //   </div>
              //   <div className="col-12 m-4">
              //     <span className="red-color">{formError ? formError : ""}</span>
              //   </div>
              //   <div className=" p-4 px-8 ">
              //     <Button className="w-1/4   py-4 px-8 rounded text-lg font-bold " onClick={onSave} >Save</Button>
              //     {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
              //   </div>
              // </div>
            }
          </div >
          : error ?
            <ErrorPage message={error.message} statusCode={404} />
            :
            <>
              <p className="text-xl w-full hidden md:block lg:block text-gray-900 font-bold bg-white p-4">
                {' '}
                Saved Places
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
                {/* <BsPlusCircle className="text-red-500" size={30} />

                <Button className="text-lg btn-color-revese  font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                  Add New Address
                </Button> */}
                {/* <p className="text-xl w-full hidden md:block lg:block text-gray-900 font-bold bg-white p-4">
                  {' '}
                  Saved Places
                </p> */}
              </div>
            </>
        // <Loader />
      }
      <div className='w-full  bg-white md:bg-[transparent] '>


        <div className="flex cursor-pointer md:mt-24 justify-center lg:mt-0 md:justify-start lg:justify-start ">
          {/* <BsPlusCircle className="btn-color-revers" size={30} />
              <Button className="text-lg btn-color-revese btn-color-revers font-semibold ml-4 " onClick={() => setIsAddressActive(true)}>
                Add New Address
              </Button> */}
          {/* <p className="text-xl w-full hidden md:block lg:block text-gray-900 font-bold bg-white px-4 sm:px-6 mb-0 sm:mb-6 py-0 sm:py-6 md:py-3">
            {' '}
            Add New Address
          </p> */}
        </div>

        {/* for desktop view */}
        {/* <div className=" hidden md:block bg-white">
          <div className="py-2 md:p-4 px-2 md:px-8  w-full xl:w-1/2  ">
            <span className=" font-[500] text-lg md:block hidden  ">Country*</span>
            <Input onChange={onChangeAddress} type="text" name='country' placeholder="Your Country/Region..." value={newAddress.country} className="h-[48px] my-2 rounded border border-gray-300 " />
          </div>
          <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
            <span className=" font-[500] text-lg md:block hidden  ">Name*</span>
            <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} className="h-[48px] my-2 rounded border border-gray-300 " />
          </div>

          <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
            <span className=" font-[500] text-lg md:block hidden  ">Mobile Number ( Commonly Used to Assist Delivery ) *</span>
            <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} className="h-[48px] my-2 rounded border border-gray-300 " />
          </div>
          <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
            <span className=" font-[500] text-lg md:block hidden  ">Flat no., House no./ House Name, Road no.*</span>
            <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} className="h-[48px] my-2 rounded border border-gray-300 " />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            <div className="py-2 md:p-4 px-2 md:px-8 w-full   ">
              <span className=" font-[500] text-lg md:block hidden  ">Colony, Area, Street, Village</span>
              <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="More Address Details" value={newAddress.address_line_2} className="h-[48px] my-2 rounded border border-gray-300 " />
            </div>
            <div className="py-2 md:p-4 px-2 md:px-8 w-full ">
              <span className=" font-[500] text-lg md:block hidden  ">City*</span>
              <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} className="h-[48px] my-2 rounded border border-gray-300 " />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            <div className="py-2 md:p-4 px-2 md:px-8 w-full  ">
              <span className=" font-[500] text-lg md:block hidden  ">State*</span>
              <Input onChange={onChangeAddress} type="text" name='state' placeholder="state" value={newAddress.state} className="h-[48px] my-2 rounded border border-gray-300 " />
            </div>
            <div className="py-2 md:p-4 px-2 md:px-8 w-full     ">

              <span className="  font-[500] text-lg md:block hidden  ">Zip Code*</span>
              <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="zip_code" value={newAddress.zip_code} className="h-[48px] my-2  rounded border border-gray-300 " />
            </div>
          </div>
          <div className="p-4 px-8 ">
            <span className=" font-[500] text-lg md:block hidden  ">Address Type*</span>
            <div className=" justify-start items-start  p-2">
              <div>
                <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
                <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'> <span className="font-[500] text-black">Home Address </span> ( product will be delivered between 7 am to 9 pm) </label></div>
              <div className="mt-4">
                <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
                <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' > <span className="font-[500] text-black">Office/ Work Address </span> ( product will be delivered between 10 am - 6 pm) </label></div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <span className="red-color">{formError ? formError : ""}</span>
          </div>
          <div className=" p-4 px-8">
            <Button className="w-1/4 btn-bg btn-color py-4 px-10 rounded text-lg font-bold white-color" onClick={onSave} >Save</Button>
            {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
        {/*</div>
        </div> */}
        {/* for mobile view */}
        {
          // isAddressActive &&
          // <div className="mb-14 bg-white">
          //   <div className="py-2 md:p-4 px-2 md:px-8  w-full xl:w-1/2  ">
          //     <span className=" font-bold text-lg md:block hidden  ">Country*</span>
          //     <Input onChange={onChangeAddress} type="text" name='country' placeholder="Your Country/Region..." value={newAddress.country} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //   </div>
          //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
          //     <span className=" font-bold text-lg md:block hidden  ">Name*</span>
          //     <Input onChange={onChangeAddress} type="text" name='full_name' placeholder="Your full name..." value={newAddress.full_name} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //   </div>

          //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
          //     <span className=" font-bold text-lg md:block hidden  ">Mobile Number ( Commonly Used to Assist Delivery ) *</span>
          //     <Input onChange={onChangeAddress} type="text" name='phone' placeholder="Enter Your 10 digit Mobile Number" value={newAddress.phone} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //   </div>
          //   <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
          //     <span className=" font-bold text-lg md:block hidden  ">Flat no., House no./ House Name, Road no.*</span>
          //     <Input onChange={onChangeAddress} type="text" name='address_line_1' placeholder="Address" value={newAddress.address_line_1} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //   </div>
          //   <div className="w-full md:flex">
          //     <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2   ">
          //       <span className=" font-bold text-lg md:block hidden  ">Colony, Area, Street, Village</span>
          //       <Input onChange={onChangeAddress} type="text" name='address_line_2' placeholder="More Address Details" value={newAddress.address_line_2} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //     </div>
          //     <div className="py-2 md:p-4 px-2 md:px-8 w-full xl:w-1/2  ">
          //       <span className=" font-bold text-lg md:block hidden  ">City*</span>
          //       <Input onChange={onChangeAddress} type="text" name='city' placeholder="City" value={newAddress.city} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //     </div>
          //   </div>

          //   <div className="py-2 px-2 md:py-4  w-full flex">
          //     <div className="pr-1 md:p-4 md:px-2 md:px-8 w-full xl:w-1/2  ">
          //       <span className=" font-bold text-lg md:block hidden  ">State*</span>
          //       <Input onChange={onChangeAddress} type="text" name='state' placeholder="state" value={newAddress.state} className="h-[48px] my-2 rounded border-2 border-gray-300 " />
          //     </div>
          //     <div className="pl-1 md:p-4 md:px-2 md:px-8 w-full xl:w-1/2   ">

          //       <span className="  font-bold text-lg md:block hidden  ">Zip Code*</span>
          //       <Input onChange={onChangeAddress} type="text" name='zip_code' placeholder="zip_code" value={newAddress.zip_code} className="h-[48px] my-2  rounded border-2 border-gray-300 " />
          //     </div>
          //   </div>
          //   <div className="p-4 px-8 ">
          //     <span className=" font-bold text-lg md:block hidden  ">Address Type*</span>
          //     <div className=" justify-start items-start  p-2">
          //       <div>
          //         <input type="radio" name="address_tag" id="add-t-1" value='Home' onChange={onChangeAddress} checked={newAddress.address_tag == 'Home'} />
          //         <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Home' ? "selected" : ""}`} htmlFor='add-t-1'> <span className="font-bold text-black">Home Address </span> ( product will be delivered between 7 am to 9 pm) </label></div>
          //       <div className="mt-4">
          //         <input type="radio" name="address_tag" value='Work' id="add-t-2" onChange={onChangeAddress} checked={newAddress.address_tag == 'Work'} />
          //         <label className={`font-12 ml-4 font-w-600 type-of-address ${newAddress.address_tag == 'Work' ? "selected" : ""}`} htmlFor='add-t-2' > <span className="font-bold text-black">Office/ Work Address </span> ( product will be delivered between 10 am - 6 pm) </label></div>
          //     </div>
          //   </div>
          //   <div className="col-12 m-4">
          //     <span className="red-color">{formError ? formError : ""}</span>
          //   </div>
          //   <div className=" p-4 px-8 ">
          //     <Button className="w-1/4   py-4 px-8 rounded text-lg font-bold " onClick={onSave} >Save</Button>
          //     {/* <Button className="w-full bg-red-color py-4 rounded white-color" onClick={() => { setIsAddressActive(false); setNewAddress(addressStructure) }}>Cancel</Button> */}
          //   </div>
          // </div>
        }
      </div>






      <div className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `} style={{ zIndex: 1200 }}>

        {/* <Tracker status={cartHeader.status}/> */}
        <div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4 nav-items-color`} size={35} />
          <p className={`text-2xl nav-items-color mx-4`}>Saved Places</p>
        </div>
      </div>

    </>
  )
}
const mapStateToProps = state => ({
  address: state.user.address,
  info: state.store.info,

})
const mapDispatchToProps = dispatch => ({
  getAddress: (payload) => dispatch(getAddressStart(payload)),
  addAddress: (payload) => dispatch(addAddressStart(payload)),
  updateAddress: (payload) => dispatch(updateAddressStart(payload)),
  removeAddress: (payload) => dispatch(removeAddressStart(payload)),
  getCountryAction: (payload) => dispatch(getCountryAction(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(accountLayout(Savedplaces))))
