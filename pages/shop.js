import Head from 'next/head'
import Link from "@components/link"
import { connect } from 'react-redux'
import React, { useEffect, useState, useRef, memo, useCallback } from 'react'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';
import { redirect } from '@components/link';
import { AiOutlineClose } from "react-icons/ai";

// import RecommendedCard from '@components/Cards/Home/RecommendedCard'
import { BsFilterLeft } from 'react-icons/bs'
import ProductItem from '@components/product-item/product-item'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Actions
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart, getPageCountStart, clearProductList, getFilterGroups } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'
import PageWrapper from '@components/page-wrapper/page-wrapper';
import { addWishlistStart } from '@redux/wishlist/wishlist-action'
import Modal from 'react-modal';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import { BsArrowLeft } from 'react-icons/bs'

import { Slider, Tabs } from 'antd';
const { TabPane } = Tabs;




const Home = ({ user, getFilterGroups, products, addWishlist, pageCount, getPageCount, info, cart, clearProductList, checkout, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const purchaseDetails = checkout.purchaseDetails;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
  const storeId = info.store_id;
  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategoryId, search } = Router.query;
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  const [title, setTitle] = useState("All Items")
  // const [q, setq] = useState(search ? search : '');
  // UI Vars
  const [page, setPage] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
  const [navHeight, setNavHeight] = useState(156)
  const [restHeight, setRestHeight] = useState(78) // in vh
  const [plpc, setPlpc] = useState(775) // in vh
  const [description, setDescription] = useState("")
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [mobileSortOpen, setMobileSortOpen] = useState(false)
  const [priceFilter, setPriceFilter] = useState({})
  const [filtersGroup, setFiltersGroup] = useState({})
  const [filterArray, setFilterArray] = useState([])
  const [filterPayLoad, setFilterPayLoad] = useState({})
  const [filterAndSortPayload, setFilterAndSortPayload] = useState({})
  const [triggerFilter, setTriggerFilter] = useState('No')
  const [sortOrder, setSortOrder] = useState("false")
  const [sort,setSort]=useState("false")
  const [filterAndSortApplied,setFilterAndSortApplied]=useState(false)
  const [filterAndSortActive,setFilterAndSortActive]=useState(false)
  const customStyles = {
    overlay: { zIndex: 1000 },
    content: {
      width: '1000px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      zIndex: 100
    },
  };

  const observer = useRef()
  const listLastElement = useCallback(node => {
    // console.log("observer", observer);
    if (status == 'loading') return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pageCount && products?.length >= 20) {

        if (page < pageCount && !search) {
          setPage(page + 1)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [status, pageCount, filterPayLoad, priceFilter])

  useEffect(() => { // Componentdidmount
    if (!categories.length) getCategoryStart(storeId);
  }, [])

  useEffect(() => {
    if (!page) return;
    if (search) {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getSearchProducts({ storeId, q: search.trim(), setSearchResult, setStatus, page,user,status,filterAndSortPayload,sortOrder })
      getFilterGroups({ storeId, setFiltersGroup })

    } else if (category) {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getCategoryProducts({ storeId, categoryId: category, subCategoryId, page, setStatus,user,filterAndSortPayload ,sortOrder})
      getFilterGroups({ storeId, setFiltersGroup })

    } else {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getShopProducts({ storeId, page, setStatus, filterAndSortPayload, sortOrder, user })
      getFilterGroups({ storeId, setFiltersGroup })
    }
    
    let tittleName = "All Items"
    if (category || subCategoryId || search) {
      const cat = categories.find(item => item.category_id == category)
      if (cat) {
        tittleName = cat.category_name

        const subcat = cat.subCategories.find(subItem => subItem.sub_category_id == subCategoryId)
        if (subcat) {
          tittleName = subcat.sub_category_name
        }
      }
    }
    setTitle(search?`Search results for ${search}` : tittleName)
  }, [Router.query, page])

  useEffect(() => {
    if (search) {
      setStatus('loading')
      getSearchProducts({ storeId, q: search, setSearchResult, page: 1, setStatus,user,status,filterAndSortPayload,sortOrder })
      getFilterGroups({ storeId, setFiltersGroup })

    } else if (category) {
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategoryId, page: 1, setStatus,user ,filterAndSortPayload,sortOrder})
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getFilterGroups({ storeId, setFiltersGroup })

    } else {
      getShopProducts({ storeId, setStatus, user,filterAndSortPayload,sortOrder })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getFilterGroups({ storeId, setFiltersGroup })
    }

    let tittleName = "All Items"
    if (category || subCategoryId || search) {
      const cat = categories.find(item => item.category_id == category)
      if (cat) {
        tittleName = cat.category_name

        const subcat = cat.subCategories.find(subItem => subItem.sub_category_id == subCategoryId)
        if (subcat) {
          tittleName = subcat.sub_category_name
        }
      }
    }
    setTitle(search?`Search results for ${search}`: tittleName)
  }, [category, subCategoryId, search])

  useEffect(() => { // UI function
    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        const ele = document.getElementById('big-navbar')
        const plpc = document.getElementById('plp-container')
        if (!!ele) {
          if (ele.offsetHeight != navHeight && navHeight != 0) {
            const totalH = ele.offsetHeight
            setNavHeight(totalH)
            setRestHeight(100 - (totalH * 100 / document.documentElement.clientHeight));
          }
        }
        if (!!plpc) {
          if (plpc.offsetHeight != navHeight && navHeight != 0) {
            const totalH = plpc.offsetWidth
            setPlpc(totalH)
          }
        }
      })
      objerver.observe(document.body)
    }
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
  // SEO
  useEffect(() => {
    const dsc = products.reduce((dsc, item) => dsc + ", " + item.item_name + ', ' + item.item_desc, "")
    setDescription(dsc)
  }, [products])

  useEffect(() => {
    if (category) {
      getPageCount({ storeId, categoryId: category })
    } else {
      getPageCount({ storeId })
    }
    setPage(1)
    clearProductList()
  }, [category, search])

  const openMobileSort = () => {
    setMobileSortOpen(!mobileSortOpen)
  }

  const handleFilter = (groupid, value, e) => {
    var newFilterArray = []
    if (filterArray.length != 0) {
      const indexOfObject = filterArray.findIndex(object => {
        return object[groupid] == value;
      });
      console.log("index of value", indexOfObject)
      if (indexOfObject != -1) {
        filterArray.splice(indexOfObject, 1);
        console.log("filter Array after Splice", filterArray)
        newFilterArray = [...filterArray]
        setFilterArray(newFilterArray)
      }
      else {
        newFilterArray = [...filterArray, { [groupid]: value }]
        setFilterArray(newFilterArray)
      }
    }
    else {
      newFilterArray = [...filterArray, { [groupid]: value }]
      setFilterArray(newFilterArray)
    }
  }

  const filtergroupBy = (arr, key) => {
    const result = arr.reduce((h, obj) => Object.assign(h, { [Object.keys(obj)]: (h[Object.keys(obj)] || []).concat(Number(Object.values(obj))) }), {})
    return result
  }

  useEffect(() => {
    const filterAfterGroupby = filtergroupBy(filterArray)
    console.log("filter after groupby", filterAfterGroupby)
    setFilterPayLoad({ ...filterAfterGroupby })

  }, [filterArray])

  const priceSliderhandler = (value) => {
    console.log(value)
    setPriceFilter({ max_price: value[1], min_price: value[0] })
  }

  const handleSortOrder = (e) => {
    setSort(e.target.value)
    // setSortOrder(e.target.value)
  }

  const handleFilterAndSort = () => {
    setSortOrder(sort)
    // let finalPayloadForSortAndFilter = { ...filterPayLoad, ...priceFilter }
    // console.log("finalpayloadforsortand filter",finalPayloadForSortAndFilter)
    setFilterAndSortPayload({ filter_groups: filterPayLoad, priceRange: priceFilter })
    // setFinalFilterPayload(finalPayloadForSortAndFilter)
    // setTriggerFilter("yes")
    setFilterModalVisible(false)
  }

  useEffect(() => {
    if (Object.keys(filterAndSortPayload).length != 0) {
      setFilterAndSortActive(true)
      if (search) {
        setStatus('loading')
        setFilterAndSortApplied(true)
        getSearchProducts({ storeId, q: search, setSearchResult, page: 1, setStatus,filterAndSortPayload, sortOrder, user ,setFilterAndSortApplied})  
      }
      else if (category) {
        setStatus('loading')
        setFilterAndSortApplied(true)
        getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategoryId, page: 1, setStatus, filterAndSortPayload, sortOrder, user,setFilterAndSortApplied })
      }
      else {
        setStatus('loading')
        setFilterAndSortApplied(true)
        getShopProducts({ storeId, filterAndSortPayload, sortOrder, user, setStatus,setFilterAndSortApplied })
      }
    }
  }, [filterAndSortPayload])

  const handleShowAllProduct = () => {
    getShopProducts({ storeId, sortOrder, user, setStatus })
    setFilterAndSortPayload({})
    setFilterAndSortActive(false)
  }
  console.log("filter",Object.keys(filterPayLoad).length,Object.keys(priceFilter).length,sortOrder)

  return (
    < >
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>
      {/* <ToastContainer /> */}
      <section>
        <div className="bg-[#F5F5F5] md:bg-white">
          <div className=" wrapper w-full ">
            <div className="md:mr-16">
              <div className="flex justify-between my-2 bg-white p-2 py-4 md:py-0 md:p-0 md:my-4">
                <p className="flex items-center font-bold md:ml-3 ">{title || 'All Items'}</p>
                {
                  isTabletOrMobile ? <div className="flex font-bold cursor-pointer" onClick={openMobileSort}>
                    <BsFilterLeft size={20} className='' />
                    <p className="flex items-center "> Filter / Sort By</p>
                    {filterAndSortActive && (Object.keys(filterPayLoad).length!=0 || Object.keys(priceFilter).length!=0 || sortOrder!="false")?<img className='w-[14px] h-[14px] max-h-[14px] max-w-[14px]' src="/img/filterdot.png" alt="" />:""}
                  </div>
                    : <div className="flex font-bold cursor-pointer border border-gray-300 p-2" onClick={() => setFilterModalVisible(true)}>
                      <BsFilterLeft size={20} className='' />
                      <p className="flex items-center "> Filter / Sort By</p>
                      {filterAndSortActive && (Object.keys(filterPayLoad).length!=0 || Object.keys(priceFilter).length!=0 || sortOrder!="false")?<img className='w-[14px] h-[14px] max-h-[14px] max-w-[14px]' src="/img/filterdot.png" alt="" />:""}
                    </div>
                }
                {/* <div className="flex font-bold cursor-pointer" onClick={() => setFilterModalVisible(true)}>
                  <BsFilterLeft size={20} className='' />
                  <p className="flex items-center "> Filter / Sort By</p>
                </div> */}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8 gap-y-2 px-3 md:px-0 mb-[60px] md:mb-0">
              {
                status == 'success' || status == 'loading' ?

                  products.length && (status == 'loading' || status == 'success')
                    ?
                    filterAndSortApplied && status=='loading'?
                    <>
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem className={'hidden lg:block'} />
                          <ProductItem className={'hidden xl:block'} />
                          <ProductItem className={'hidden lg:block'} />
                          <ProductItem className={'hidden xl:block'} />
                        </>
                        :
                    <>
                      {

                        products.map((item, i) => (
                          <div className='w-full'>
                            <ProductItem className={'mx-auto'} key={i} data={item} addItemToWishlist={addWishlist} isWishlistNeeded={true}/>
                          </div>
                        ))}
                      {
                        status == 'loading' &&
                        <>
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem />
                          <ProductItem className={'hidden lg:block'} />
                          <ProductItem className={'hidden xl:block'} />
                          <ProductItem className={'hidden lg:block'} />
                          <ProductItem className={'hidden xl:block'} />
                        </>
                      }
                      <div className="h-8 " ref={listLastElement}></div>
                    </>

                    //  products.length ==0 && status == 'success' ?
                    //   <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                    //     <h6>
                    //       <span>No items found{' '}
                    //         <Link href={`/shop`}>
                    //           <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                    //             Show All Products.
                    //           </a>
                    //         </Link>
                    //       </span>
                    //     </h6>
                    //   </div>


                    //   : products?.length < 1 && status == 'success' ?
                    //     <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                    //       <h6>
                    //         <span className="">No items found{' '}
                    //           <Link href={`/shop`}>
                    //             <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                    //               Show All Products.
                    //             </a>
                    //           </Link>
                    //         </span>
                    //       </h6>
                    //     </div>
                    :
                    <>
                      {
                        products.length == 0 && status == 'success' ?
                          <div className='col-span-full' style={{ height: "80vh" }}>
                            <div className="flex justify-center items-center h-full">
                              <h6>
                                <span>No items found

                                  <a onClick={handleShowAllProduct} className="btn-color-revers p-2 " style={{ cursor: 'pointer' }}>{' '}
                                    Show All Products.
                                  </a>

                                </span>
                              </h6>
                            </div>
                          </div>
                          :
                          <>
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem className={'hidden lg:block'} />
                            <ProductItem className={'hidden xl:block'} />
                            <ProductItem className={'hidden lg:block'} />
                            <ProductItem className={'hidden xl:block'} />
                          </>


                      }
                    </>
                  : ""

              }


            </div>
          </div>
        </div>

        <>
          <Modal
            isOpen={filterModalVisible}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => setFilterModalVisible(false)}
            style={customStyles}
          >
            <div className=''>
              <div className='flex justify-between pt-4 px-4'>
                <div className='flex items-center gap-4 ml-2'>
                  <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.75" y1="3.46875" x2="24.5625" y2="3.46875" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" />
                    <line x1="0.75" y1="11.9062" x2="24.5625" y2="11.9062" stroke="#B6B6B6" stroke-width="1.5" stroke-linecap="round" />
                    <circle cx="7.03125" cy="3.28125" r="2.53125" fill="#B6B6B6" stroke="#B6B6B6" stroke-width="1.5" />
                    <circle cx="20.1562" cy="11.7188" r="2.53125" fill="#B6B6B6" stroke="#B6B6B6" stroke-width="1.5" />
                  </svg>
                  <h2 className='text-xl'>Filter | Sort</h2>
                </div>
                <p className='cursor-pointer text-xl font-thin' onClick={() => setFilterModalVisible(false)}><AiOutlineClose /></p>
              </div>
              <div className="pt-4">
                <div className="w-full border-t border-gray-400"></div>
              </div>
              <div>
                <Tabs tabPosition='left' type="card" size="large" tabBarGutter='0' className='h-[50vh]'>
                  <TabPane tab={
                    <>
                      <p className='text-left'>Sort by</p>
                      {/* <p className='text-[12px] text-left btn-color-revers'>some text</p> */}
                    </>
                  }
                    key="sort" className='h-[40vh] overflow-hidden overflow-y-scroll' >
                    <div className='mt-2'>
                      <input checked={sort == "false" ? true : false} onClick={handleSortOrder} id='rel' type="radio" name='sort' value="false" />
                      <label className='text-[18px] ml-2' htmlFor="rel">Relevance</label>
                    </div>
                    <div className='mt-2'>
                      <input checked={sort == "DESC" ? true : false} onClick={handleSortOrder} id='htl' type="radio" name='sort' value="DESC" />
                      <label className='text-[18px] ml-2' htmlFor="htl">Price (High to Low)</label>
                    </div>
                    <div className='mt-2'>
                      <input checked={sort == "ASC" ? true : false} onClick={handleSortOrder} id='lth' type="radio" name='sort' value="ASC" />
                      <label className='text-[18px] ml-2' htmlFor="lth">Price (Low to High)</label>
                    </div>
                  </TabPane>
                  {
                    Object.keys(filtersGroup).map(function (groupid) {
                      if (groupid != 'priceRange') {
                        return (<TabPane tab={
                          <>
                            <p className='text-left'>{filtersGroup[groupid].filter_group_name}</p>
                            {filterPayLoad[groupid]?.length && <p className='text-[12px] text-left btn-color-revers'>{filterPayLoad[groupid]?.length} items selected</p>}
                          </>
                        }
                          key={groupid} className='max-h-[40vh] overflow-hidden overflow-y-scroll' >
                          {
                            Object.keys(filtersGroup[groupid].filter_group_values).map(function (value) {
                              return (
                                // <input type="radio" id="css" name="fav_language" value="CSS"></input>
                                // <p>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</p>
                                // checked={filterArray.length&&filterArray.map(function(item){
                                //   if(Object.keys(item)[0]==groupid && Object.values(item)[0]==value){
                                //     console.log(Object.values(item)[0])
                                //     // return true
                                //     // // console.log(value,e.target.value)
                                //     // document.getElementById(value).checked=true
                                //     // console.log(document.getElementById(value))
                                //   }
                                //   else{
                                //     return false
                                //   }
                                // })}
                                <div className='mt-2'>

                                  {/* // Object.keys(filterPayLoad).length&&filterPayLoad[groupid]?.includes(value)?
                                    // <input checked={true} type="checkbox" id={value} name={groupid} value={value} onClick={(e) => handleFilter(groupid, value, e)} /> */}

                                  <input checked={filterPayLoad[groupid]?.includes(1 * value) ? true : false} type="checkbox" id={value} name={groupid} value={value} onClick={(e) => handleFilter(groupid, value, e)} />

                                  <label className='text-[18px] ml-2' htmlFor={value}>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</label>
                                </div>
                              )
                            })
                          }
                        </TabPane>)
                      }
                      else if (groupid == 'priceRange') {
                        return (
                          <TabPane tab={`${groupid}`} key={groupid} className='h-[40vh] overflow-hidden overflow-y-scroll' >
                            <p className='text-xl text-center mt-14 mb-4'>Select the Price Range</p>
                            <div className='px-10'>

                              <Slider trackStyle={{ height: '10px' }} handleStyle={{ height: '20px', width: "20px" }} marks={{
                                [Number(filtersGroup[groupid]?.min_value)]: `${Number(filtersGroup[groupid]?.min_value)}`,
                                [Number(filtersGroup[groupid]?.max_value)]: `${Number(filtersGroup[groupid]?.max_value)}`,
                              }
                              } onAfterChange={priceSliderhandler} range max={Number(filtersGroup[groupid].max_value)} min={Number(filtersGroup[groupid].min_value)} defaultValue={[Object.values(priceFilter).length ? Object.values(priceFilter)[1] : Number(filtersGroup[groupid].min_value), Object.values(priceFilter).length ? Object.values(priceFilter)[0] : Number(filtersGroup[groupid].max_value)]} />
                            </div>
                          </TabPane>
                        )
                      }
                    })
                  }

                </Tabs>

              </div>
              <div className='absolute right-0 bottom-0 gap-6 pb-9 sort-btn'>
                <p onClick={() => setFilterModalVisible(false)} className='text-base px-5 py-2 btn-color-revese cursor-pointer inline'>Cancel</p>
                <p onClick={handleFilterAndSort} className='btn-bg text-white text-base mr-10 px-5 py-2 rounded cursor-pointer inline'>Apply</p>
              </div>
            </div>

          </Modal>
        </>
        {/* for mobile view */}
        <>{
          mobileSortOpen && <div className='lg:hidden md:hidden bg-white fixed h-[91vh] w-full  left-0 top-0 z-[1000] overflow-y-scroll'>

            <h3 className='pt-5 pb-5 nav-bg' onClick={openMobileSort}><BsArrowLeft className={`mx-2 inline`} size={20} />Sort by</h3>
            <div className='mt-3 flex flex-wrap px-2 radio-custom'>

              <input checked={sort == "false" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Popularity' name="sort" value="false" />
              <label className='px-2 py-2 btn-bg rounded text-white mr-1 my-2 border' htmlFor="Popularity">Relevance</label>

              <input checked={sort == "DESC" ? true : false} onClick={handleSortOrder} className='hidden' type="radio" id='High' name="sort" value="DESC" />
              <label className='px-2 py-2 btn-bg rounded text-white mr-1 my-2 border' htmlFor="High">Price (High to Low)</label>

              <input checked={sort == "ASC" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Low' name="sort" value="ASC" />
              <label className='px-2 py-2 btn-bg rounded text-white mr-1 my-2 border' htmlFor="Low">Price (Low to High)</label>
            </div>
            {Object.keys(filtersGroup).length != 0 && <h3 className='p-5 nav-bg'>Filter</h3>}
            <div>
              <Tabs tabPosition='left' type="card" size="large" tabBarGutter='0' className='mobile-tab max-h-full overflow-hidden overflow-y-scroll'>
                {
                  Object.keys(filtersGroup).map(function (groupid) {
                    if (groupid != 'priceRange') {
                      return (<TabPane tab={
                        <>
                        <p className='text-left'>{filtersGroup[groupid].filter_group_name}</p>
                        {filterPayLoad[groupid]?.length && <p className='text-[10px] text-left btn-color-revers'>{filterPayLoad[groupid]?.length} items selected</p>}
                      </>
                      } key={groupid}>
                        {
                          Object.keys(filtersGroup[groupid].filter_group_values).map(function (value) {
                            return (
                              // <input type="radio" id="css" name="fav_language" value="CSS"></input>
                              // <p>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</p>
                              <div className='mt-2'>
                                <input checked={filterPayLoad[groupid]?.includes(1 * value) ? true : false} type="checkbox" id={value} value={value} onClick={() => handleFilter(groupid, value)} />
                                <label className='text-[18px] ml-2' htmlFor={value}>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</label>
                              </div>
                            )
                          })
                        }
                      </TabPane>)
                    }
                    else if (groupid == 'priceRange') {
                      return (
                        <TabPane tab={`${groupid}`} key={groupid} >
                          <p className='text-[18px] text-center mt-14 mb-4'>Select the Price Range</p>
                          <div className='px-2'>
                            <Slider trackStyle={{ height: '10px' }} handleStyle={{ height: '20px', width: "20px" }} marks={{
                              [Number(filtersGroup[groupid].min_value)]: `${Number(filtersGroup[groupid].min_value)}`,
                              [Number(filtersGroup[groupid].max_value)]: `${Number(filtersGroup[groupid].max_value)}`,
                            }
                            } onChange={priceSliderhandler} range max={Number(filtersGroup[groupid].max_value)} min={Number(filtersGroup[groupid].min_value)} defaultValue={[Object.values(priceFilter).length ? Object.values(priceFilter)[1] : Number(filtersGroup[groupid].min_value), Object.values(priceFilter).length ? Object.values(priceFilter)[0] : Number(filtersGroup[groupid].max_value)]} />
                          </div>
                        </TabPane>
                      )
                    }
                  })
                }

              </Tabs>
            </div>
            <div className='max-h-[100vh] h-1 w-1 mobile-sort-div'>
              <div className='flex justify-end gap-6 pb-5 fixed bottom-0 right-0 bg-white left-0 shadow-[0_20px_10px_15px_rgba(0,0,0,0.6)] pt-5'>
                <p onClick={openMobileSort} className='text-base px-5 py-2 btn-color-revese'>Cancel</p>
                <p onClick={() => { handleFilterAndSort(), openMobileSort() }} className='btn-bg text-white text-base mr-10 px-5 py-2 rounded'>Apply</p>
              </div>
            </div>
          </div>
        }
        </>
      </section >
    </>
  )
}
const mapStateToProps = state => ({
  cart: state.cart,
  info: state.store.info,
  products: state.store.products,
  categories: state.store.categories,
  checkout: state.checkout,
  banner: state.store.banners,
  pageCount: state.store.pageCount,
  user: state.user.currentUser,

})
const mapDispatchToProps = dispatch => ({
  getPageCount: (payload) => dispatch(getPageCountStart(payload)),
  clearProductList: (payload) => dispatch(clearProductList()),
  getShopProducts: (storeId) => dispatch(getShopProductsStart(storeId)),
  getCategoryProducts: (data) => dispatch(getCategoryProductsStart(data)),
  getCategoryStart: (storeId) => dispatch(getCategoryStart(storeId)),
  getSearchProducts: (payload) => dispatch(getSearchProductsStart(payload)),
  setSearchHandler: (payload) => dispatch(setSearchHandler(payload)),
  addWishlist: (payload) => dispatch(addWishlistStart(payload)),
  getFilterGroups: (payload) => dispatch(getFilterGroups(payload)),

})
export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Home)))

