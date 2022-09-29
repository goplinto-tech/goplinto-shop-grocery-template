import { useState, useEffect, memo, useRef } from 'react';
import Link from "@components/link"
import { connect } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronDown } from 'react-icons/bs'
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
import ContactUs from "@components/ContactUS/ContactUs";
import MobContactUs from "@components/ContactUS/MobContactUs";
import { SocialIcon } from 'react-social-icons';

const Navbar = ({storeSettings, socialProfile, user, cart, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler, displaySettings, openAuth, logOut, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, searchHandler, info, ref, storePolicies }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const [lists, setlists] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [mobNaveHeight, setMobNaveHeight] = useState(10)
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
  const storeId = info.store_id;
  const [query, setQuery] = useState('')
  const [Menu, setmenu] = useState(false)
  const router = useRouter();
  const exceptionRouteinMobile = ['/account/profile', '/account/myorders', '/account/wishlist', '/account/wallet', '/account/savedplaces', '/account/newaddress', '/account/orderdetail/[id]']
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
  const isDesktopOrLaptopx = useMediaQuery({ minWidth: 1020 })

  const [contactUsVisible, setContactUsVisible] = useState(false)
  const [mobContactUsVisible, setMobContactUsVisible] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategoryId, search } = Router.query;
  // const { category, subCategoryId } = Router.router.query
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  const [q, setq] = useState(search ? search : '');

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOnTop, setIsOnTop] = useState(false)
  const mobSearch = useRef(null)

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
  const onSearched = (e) => {
    e.preventDefault()
    // console.log('queryrr', query);
    if (query.length) {
      redirect(`/shop?search=${query}`)
    }
  }



  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      // console.log(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [])


  useEffect(() => {
    if (search) {
      getSearchProducts({ storeId, q: q.trim(), setSearchResult, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

    } else if (category) {
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategoryId, page: 1, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

      // setq('') // Cleaning query string of search
    } else {
      // getShopProducts({ storeId, setStatus })
      // setStatus('loading') // Set to success default Because its run whene All  products are fetching
      // setq('') // Cleaning query string of search
    }
  }, [Router.query])
  useEffect(() => {
    setlists(categories.length > 0 && categories)
  }, [categories])

  useEffect(() => {
    const body = document.body
    if (!body) return;
    if (isCategoryOpen && !isDesktopOrLaptop) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }, [isCategoryOpen, isDesktopOrLaptop])
  const name = Router?.route?.split('/')[3]

  return (
    <nav id='navbar' className='sm:sticky top-0' ref={ref} style={{ backgroundColor: `#F9F6ED` }}>
      <div className={(router.pathname == "/[name]/[storeId] hidden md:block " || ['search', 'category'].some(val => router.asPath.includes(val))) || isDesktopOrLaptop ? `navbar-body  relative bg-[#F9F6ED] hidden md:block nav-bg` : 'hidden'} >
        <div className="wrapper flex flex-row justify-between py-4 w-full">
          <div className=" flex items-center ">
            <Button className="md:w-max lg:w-full" type="link" href="/">
              <div className="flex  justify-center md:w-max lg:w-full  items-center space-x-2">
                <div className="h-20 w-20  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                  <img
                    className="w-100 h-100 object-contain"
                    src={info.logo_img_url || '/img/default.png'} alt="..."
                  />
                </div>
                <h1 className='text-xl lg:text-2xl font-extrabold nav-items-color'>{info.store_name}</h1>
              </div>
            </Button>
          </div>
          <div className=" items-center justify-end flex md:basis-10/12 lg:basis-9/12 space-x-6 lg:space-x-14">

            {/* <div className=" flex flex-1 flex-row justify-between w-full "> */}
            <form onSubmit={onSearched} className=" flex flex-1 flex-row justify-between w-full ">
              <div className=" w-full flex rounded">
                <Input className=" px-4 p-2.5 lg:p-3 text-sm border rounded-r-none border-[#48887B] rounded  outline-none" placeholder='Search' onChange={onInputChangeHandler} />
                <div className="btn-bg px-8  cursor-pointer rounded-r flex items-center " onClick={onSearched}>
                  <AiOutlineSearch color={'white'} size={20} />
                </div>
              </div>
            </form>
            {/* </div> */}

            <div className=" flex flex-row justify-between items-center nav-items-color text-black space-x-14">
              <div className=" w-full flex justify-around space-x-4 lg:space-x-6 xl:space-x-14">
                <Link href={'/'}>
                  <a className={`block whitespace-nowrap ${router.route == '/' ? 'font-semibold' : 'font-normal'} tracking-tight  lg:text-base`}>
                    Home
                  </a>
                </Link>
                <Link href={'/shop'}>
                  <a className={`block whitespace-nowrap ${router.route.includes('/shop') ? 'font-semibold' : 'font-normal'} tracking-tight  lg:text-base`}>
                    Shop
                  </a>
                </Link>
                <a onClick={() => setContactUsVisible(true)} className="block whitespace-nowrap font-normal  tracking-tight lg:text-base cursor-pointer">
                  Contact Us
                </a>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <Button
                  className="flex items-center text-black mr-6"
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
                      <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center btn-bg text-white items-center text-xs text-center rounded-full btn-bgs btn-color border border-white">
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
                      <Button onClick={openAuth} className=" border border-white max-h-min text-base font-medium rounded py-3 px-8 hover:bg-orange-400 hover:text-white btn-hover-revers " title="Sign In"></Button>
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
                        <AiFillCaretDown className="ml-1" size={14} />
                      </div>

                      <div className="absolute w-40 hidden  account-options top-full -right-12 z-10">
                        <div
                          className="py-6 px-4 mt-6 bg-white w-full rounded account-options"
                          style={{ boxShadow: '0px 4px 8px #2424243F' }}
                        >
                          <ul className="list-none black-color-75 text-base font-medium space-y-6">
                            {/* <li className="btn-hover-color hover:text-[#48887B]">
                              <Link href="/account">
                                <a>Account</a>
                              </Link>
                            </li> */}
                            <li className="btn-hover-color cursor-pointer hover:text-[#48887B]">
                              <Link href="/account/myorders">
                                <a>My Orders</a>
                              </Link>
                            </li>
                            <li className="btn-hover-color cursor-pointer hover:text-[#48887B]">
                              <Link href="/account/wishlist">
                                <a>Wishlist</a>
                              </Link>
                            </li>
                            {storeSettings?.isWalletEnabled=='Y'&&<li className="btn-hover-color cursor-pointer hover:text-[#48887B]">
                              <Link href="/account/wallet">
                                <a>Wallet</a>
                              </Link>
                            </li>}
                            <li className="btn-hover-color cursor-pointer hover:text-[#48887B]">
                              <Link href="/account/savedplaces/">
                                <a>Saved Places</a>
                              </Link>
                            </li>
                            <li
                              className="btn-hover-color cursor-pointer hover:text-[#48887B]"
                              onClick={() => {
                                logOut()
                                setIsLogin(false)
                              }}
                            >
                              <span className="btn-hover-color">Log Out</span>
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

        {/* Category list >> */}
        <div className="btn-bg white-color   wrapper mx-auto " >
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
                  <div className=" absolute shadow-lg bg-white text-black others-list">
                    <ul className="">
                      {
                        item?.subCategories.map((subItem, j) => (
                          <li className=" relative others-list-item " key={j + 'll'}>
                            <Link href={`/shop?category=${item.category_id}&subCategoryId=${subItem.sub_category_id}`}>
                              <a className={`block text-sm py-2 px-4 text-gray-500 hover:font-semibold hover:text-black ${subCategoryId == subItem.sub_category_id && 'btn-color-revers font-semibold'} `}>
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
                <div className=" absolute shadow-lg -right-10 w-60 bg-white  others-list " >
                  <ul className=" w-auto">
                    {
                      lists.length && lists.slice(isDesktopOrLaptopx ? 6 : 4).map((item, i) => (
                        <li className=" relative others-list-item " key={i}>
                          <Link href={`/shop?category=${item.category_id}`}>
                            <a className={`block py-2 px-4 text-sm text-gray-500 hover:font-semibold hover:text-black ${category == item.category_id && 'btn-color-revers font-semibold'} `}>
                              {item.category_name}
                            </a>
                          </Link>
                          <div className=" absolute shadow-lg bottom-0 right-full bg-white text-black sub-cat-list">
                            {/* <div className=" absolute top-0 right-full bg-white text-black sub-cat-list"> */}
                            <ul className="w-60 flex flex-col sticky bottom-0 overflow-x-clip overflow-y-auto" style={{ maxHeight: '200px' }}>
                              {
                                item.subCategories.map((subItem, j) => (
                                  <li className=" text-black" key={j + 'll'}>
                                    <Link href={`/shop?category=${item.category_id}&subCategoryId=${subItem.sub_category_id}`}>
                                      <a className={`block py-2 text-sm px-4 text-gray-500 hover:font-semibold hover:text-black ${subCategoryId == subItem.sub_category_id && 'btn-color-revers font-semibold'}`}>
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
        {/* << Category list */}

      </div>
      {/* has to be hide in some places */}
      {
        !exceptionRouteinMobile.includes(router.pathname) ?
          <div className={`md:hidden nav-bg shadow-lg bg-[#48887B] py-2 w-full `}>
            <div className=" flex justify-between ">
              <GiHamburgerMenu onClick={() => { setmenu(true) }} className="m-4 my-4 cursor-pointer nav-items-color" size={30} />
              <Button className="md:w-max mt-3 mb-3 lg:w-full" type="link" href="/">
                <div className="w-20 max-h-[55px] rounded text-center shrink-0 flex  justify-center overflow sm:overflow-hidden items-center">
                  <img
                    className=" h-full w-full object-contain"
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
                    <IoMdCart size={30} className="nav-items-color" />
                    {
                      !!totalItems &&
                      <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center btn-bg rounded-full text-white items-center text-xs text-center btn-bgs btn-color border border-white">
                        {
                          totalItems
                        }
                      </div>
                    }
                  </span>
                </Button>
              </div>
            </div>
            {
              scrollPosition >= 142 && <div className='h-[42px]' />
            }
            <div ref={mobSearch} className={`w-full ${scrollPosition >= 142 ? 'fixed inset-x-0 top-0 nav-bg z-50 py-2 transition-all' : ""}`}>
              <form onSubmit={onSearched} action="" className={" bg-white mx-4  mt-1 shadow-lg flex rounded "}>
                <Input className=" py-2 w-11/12 border-[0.1px] rounded-l-lg border-[#F9F6ED] bg-transparent focus:outline-none " placeholder='Search ' onChange={onInputChangeHandler} />
                <div className="bg-white lg:px-8 md:px-2 px-4 py-2  border-none outline-none cursor-pointer rounded-r-lg flex items-center ml-[-1px] " onClick={onSearched}>
                  <FiSearch color={'black'} size={20} />
                </div>
              </form>
            </div>
          </div>
          :
          ""
      }
      {
        Menu &&
        <div className="w-full transition duration-150 ease-in-out bg-white h-[130vh] fixed z-[inherit] top-0">
          <div className="my-4 flex w-full">
            <AiOutlineClose onClick={() => { setmenu(false) }} className="ml-6" color={'gray'} size={40} />
            <div className="rounded-md max-h-[80px] w-full ml-24">
              <img
                className="h-full"
                src={
                  info.logo_img_url
                  ||
                  '/img/default.png'
                }
                alt="..."
              />
            </div>
          </div>


          <div className='grid grid-cols-1 divide-y max-h-[400px] overflow-y-scroll'>
            <div >
              {/* <p className="py-6 px-14 text-base font-[600]">About</p> */}
            </div>

            <div >
              <Link href={'/'}>
                <a className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Home</a>
              </Link>
            </div>
            <div >

              <a onClick={() => setMobContactUsVisible(true)} className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Contact Us</a>

            </div>
            {/* <div >
              <Link href={'https://goplinto.com/privacy-policy'}>
                <a target="_blank" className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Privacy Policy</a>
              </Link>
            </div>
             <div >
              <Link href={'https://goplinto.com/refund-policy'}>
                <a target="_blank" className=" block py-6 cursor-pointer px-14 text-lg font-[600]">Return & Refunds</a>
              </Link>
            </div> */}

            {
              storePolicies.map(function (item, idx) {
                if (item.is_policy_added) {
                  return (
                    <div><Link key={idx} href={`/policies/${item.policy_id}`}><a target="_blank" className=" block py-6 cursor-pointer px-14 text-lg font-[600]">{item.policy_name}</a></Link></div>
                  )
                }
              })
            }

            <div >
              {/* <p className="py-6 px-14 text-base font-[600]">About</p> */}
            </div>
          </div>

          {/* logo and tagline */}
          <div className='bg-black fixed bottom-0 inset-x-0 py-4'>
            {/* Social links */}
            {
              socialProfile.length ?
                <div className='flex space-x-2 ml-4'>
                  {
                    socialProfile.map(function (item, idx) {
                      if (item.social_account_link) {
                        return <a target="_blank" href={(item.social_account_link.indexOf('http://') == 0 || item.social_account_link.indexOf('https://') == 0) ? `${item.social_account_link}` : `https://${item.social_account_link}`}><img style={{ width: "30px", height: '30px', maxHeight: '30px', borderRadius: '50%' }} src={item?.logo_img_url || ''} alt="Goplinto" /></a>
                        // <SocialIcon style={{ width: "30px", height: '30px', maxHeight: '30px', borderRadius: '50%' }} bgColor="#fff" fgColor="#000" url={(item.social_account_link.indexOf('http://') == 0 || item.social_account_link.indexOf('https://') == 0) ? `${item.social_account_link}` : `https://${item.social_account_link}`} key={idx} />
                      }
                    })
                  }
                </div>
                : ""
            }
            <div className='flex flex-col justify-center items-center mt-4'>
              <h3 className='text-white text-[12px] font-semibold my-2'>This online  Store Created using</h3>
              <img onClick={() => window.location.href = "https://www.goplinto.com/"} className='w-[124px]' src="/img/logo.png" alt="" />
            </div>
          </div>

        </div>
      }
      {/* Navbar for mobile >> */}
      {
        name !== 'cart' && 'thank-you' &&
        <MediaQuery maxWidth={640}>
          <div id='mob-navbar' className={`mob-navbar z-10 py-2 flex sm:justify-end items-center white-color justify-between w-full fixed sm:relative bottom-[-1px] left-0 right-0 bg-white sm:bg-transparent `} style={{ boxShadow: 'rgb(194 190 190 / 65%) 1px -4px 16px 0px' }}>
            <div className='text-black w-1/4 flex flex-col  '>
              <Button type='link' href='/' className={`block sm:hidden text-center text-xs ${router.asPath == '/' && 'btn-nav-color-active text-[#48887B]'}`}>
                <div className={` w-[24px] h-[24px] mx-auto`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span>Home</span>
              </Button>
            </div>
            <div className='text-center text-xs font-medium text-black w-1/4'>
              <Button className={`btn-nav-color ${router.asPath.includes('shop') && 'btn-nav-color-active'}`} type='link' href='/shop'>
                <div className={` w-[24px] h-[24px] mx-auto`}>
                  {
                    <svg className='h-6 w-6' viewBox="0 0 31 31" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.4444 23.8333H14.1111V18.2778H12.7222V23.8333H8.55555V18.2778H7.16666V23.8333C7.16666 24.2017 7.31299 24.555 7.57345 24.8154C7.83392 25.0759 8.18719 25.2222 8.55555 25.2222H22.4444C22.8128 25.2222 23.1661 25.0759 23.4265 24.8154C23.687 24.555 23.8333 24.2017 23.8333 23.8333V18.2778H22.4444V23.8333Z" />
                      <path d="M26.4653 12.2153L23.632 6.5486C23.517 6.31721 23.3397 6.12247 23.1201 5.9863C22.9005 5.85012 22.6473 5.77791 22.3889 5.77777H8.61112C8.35273 5.77791 8.0995 5.85012 7.8799 5.9863C7.6603 6.12247 7.48305 6.31721 7.36806 6.5486L4.53473 12.2153C4.43799 12.4094 4.38805 12.6234 4.3889 12.8403V14.9792C4.38826 15.3037 4.50128 15.6182 4.70834 15.868C5.01435 16.2188 5.3923 16.4996 5.81649 16.6914C6.24068 16.8831 6.70117 16.9812 7.16667 16.9792C7.92624 16.9803 8.66263 16.7177 9.25001 16.2361C9.83737 16.718 10.5736 16.9813 11.3333 16.9813C12.0931 16.9813 12.8293 16.718 13.4167 16.2361C14.004 16.718 14.7403 16.9813 15.5 16.9813C16.2597 16.9813 16.996 16.718 17.5833 16.2361C18.1707 16.718 18.9069 16.9813 19.6667 16.9813C20.4264 16.9813 21.1626 16.718 21.75 16.2361C22.4057 16.7745 23.2445 17.0376 24.0902 16.9703C24.9359 16.9029 25.7225 16.5103 26.2847 15.875C26.4943 15.6261 26.6098 15.3115 26.6111 14.9861V12.8403C26.612 12.6234 26.562 12.4094 26.4653 12.2153ZM23.8333 15.5903C23.5367 15.5896 23.2446 15.518 22.9812 15.3815C22.7179 15.245 22.491 15.0475 22.3195 14.8055L21.75 14.0278L21.1875 14.8055C21.0127 15.0438 20.7842 15.2376 20.5206 15.3711C20.257 15.5047 19.9657 15.5742 19.6701 15.5742C19.3746 15.5742 19.0833 15.5047 18.8197 15.3711C18.5561 15.2376 18.3276 15.0438 18.1528 14.8055L17.5833 14.0278L17.0208 14.8055C16.846 15.0438 16.6176 15.2376 16.354 15.3711C16.0903 15.5047 15.799 15.5742 15.5035 15.5742C15.208 15.5742 14.9166 15.5047 14.653 15.3711C14.3894 15.2376 14.1609 15.0438 13.9861 14.8055L13.4167 14.0278L12.8542 14.8055C12.6794 15.0438 12.4509 15.2376 12.1873 15.3711C11.9237 15.5047 11.6323 15.5742 11.3368 15.5742C11.0413 15.5742 10.7499 15.5047 10.4863 15.3711C10.2227 15.2376 9.99426 15.0438 9.81945 14.8055L9.25001 14.0278L8.68056 14.8055C8.50901 15.0475 8.28212 15.245 8.01878 15.3815C7.75544 15.518 7.46329 15.5896 7.16667 15.5903C6.90496 15.5935 6.6456 15.5406 6.40604 15.4351C6.16647 15.3297 5.95225 15.1743 5.77778 14.9792V12.8403L8.61112 7.16666H22.3889L25.2222 12.8333V14.9583C25.0488 15.1562 24.8353 15.3148 24.5958 15.4238C24.3563 15.5328 24.0964 15.5895 23.8333 15.5903V15.5903Z" />
                    </svg>

                  }
                </div>
                <span className=' text-xs font-medium tracking-tight '>Shop</span>
              </Button>
            </div>
            <div className='text-center text-xs font-semibold text-black w-1/4'>
              <Button className={`btn-nav-color text ${isCategoryOpen && 'btn-nav-color-active'}`} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className=' text-xs font-medium tracking-tight'>Category</span>
              </Button>
            </div>
            <div className='text-center text-xs font-semibold text-black w-1/4'>
              <Button className={`btn-nav-color ${router.asPath.includes('account') && 'btn-nav-color-active'}`} {...!!user ? { type: 'link', href: '/account' } : { onClick: openAuth }} href='/account'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className=' text-xs font-medium tracking-tight'>User</span>
              </Button>
            </div>
            {/* Mob Category list >> */}
            {
              !!lists.length && isCategoryOpen &&
              <div className=" fixed lg:hidden top-[10.5rem] inset-x-0 bottom-[3.5rem] no-scrollbar  overflow-y-auto z-50 bg-white">
                <div className=" relative inset-0 overflow-auto w-full h-full ">
                  <div className="grid grid-cols-12 w-full relative">
                    <div className=" col-span-12 px-3 py-2.5 border-b-2 flex justify-between items-center sticky top-0 z-10 bg-white">
                      <h2 className=" font-semibold text-base text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Shop by Category
                      </h2>
                      <span className=" cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div className=" col-span-7 w-full text-black border-r bg-[#F5F5F5] border-gray-200">
                      <ul className=" ">
                        <li className={`${!category && 'bg-white btn-color-revers font-semibold'} px-3 py-2`}>
                          <Link href={`/shop`}>
                            <a >
                              <div className="d-flex justify-content-between flex items-center justify-between space-y-2">
                                <span className=" ">All Products </span>
                                <span className={`font-16 font-w-400 dark-blue-50 w-3 shrink-0 h-fit transition-all ${!category ? "" : 'rotate-90'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg></span>
                              </div>
                            </a>
                          </Link>
                        </li>
                        {
                          lists.map((item) => (
                            <li key={item.category_id} className={`lists category-item px-3 py-2 ${category == item.category_id && ' btn-color-revers bg-white font-semibold'}`} >
                              <p onClick={() => {
                                router.push(`/shop?category=${item.category_id}`)
                                setIsCategoryOpen(!isCategoryOpen)
                              }}
                              // href={`/shop?category=${item.category_id}`}
                              >
                                <a>
                                  <div className="d-flex justify-content-between flex items-center justify-between space-y-2">
                                    <span className="">{item.category_name}</span>
                                    <span className={`font-16 font-w-400 dark-blue-50 w-3 shrink-0 h-fit transition-all ${category == item.category_id ? "" : 'rotate-90'}`}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </span>
                                  </div>
                                </a>
                              </p>
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                  </div>
                </div>
                <div className="absolute top-[46px] h-full text-black right-0 w-5/12 overflow-y-auto no-scrollbar ">
                  <ul className="top-0">
                    {
                      !!category &&
                      lists.find((listItem) => listItem.category_id == category)?.subCategories.map((subitem, i) => (
                        <li className="px-3 py-2" key={i} onClick={() => setIsCategoryOpen(false)}>
                          <Link href={`/shop?category=${category}&subCategoryId=${subitem.sub_category_id}`}>
                            <a>
                              <div className="d-flex justify-content-between">
                                <span className={`font-w-400 text-base  ${subCategoryId == subitem.sub_category_id ? "btn-color-revers font-semibold" : 'dark-blue-50'}`} >{subitem.sub_category_name}</span>
                              </div>
                            </a>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            }{/* << Mob Category list */}
          </div>
        </MediaQuery>
      }
      <>
        <ContactUs contactUsVisible={contactUsVisible} setContactUsVisible={setContactUsVisible}></ContactUs>
      </>
      <>
        <MobContactUs mobContactUsVisible={mobContactUsVisible} setMobContactUsVisible={setMobContactUsVisible}></MobContactUs>
      </>
    </nav >
  )
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  cart: state.cart,
  info: state.store.info,
  categories: state.store.categories,
  displaySettings: state.store.displaySettings,
  storeSettings: state.store.settings,
  // Search handler from plp
  searchHandler: state.search.searchHandler,
  socialProfile: state.store.socialProfile,
  storePolicies: state.store.storePolicies
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
export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar))
