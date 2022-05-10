import Link from "@components/link"
import { connect } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronDown } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { Router, useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { redirect } from '@components/link';

import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai'
import { IoMdCart } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr';

import { Button, Input } from '@components/inputs';
import headerImg from './header-background.jpg'
// Actions
import { authShowToggle } from '@redux/user/user-action'
import { logOutStart } from '@redux/user/user-action'
import { logOut } from "@redux/UI/ui-action";
import {
  getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart
} from "@redux/shop/shop-action";
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'

const Navbar = ({ user, cart, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler, displaySettings, openAuth, logOut, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, searchHandler, info, ref }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const [isLogin, setIsLogin] = useState(false)
  const [mobNaveHeight, setMobNaveHeight] = useState(10)
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
  const storeId = info.store_id;
  const [query, setQuery] = useState('')
  const [Menu, setmenu] = useState(false)
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
  useEffect(() => {
    getShopInfo(storeId);
    getShopSeo(storeId);
    getShopSettings(storeId);
    getSocialProfile(storeId);
    getShopDisplaySettings(storeId)

  }, [])
  useEffect(() => {
    setIsLogin(!!user)
  }, [user])

  const onInputChangeHandler = (e) => {
    setQuery(e.target.value)
    // if (!searchHandler) {
    //   router.push(`/`);
    // }


    // This handler function comming from PLP page via redux
  }
  const onSearched = () => {

    searchHandler(query)

    // if (!searchHandler) {
    //     router.push(`/`);
    //     setStatus('loading')
    //     redirect(`/?search=${query}`)
    //   }

  }


  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategory, search } = Router.query;
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  const [q, setq] = useState(search ? search : '');


  useEffect(() => {
    if (search) {
      getSearchProducts({ storeId, q: q.trim(), setSearchResult, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

    } else if (category) {
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategory, page: 1, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

      // setq('') // Cleaning query string of search
    } else {
      // getShopProducts({ storeId, setStatus })
      // setStatus('loading') // Set to success default Because its run whene All  products are fetching
      // setq('') // Cleaning query string of search
    }
  }, [Router.query])
  const [lists, setlists] = useState([])
  useEffect(() => {
    setlists(categories.length > 0 && categories)
  }, [categories.length])

  const name = Router?.route?.split('/')[3]
  // console.log(name,'line101')

  const [cathover, setcathover] = useState({
    id: [],
    active: true
  })


  return (
    <nav className='sticky top-0  ' ref={ref} style={{ backgroundColor: `#F9F6ED` }}>

      <div className={(router.pathname == "/[name]/[storeId] hidden md:block " || ['search', 'category'].some(val => router.asPath.includes(val))) || isDesktopOrLaptop ? `navbar-body  relative bg-[#F9F6ED] hidden md:block` : 'hidden'} >

        <div className="flex flex-row  py-4 w-full">
          <div className="basis-1/12  md:basis-1/12 lg:basis-1/6 h-20 md:w-max lg:w-full  md:mx-2 lg:mx-0 lg:w-full flex items-center">
            <Button className="md:w-max lg:w-full" type="link" href="/">
              <div className="flex  justify-center md:w-max lg:w-full  items-center ">
                <div className="h-20 w-20  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                  <img
                    className="w-100 h-100 object-contain"
                    src={info.logo_img_url || '/img/default.png'} alt="..."

                  />
                </div>
              </div>
            </Button>
          </div>
          <div className="basis-1/2 flex items-center h-20">
            <div className=" flex flex-row justify-between w-full ">
              <div className="basis-1/4 border-white  h-10 text-black flex items-center">
                <GrLocation size={20} />
                <div className="mx-2">
                  <p className="font-normal lg:text-base md:text-sm text-gray-600 leading-tight ">
                    Shipping to
                  </p>
                  {
                    !isLogin && !user &&
                    <p onClick={openAuth} className={` cursor-pointer font-bold lg:text-base md:text-sm ${isLogin && user ? 'hidden' : 'flex'}`}>
                      Login/Sign Up
                    </p>
                  }
                </div>
              </div>

              <div className=" basis-3/4 mx-4 w-full flex rounded">
                <Input className=" h-10 " placeholder='Search for items' onChange={onInputChangeHandler} />
                <div className="bg-[#48887B] lg:px-8 md:px-2  cursor-pointer rounded-r flex items-center " onClick={onSearched}>
                  <AiOutlineSearch color={'white'} size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="md:basis-2/4 lg:basis-1/4    items-center">
            <div className=" flex flex-row justify-between items-center text-black mt-4">
              <div className=" w-full flex justify-around ">
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
              <div className="  flex justify-end ">
                <Button
                  className="flex items-center text-black"
                  type="link"
                  href="/cart"
                >
                  <span className=" text-black font-bold  my-2 relative">
                    <IoMdCart size={30} />
                    {
                      !!totalItems &&
                      <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex bg-[#F58634] justify-center bg-red-600 rounded-full text-white items-center text-xs text-center rounded-full btn-bgs btn-color border border-white">
                        {
                          totalItems

                        }
                      </div>
                    }
                  </span>
                </Button>
              </div>
              {
                !isLogin && !user ?
                  <div className="w-32 ml-8 hidden shrink-0 flex items-center">
                    <Button onClick={openAuth} className=" bg-white text-black max-h-min text-base font-medium rounded py-3 px-8 hover:bg-orange-400 hover:text-white " title="Sign In"></Button>
                  </div>
                  :
                  <div className=" w-max flex relative text-black items-center justify-end lg:ml-4 md:mx-4  cursor-pointer account">
                    <div className=" w-6 h-6 bg-gray-100 text-gray-400 p-5 overflow-hidden flex justify-center items-center rounded-full">
                      <span className="text-sm font-extrabold	">
                        {(() => {
                          const name = user?.full_name.split(' ')
                          if (name?.length) {
                            if (name?.length > 1) {
                              return `${name[0][0]}${name[name?.length - 1][0]}`.toUpperCase()
                            }
                            return `${name[0][0]}${name[0][1]}`.toUpperCase()
                          }
                          return 'A'
                        })()}
                      </span>
                    </div>
                    <div className="flex ">
                      {/* <span className='block min-w-max text-dark text-lg font-bold tracking-tight  mt-2  ml-2 mr-2'> My Account</span> */}
                      <AiFillCaretDown className="" size={18} />
                    </div>

                    <div className="absolute w-40 hidden  account-options top-full -right-12 z-10">
                      <div
                        className="py-6 px-4 mt-6 bg-white w-full rounded account-options"
                        style={{ boxShadow: '0px 4px 8px #2424243F' }}
                      >
                        <ul className="list-none black-color-75 text-base font-medium space-y-6">
                          <li className="btn-hover-colors hover:text-[#48887B]">
                            <Link href="/account">
                              <a>Account</a>
                            </Link>
                          </li>
                          <li className="btn-hover-colors cursor-pointer hover:text-[#48887B]">
                            <Link href="/account/myorders">
                              <a>My Orders</a>
                            </Link>
                          </li>
                          <li className="btn-hover-colors cursor-pointer hover:text-[#48887B]">
                            <Link href="/account/savedplaces">
                              <a>Saved Places</a>
                            </Link>
                          </li>
                          <li
                            className="btn-hover-colors cursor-pointer hover:text-[#48887B]"
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
        <div style={{ backgroundColor: '#48887B' }}
          className="    white-color   wrapper mx-auto " onMouseLeave={() => { setcathover({ ...cathover, active: false }) }}>
          <div className="flex justify-around w-11/12 mx-12">
            {
              lists.length > 0 && lists.map((item, i) => (
                i < 6 ?
                  <div key={i}>
                    <div className="flex  items-center cursor-pointer" onMouseOver={() => { setcathover({ ...cathover, id: item.category_id, active: true }) }} >

                      <span className=" inline text-sm  mx-1 ">{item.category_name}</span>
                      <span>
                        <BsChevronDown className="" size={10} />

                      </span>
                    </div>

                    <div className={`flex  absolute top-[95%]   items-center  `} onMouseLeave={() => { setcathover({ ...cathover, id: [], active: false }) }}>



                      <ul className={` ${cathover.id === item.category_id ? cathover.active ? "" : 'hidden' : "hidden"} cursor-pointer text-gray-700 white-color
   relative `}>


                        {
                          item.subCategories.map((item, i) => (
                            <Link key={i + i} href={`/?category=${item.category_id}&subCategoryId=${item.sub_category_id}`}>
                              <li  ><a className=" bg-[#48887B] hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"  >{item.sub_category_name}</a></li>

                            </Link>


                          ))
                        }


                      </ul>


                    </div>



                  </div>
                  :
                  i === 6 &&
                  <div key={i}>
                    <div className="flex  items-center" onMouseOver={() => { setcathover({ ...cathover, id: 'other', active: true }) }}>

                      <span className=" inline text-sm  mx-1">others</span>
                      <span>
                        <BsChevronDown className="" size={10} />

                      </span>
                    </div>

                    <div key={i + "llll"} className={`flex  absolute top-[93%]   items-center  `} onMouseLeave={() => { setcathover({ ...cathover, id: [], active: false }) }} >



                      <ul className={`  ${cathover.id === 'other' ? cathover.active ? "" : 'hidden' : "hidden"}  text-gray-700 white-color
       relative `}  >


                        {
                          lists.length > 0 && lists.map((item, i) => (
                            i >= 6 &&
                            <li key={i + 'lll'} className=""><a className=" bg-[#48887B] hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{item.category_name}</a></li>


                          ))
                        }


                        {/* <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li> */}
                      </ul>


                    </div>



                  </div>
              ))

            }

          </div>


        </div>







      </div>

      <div className={`md:hidden   shadow-lg bg-[#48887B] h-[124px] w-full `}>
        <div className=" flex justify-between ">

          <GiHamburgerMenu onClick={() => { setmenu(true) }} className="m-4 my-4 cursor-pointer" color={'white'} size={30} />
          <Button className="md:w-max mt-3 mb-3 lg:w-full" type="link" href="/">
            <div className="flex  w-[135px] h-[46px]   rounded md:w-max lg:w-full  ">
              <div className="h-full w-full rounded  shrink-0 flex  justify-center overflow-hidden r items-center">
                <img
                  className="w-100 h-100 object-cover"
                  src={info.logo_img_url || '/img/default.png'} alt="..."

                />
              </div>
            </div>
          </Button>
          <div>
            <Button
              className="flex items-center my-4 mx-4 text-black"
              type="link"
              href="/cart"
            >
              <span className=" text-white font-bold   relative">
                <IoMdCart size={30} color={"white"} />
                {
                  !!totalItems &&
                  <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center bg-[#F58634] rounded-full text-white items-center text-xs text-center rounded-full btn-bgs btn-color border border-white">
                    {
                      totalItems

                    }
                  </div>
                }
              </span>
            </Button>
          </div>
        </div>


        <div className={" bg-[#F9F6ED]  rounded-lg mx-4  mt-1 shadow-lg flex rounded"}>
          <Input className=" py-2 w-11/12 border-[0.1px] rounded-l-lg border-[#F9F6ED] bg-transparent focus:outline-none " placeholder='Search ' onChange={onInputChangeHandler} />
          <div className="bg-[#F9F6ED] lg:px-8 md:px-2 px-4 py-2  border-none outline-none cursor-pointer rounded-r-lg flex items-center " onClick={onSearched}>
            <FiSearch color={'black'} size={20} />
          </div>
        </div>



      </div>
      {
        Menu &&
        <div className="w-full transition duration-150 ease-in-out bg-white h-[130vh] absolute z-[inherit] top-0 ">
          <div className="my-4  flex   w-full h-[200px]">
            <AiOutlineClose onClick={() => { setmenu(false) }} className="ml-6" color={'gray'} size={40} />
            <div className="  shrink-0 flex  mx-16  overflow-hidden rounded-md items-center">
              <img
                className="w-[200px] h-[200px] object-cover"
                src={
                  info.logo_img_url
                  ||
                  '/img/default.png'
                }
                alt="..."
              />
            </div>
          </div>

          <div class="grid grid-cols-1 divide-y">
            <div >
              {/* <p className="py-6 px-14 text-base font-[600]">About</p> */}
            </div>

            <div >
              <p className="py-6 cursor-pointer px-14 text-lg font-[600]">About</p>
            </div>
            <div >
              <p className="py-6 cursor-pointer px-14 text-lg font-[600]">Contact Us</p>
            </div> <div >
              <p className="py-6 cursor-pointer px-14 text-lg font-[600]">Privecy Policy</p>
            </div> <div >
              <p className="py-6 cursor-pointer px-14 text-lg font-[600]">Return & Refunds</p>
            </div>
            <div >
              <p className="py-6 cursor-pointer px-14 text-lg font-[600]">Terms of Service</p>
            </div>
            <div >
              {/* <p className="py-6 px-14 text-base font-[600]">About</p> */}
            </div>
          </div>

        </div>
      }



      {/* Navbar for mobile */}
      {
        name !== 'cart' && 'thank-you' &&
        <MediaQuery maxWidth={640}>
          <div id='mob-navbar' className={`mob-navbar   z-10 py-2 flex sm:justify-end items-center white-color justify-between w-full fixed sm:relative bottom-[-1px] left-0 right-0 bg-white sm:bg-transparent `} style={{ boxShadow: '0px -1px 4px #00000033' }}>
            <div className='text-black w-1/4 flex flex-col  '>
              <Button type='link' href='/' className={`block sm:hidden text-center text-xs ${router.asPath == '/' || router.pathname == '/[name]/[storeId]' && 'btn-nav-color-actives text-[#48887B]'}`}>
                <div className={` w-[24px] h-[24px] mx-auto`}>
                  <img src="/img/Home.png" />
                </div>
                <span>Home</span>
              </Button>
            </div>
            <div className='text-center text-xs font-medium text-black w-1/4'>
              <Button className={`btn-nav-color ${router.asPath.includes('cart') && 'btn-nav-color-active'}`} type='link' href='/cart'>
                <div className={` w-[24px] h-[24px] mx-auto`}>
                  {
                    !router.asPath.includes('cart') ?
                      <img src="/img/shop.png" />
                      :
                      <img src="/img/shopactive.png" />

                  }
                </div>
                <span className=' text-xs font-medium tracking-tight '>Shop</span>
              </Button>
            </div>
            <div className='text-center text-xs font-semibold text-black w-1/4'>
              <Button className='  btn-nav-color '>
                <svg className='mx-auto' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5417 19.7916H18.7501M13.5417 5.20831H21.8751H13.5417ZM13.5417 9.37498H18.7501H13.5417ZM13.5417 15.625H21.8751H13.5417Z" stroke="#1B0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.33333 4.16666H4.16667C3.59137 4.16666 3.125 4.63303 3.125 5.20832V9.37499C3.125 9.95029 3.59137 10.4167 4.16667 10.4167H8.33333C8.90863 10.4167 9.375 9.95029 9.375 9.37499V5.20832C9.375 4.63303 8.90863 4.16666 8.33333 4.16666Z" stroke="#1B0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.33333 14.5833H4.16667C3.59137 14.5833 3.125 15.0497 3.125 15.625V19.7916C3.125 20.3669 3.59137 20.8333 4.16667 20.8333H8.33333C8.90863 20.8333 9.375 20.3669 9.375 19.7916V15.625C9.375 15.0497 8.90863 14.5833 8.33333 14.5833Z" stroke="#1B0D0D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className=' text-xs font-medium tracking-tight'>Category</span>
              </Button>
            </div>
            <div className='text-center text-xs font-semibold text-black w-1/4'>
              <Button type='link' className=' btn-nav-color' href='/account'>
                <svg className='mx-auto btn-nav-color' style={{ fill: '', color: 'inherit' }} width="25" height="25" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33325 20.6667C2.95825 10.8306 17.0416 10.2842 18.6666 20.6667" stroke="black" stroke-width="1.5" />
                  <path d="M14.6666 5.50001C14.6666 8.07734 12.5772 10.1667 9.99992 10.1667C7.42259 10.1667 5.33325 8.07734 5.33325 5.50001C5.33325 2.92268 7.42259 0.833344 9.99992 0.833344C12.5772 0.833344 14.6666 2.92268 14.6666 5.50001Z" stroke="black" stroke-width="1.5" />
                </svg>
                <span className=' text-xs font-medium tracking-tight'>User</span>
              </Button>
            </div>


          </div>
        </MediaQuery>
      }

    </nav >
  )
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  cart: state.cart,
  info: state.store.info,
  categories: state.store.categories,
  displaySettings: state.store.displaySettings,
  // Search handler from plp
  searchHandler: state.search.searchHandler
})

const mapDispatchToProps = dispatch => ({
  openAuth: () => dispatch(authShowToggle()),
  logOut: () => dispatch(logOut()),
  // logOut: () => dispatch(logOutStart()),
  getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
  getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
  getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
  getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
  getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId)),
  getCategoryProducts: (data) => dispatch(getCategoryProductsStart(data)),
  getCategoryStart: (storeId) => dispatch(getCategoryStart(storeId)),
  getSearchProducts: (payload) => dispatch(getSearchProductsStart(payload)),
  setSearchHandler: (payload) => dispatch(setSearchHandler(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
