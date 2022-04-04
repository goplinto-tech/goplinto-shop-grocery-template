import { Button, Input } from '@components/inputs'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { IoMdCart } from 'react-icons/io'
import Link from 'next/link'
import Slider from '@components/Products/slider'
import OfferCard from '@components/Cards/Home/OfferCard'
import SliderCard from '@components/Cards/Home/sliderCard'
export default function name() {
  return (
    <>
      {/* // Navbar */}
      <div className="flex flex-row">
        <div class="basis-1/5  md:1/6 lg:1/5 h-20 md:w-max lg:w-full  md:mx-2 lg:mx-0 lg:w-full flex items-center">
          <Button className="md:w-max lg:w-full" type="link" href="/">
            <div className="flex  justify-center md:w-max lg:w-full  items-center ">
              <div className="h-30 w-30  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                <img
                  className="w-100 h-100 object-contain"
                  src={
                    /*info.logo_img_url*/ ' /img/grocerylogo.png' ||
                    '/img/default.png'
                  }
                  alt="..."
                />
              </div>
            </div>
          </Button>
        </div>
        <div class="basis-1/2 flex items-center h-20">
          <div className=" flex flex-row justify-between w-full ">
            <div className="basis-1/4 border-white  h-10 text-black flex items-center">
              <GrLocation size={20} />
              <div className="mx-2">
                <p className="font-normal lg:text-base md:text-sm text-gray-600 leading-tight ">
                  Shipping to
                </p>
                <p className="font-bold lg:text-base md:text-sm ">
                  Login/Sign Up
                </p>
              </div>
            </div>

            <div className=" basis-3/4 mx-4 w-full flex rounded">
              <Input className=" h-10 " />
              <div className="bg-green-900 lg:px-8 md:px-2  rounded-r flex items-center ">
                <AiOutlineSearch color={'white'} size={20} />
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/4     justify-between items-center">
          <div className=" flex flex-row justify-between items-center text-black mt-4">
            <div className=" w-full flex justify-around">
              <span className="whitespace-nowrap font-bold inline-block tracking-tight md:text-sm lg:text-lg">
                Home
              </span>
              <span className="whitespace-nowrap font-bold inline-block tracking-tight  md:text-sm lg:text-lg">
                shop
              </span>
              <span className="whitespace-nowrap font-bold inline-block tracking-tight md:text-sm lg:text-lg">
                About
              </span>
            </div>
            <div className=" flex justify-end ">
              <Button
                className="flex items-center text-black"
                type="link"
                href="/cart"
              >
                <span className=" text-black font-bold  my-2 relative">
                  <IoMdCart size={30} />
                  {
                    // !!totalItems &&
                    <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center bg-red-600 rounded-full text-white items-center text-xs text-center rounded-full btn-bg btn-color border border-white">
                      {
                        // totalItems
                        4
                      }
                    </div>
                  }
                </span>
              </Button>
            </div>
            {
              // !isLogin && !user ?
              // <div className="w-32 ml-8 shrink-0 flex items-center">
              //   <Button onClick={openAuth} className=" bg-white text-black max-h-min text-base font-medium rounded py-3 px-8 hover:bg-rose-600 hover:text-white " title="Sign In"></Button>
              // </div>
              // :
              <div className=" w-max flex relative text-black items-center justify-end ml-4 cursor-pointer account">
                <div className=" w-6 h-6 bg-gray-100 text-gray-400 p-5 overflow-hidden flex justify-center items-center rounded-full">
                  <span className="text-sm font-extrabold	">
                    {(() => {
                      // const name = user.full_name.split(' ')
                      // if (name.length) {
                      //   if (name.length > 1) {
                      //     return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
                      //   }
                      //   return `${name[0][0]}${name[0][1]}`.toUpperCase()
                      // }
                      return 'A'
                    })()}
                  </span>
                </div>
                <div className="flex ">
                  {/* <span className='block min-w-max text-dark text-lg font-bold tracking-tight  mt-2  ml-2 mr-2'> My Account</span> */}
                  <AiFillCaretDown className="" size={18} />
                </div>

                <div className="absolute w-full hidden account-options top-full z-10">
                  <div
                    className="p-6 mt-6 bg-white w-full rounded account-options-c"
                    style={{ boxShadow: '0px 4px 8px #2424243F' }}
                  >
                    <ul className="list-none black-color-75 text-base font-medium space-y-6">
                      <li className="btn-hover-color">
                        <Link href="/account">
                          <a>Account</a>
                        </Link>
                      </li>
                      <li className="btn-hover-color">
                        <Link href="/account/myorders">
                          <a>My Orders</a>
                        </Link>
                      </li>
                      <li className="btn-hover-color">
                        <Link href="/account/savedplaces">
                          <a>Saved Places</a>
                        </Link>
                      </li>
                      <li
                        className="btn-hover-color cursor-pointer"
                        onClick={() => {
                          logOut()
                          setIsLogin(false)
                        }}
                      >
                        <span className="">Log Out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: '#48887B' }}
        className="    white-color   wrapper mx-auto "
      >
        <div className="flex justify-around w-11/12 mx-12">
          <div className="flex justify-center  items-center">
            <p className="text-sm">Packaged food</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Drinnks & Snacks</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Coocking Essentials</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Personal & Baby Care</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Cleaning & Hygiene</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Home & Kitchen</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
          <div className="flex justify-center  items-center">
            <p className="text-sm">Other</p>
            <BsChevronDown className="ml-1" size={10} />
          </div>
        </div>
      </div>
      {/* navbar End */}

      <div className="flex flex-row wrapper w-full ">
        <div className="basis-1/12 "></div>
        <div className=" basis-10/12">
          <Slider />
        </div>
        <div className="basis-1/12 "></div>
      </div>

      <div className="flex flex-row wrapper w-full ">
        <div className="basis-2/12 "></div>
        <div className=" basis-8/12">
          {/* Best offer card */}
          <OfferCard />
          {/* Fresh Items */}
          <SliderCard color="#C0EDAB80" title="Fresh Item" />

          <SliderCard color="#F3ECDB" title="Personal Care" />

          {/* Personal Care */}

          {/* Recommended Card */}
        </div>
        <div className="basis-2/12 "></div>
      </div>
    </>
  )
}
