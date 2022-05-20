import Head from 'next/head'
import { Link } from 'next/link';
import { connect } from 'react-redux'
import { useEffect, useState, useRef, memo, useCallback } from 'react'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';
import { redirect } from '@components/link';
import React from 'react'


// import RecommendedCard from '@components/Cards/Home/RecommendedCard'
import { BsFilterLeft } from 'react-icons/bs'
import ProductItem from '@components/product-item/product-item'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Actions
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart, getPageCountStart, clearProductList } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'
import PageWrapper from '@components/page-wrapper/page-wrapper';
import { addWishlistStart } from '@redux/wishlist/wishlist-action'



const Home = ({ products, addWishlist, pageCount, getPageCount, info, cart, clearProductList, checkout, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const purchaseDetails = checkout.purchaseDetails;
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
  const storeId = info.store_id;
  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategoryId, search } = Router.query;
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  // const [q, setq] = useState(search ? search : '');
  // UI Vars
  const [page, setPage] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
  const [navHeight, setNavHeight] = useState(156)
  const [restHeight, setRestHeight] = useState(78) // in vh
  const [plpc, setPlpc] = useState(775) // in vh
  const [description, setDescription] = useState("")

  useEffect(() => { // Componentdidmount
    if (!categories.length) getCategoryStart(storeId);
    // setSearchHandler((e) => {
    //   const value = e;
    //   if (value.trim().length > 0) {
    //     setStatus('loading')
    //     redirect(`/?search=${value}`)
    //   } else {
    //     setSearchResult([])
    //     redirect(`/`)
    //   }

    //   setq(value)
    // })
  }, [])
  const observer = useRef()
  const listLastElement = useCallback(node => {
    if (status == 'loading') return;

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pageCount) {
        console.log("visible");
        console.log(page + 1);
        // console.log(Router);
        console.log(status);
        if (page < pageCount && !search) {
          setPage(page + 1)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [pageCount])
  useEffect(() => {
    if (search) {
      setStatus('loading')
      getSearchProducts({ storeId, q: search, setSearchResult, setStatus: (s) => { } })

    } else if (category) {
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategoryId, page: 1, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

    } else {
      getShopProducts({ storeId, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      // setq('') // Cleaning query string of search
    }
  }, [category, subCategoryId, search, page])
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

  return (
    < >
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>
      <ToastContainer />
      <section>
        <div className="bg-[#F5F5F5] md:bg-white">
          <div className=" wrapper w-full ">
            <div className="md:mr-16">
              <div className="flex justify-between my-2 bg-white p-2 py-4 md:py-0 md:p-0 md:my-4">
                <p className="flex items-center font-bold md:ml-3 ">All Items</p>
                <div className="flex font-bold ">
                  <BsFilterLeft size={20} className='' />
                  <p className="flex items-center "> Filter / Sort By</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8 gap-y-14 px-3 md:px-0">
              {status == 'success' || status == 'loading' ?
                products.length && (status == 'loading' || status == 'success')
                  ? <>
                    {
                      products.map((item, i) => (
                        <div className='w-full'>
                          <ProductItem className={'mx-auto'} key={i} data={item} addItemToWishlist={addWishlist} />
                        </div>
                      ))}
                    {/* {
                      status == 'loading' &&
                      <>
                        Loading...
                      </>
                    } */}
                    <div className="h-6"></div>
                    <div className="h-8" ref={listLastElement}></div>
                  </>
                  : products?.length < 1 && status == 'success' ?
                    <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                      <h6>
                        <span>No items found{' '}
                          <Link href={`/shop`}>
                            <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                              Show All Products.
                            </a>
                          </Link>
                        </span>
                      </h6>
                    </div>
                    : products?.length < 1 && status == 'success' ?
                      <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                        <h6>
                          <span className="">No items found{' '}
                            <Link href={`/shop`}>
                              <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                                Show All Products.
                              </a>
                            </Link>
                          </span>
                        </h6>
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

                : status == 'success' ?
                  <>
                    <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                      <h6>
                        <span className="">No items found{' '}
                          <Link href={`/`}>
                            <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                              Show All Products.
                            </a>
                          </Link>
                        </span>
                      </h6>
                    </div>
                  </>
                  :
                  <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                    <h6 className="text-center">
                      <span className="">Unexpected error occurred{' '}
                        <span className="red-color block" onClick={Router.reload} style={{ cursor: 'pointer' }}>{' '}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise inline" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg> Please Reload
                        </span>
                      </span>
                    </h6>
                  </div>
              }
            </div>
          </div>
        </div>
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
  pageCount: state.store.pageCount

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

})
export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Home)))
