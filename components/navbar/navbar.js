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
  const exceptionRouteinMobile = ['/account/profile', '/account/myorders', '/account/wishlist', '/account/wallet', '/account/savedplaces', '/account/newaddress']
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
  const isDesktopOrLaptopx = useMediaQuery({ minWidth: 1020 })
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
    console.log('queryrr', query);
    if (query.length) {
      redirect(`/shop?search=${query}`)
    }
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

      <div className={(router.pathname == "/[name]/[storeId] hidden md:block " || ['search', 'category'].some(val => router.asPath.includes(val))) || isDesktopOrLaptop ? `navbar-body  relative bg-[#F9F6ED] hidden md:block nav-bg` : 'hidden'} >
        <div className="wrapper flex flex-row justify-between py-4 w-full">
          <div className=" flex items-center ">
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
          <div className=" items-center justify-end flex md:basis-10/12 lg:basis-9/12 space-x-6 lg:space-x-14">
            <div className=" flex flex-1 flex-row justify-between w-full ">
              <div className=" w-full flex rounded">
                <Input className=" px-4 p-2.5 lg:p-3 text-sm border rounded-r-none border-[#48887B] rounded  outline-none" placeholder='Search' onChange={onInputChangeHandler} />
                <div className="btn-bg px-8  cursor-pointer rounded-r flex items-center " onClick={onSearched}>
                  <AiOutlineSearch color={'white'} size={20} />
                </div>
              </div>
            </div>
            <div className=" flex flex-row justify-between items-center nav-items-color text-black space-x-14">
              <div className=" w-full flex justify-around space-x-4 lg:space-x-6 xl:space-x-14">
                <Link href={'/'}>
                  <a className="block whitespace-nowrap font-normal  tracking-tight lg:text-base">
                    Home
                  </a>
                </Link>
                <Link href={'/shop'}>
                  <a className="block whitespace-nowrap font-normal  tracking-tight  lg:text-base">
                    shop
                  </a>
                </Link>
                <a className="block whitespace-nowrap font-normal  tracking-tight lg:text-base">
                  Contact
                </a>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <Button
                  className="flex items-center text-black"
                  type="link"
                  href="/cart"
                >
                  <span className=" text-black nav-items-color font-bold  my-2 relative">
                    {/* <IoMdCart size={30} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
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
                {
                  !isLogin && !user ?
                    <div className="shrink-0 flex items-center">
                      <Button onClick={openAuth} className=" border border-white max-h-min text-base font-medium rounded py-3 px-8 hover:bg-orange-400 hover:text-white " title="Sign In"></Button>
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
        </div>
        {/* Category list start */}
        <div
          className="btn-bg white-color   wrapper mx-auto " onMouseLeave={() => { setcathover({ ...cathover, active: false }) }}>
          <div className="flex justify-between items-center">
            {
              lists.length && lists.slice(0, isDesktopOrLaptopx ? 6 : 4).map((item, i) => (

                <div className="others" key={i}>
                  <Link href={`/shop?category=${item.category_id}`}>
                    <a className=" text-sm font-medium inline-block cursor-pointer">
                      {item.category_name}
                      {
                        !!item?.subCategories?.length &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      }
                    </a>
                  </Link>
                  <div className=" absolute bg-white text-black others-list">
                    <ul className="">
                      {
                        item?.subCategories.map((subItem, j) => (
                          <li className=" relative others-list-item " key={j + 'll'}>
                            <Link href={`/shop?category=${item.category_id}&subCategoryId=${subItem.sub_category_id}`}>
                              <a className=" block py-2 px-4 hover:bg-gray-400">
                                {subItem.sub_category_name}
                              </a>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))
            }
            {
              lists.length > 6 &&
              <div className="others relative">
                <h5 className=" text-sm font-medium inline-block cursor-pointer">Other
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </h5>
                <div className=" absolute -right-10 w-60 bg-white text-black  others-list">
                  <ul className=" w-auto">
                    {
                      lists.length && lists.slice(isDesktopOrLaptopx ? 6 : 4).map((item, i) => (
                        <li className=" relative others-list-item " key={i}>
                          <Link href={`/shop?category=${item.category_id}`}>
                            <a className=" block py-2 px-4 hover:bg-gray-400">
                              {item.category_name}
                            </a>
                          </Link>
                          <div className=" absolute top-0 right-full bg-white text-black sub-cat-list">
                            <ul className="w-60 flex flex-col sticky bottom-0 overflow-x-clip overflow-y-auto" style={{ maxHeight: '300px' }}>
                              {
                                item.subCategories.map((subItem, j) => (
                                  <li key={j + 'll'}>
                                    <Link href={`/shop?category=${item.category_id}&subCategoryId=${subItem.sub_category_id}`}>
                                      <a className=" block py-2 px-4 hover:bg-gray-400">
                                        {subItem.sub_category_name}
                                      </a>
                                    </Link>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* has to be hide in some places */}
      {
        !exceptionRouteinMobile.includes(router.pathname) ?
          <div className={`md:hidden nav-bg shadow-lg bg-[#48887B] h-[124px] w-full `}>
            <div className=" flex justify-between ">
              <GiHamburgerMenu onClick={() => { setmenu(true) }} className="m-4 my-4 cursor-pointer" color={'white'} size={30} />
              <Button className="md:w-max mt-3 mb-3 lg:w-full" type="link" href="/">
                <div className="w-20 h-20 rounded text-center shrink-0 flex  justify-center overflow-hidden items-center">
                  <img
                    className=" h-full w-full object-cover"
                    src={info.logo_img_url || '/img/default.png'} alt="..."
                  />
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
          :
          ""
      }
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
              <Link href={'/'}>
                <a className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Home</a>
              </Link>
            </div>
            <div >
              <Link href={'/'}>
                <a className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Contact Us</a>
              </Link>
            </div> <div >
              <Link href={'https://goplinto.com/privacy-policy'}>
                <a className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Privecy Policy</a>
              </Link>
            </div> <div >
              <Link href={'https://goplinto.com/refund-policy'}>
                <a className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Return & Refunds</a>
              </Link>
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
          <div id='mob-navbar' className={`mob-navbar z-10 py-2 flex sm:justify-end items-center white-color justify-between w-full fixed sm:relative bottom-[-1px] left-0 right-0 bg-white sm:bg-transparent `} style={{ boxShadow: '0px -1px 4px #00000033' }}>
            <div className='text-black w-1/4 flex flex-col  '>
              <Button type='link' href='/' className={`block sm:hidden text-center text-xs ${router.asPath == '/' || router.pathname == '/[name]/[storeId]' && 'btn-nav-color-actives text-[#48887B]'}`}>
                <div className={` w-[24px] h-[24px] mx-auto`}>
                  <img src="/img/Home.png" />
                </div>
                <span>Home</span>
              </Button>
            </div>
            <div className='text-center text-xs font-medium text-black w-1/4'>
              <Button className={`btn-nav-color ${router.asPath.includes('cart') && 'btn-nav-color-active'}`} type='link' href='/shop'>
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
