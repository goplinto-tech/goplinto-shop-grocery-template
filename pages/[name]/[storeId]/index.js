import Head from 'next/head'
import { connect } from 'react-redux'
import { useEffect, useState, useRef, memo } from 'react'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';

import ProductListPage from '@components/Products/index'
import CatList from '@components/catgegory/cat'
import { Button } from '@components/inputs';
import HomeCartItem from '@components/cart-item/home-cart-item';
import { redirect } from '@components/link';
import { Input } from '@components/inputs';

// Actions
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'
import PageWrapper from '@components/page-wrapper/page-wrapper';
import EmptyCart from '@components/empty-cart';


const Home = ({ products, banner,info, cart, checkout, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const purchaseDetails = checkout.purchaseDetails;
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
  const storeId = info.store_id;
  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategory, search } = Router.query;
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  const [q, setq] = useState(search ? search : '');
  // UI Vars

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
  const [navHeight, setNavHeight] = useState(156)
  const [restHeight, setRestHeight] = useState(78) // in vh
  const [plpc, setPlpc] = useState(775) // in vh
  const [description, setDescription] = useState("")

  useEffect(() => { // Componentdidmount
    if (!categories.length) getCategoryStart(storeId);
    setSearchHandler((e) => {
      const { value } = e.target;
      if (value.trim().length > 0) {
        setStatus('loading')
        redirect(`/?search=${value}`)
      } else {
        setSearchResult([])
        redirect(`/`)
      }
      setq(value)
    })
  }, [])

  useEffect(() => {
    if (search) {
      getSearchProducts({ storeId, q: q.trim(), setSearchResult, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

    } else if (category) {
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategory, page: 1, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching

      // setq('') // Cleaning query string of search
    } else {
      getShopProducts({ storeId, setStatus })
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      // setq('') // Cleaning query string of search
    }
  }, [Router.query])
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
  }, [])
  // SEO
  useEffect(() => {
    const dsc = products.reduce((dsc, item) => dsc + ", " + item.item_name + ', ' + item.item_desc, "")
    setDescription(dsc)
  }, [products])
  const searchHandler = (e) => {
    const { value } = e.target;
    if (value.trim().length > 0) {
      setStatus('loading')
      redirect(`/?search=${value}`)
    } else {
      setSearchResult([])
      redirect(`/`)
    }
    setq(value)
  }
  return (
    <div >
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>
      
      <section>
        <div className='wrapper mx-auto'>
          <div className=" grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="md:mt-10  col-span-full md:col-span-3 xl:col-span-2 border-gray-300 z-10 bg-white
            md:overflow-y-auto
            md:flex sticky
            no-scrollbar"
              style={{ top: navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}
            >
              <CatList list={categories.length > 0 && categories} />
            </div>
            <div className="md:pt-8 md:py-6 col-span-full md:col-span-9 xl:col-span-7 sm:col-span-12  pt-6 md:border-l xl:border-r
            ">
              {/* md:overflow-y-auto
            md:flex flex-col sticky
            no-scrollbar"
              style={{ top: navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}
            > */}
              {/* <div className='text-base w-full px-4 md:px-8 serach-bar fixed flex flex-col -mt-6 md:-mt-8 xl:-mt-6 -ml-4 xl:ml-0' style={{ maxWidth: '775px', top: navHeight }}> */}
              <div className='text-base w-full px-4 md:px-8 serach-bar fixed flex flex-col -mt-6 md:-mt-8 xl:-mt-6 xl:ml-0' style={{ maxWidth: plpc, top: navHeight }}>
                <Input className='py-2' style={{ top: navHeight }} onChange={searchHandler} placeholder='Search for items' ></Input>
              </div>
              <div id='plp-container' className='md:overflow-y-auto md:flex flex-col md:sticky no-scrollbar ' style={{ top: navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}>
                <ProductListPage storeName={info?.store_name} products={products} status={status} banner={banner} />
              </div>
            </div>
            <div className="md:pt-8 md:py-6 hidden xl:col-span-3 mt-0 xl:block  space-y-6">
              <div className='pb-6 border-b-2 bg-white z-10'>
                <h2 className=' black-color font-extrabold text-xl'>My Cart</h2>
              </div>
              {
                !!cart.length ? <>
                  {
                    cart.map((item, i) => (
                      <HomeCartItem data={item} key={i} />

                    ))
                  }
                  <div>
                    {
                      !!purchaseDetails ?
                        <>
                          <div className='py-6 flex justify-between items-end' >
                            <h1 className='text-2xl'>Item Total</h1>
                            <div>
                              <span className='text-base font-medium'>{totalItems} item(s) </span>
                              <span className='text-2xl font-semibold'> ₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</span>
                            </div>
                          </div>
                          <Button type='link' href='/cart' className='block btn-color btn-bg w-full text-center rounded  py-4'>Proceed To Checkout</Button>
                        </>
                        :
                        <>
                          <div className='py-6 flex justify-between items-end' >
                            <h1 className='text-2xl'>Item Total</h1>
                            <div>
                              <span className='text-base font-medium'>{totalItems} item(s) </span>
                              <span className='text-2xl font-semibold'> ₹ {cart.reduce((acc, item) => parseFloat(item.sale_price) + acc, 0)}</span>
                            </div>
                          </div>
                          <Button className='block btn-color btn-bg w-full text-center rounded  py-4' type='link' href='/cart'>Proceed To Checkout</Button>
                        </>
                    }
                  </div>
                </>
                  : <div className="h-64 w-full text-center flex justify-center items-center" style={{ borderRadius: '50%' }}>
                    <div>
                      <EmptyCart />
                      <h4 className=' mt-6'>Your Cart is Empty!</h4>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div >
      </section >
    </div >
  )
}
const mapStateToProps = state => ({
  cart: state.cart,
  info: state.store.info,
  products: state.store.products,
  categories: state.store.categories,
  checkout: state.checkout,
  banner:state.store.banners
})
const mapDispatchToProps = dispatch => ({
  getShopProducts: (storeId) => dispatch(getShopProductsStart(storeId)),
  getCategoryProducts: (data) => dispatch(getCategoryProductsStart(data)),
  getCategoryStart: (storeId) => dispatch(getCategoryStart(storeId)),
  getSearchProducts: (payload) => dispatch(getSearchProductsStart(payload)),
  setSearchHandler: (payload) => dispatch(setSearchHandler(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Home)))

