import Head from 'next/head'
import { connect } from 'react-redux'
import { useEffect, useState, useRef, memo,useCallback } from 'react'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';
import Gproducts from '@components/Products/gproduct'

import { redirect } from '@components/link';


// Actions
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart, getPageCountStart, clearProductList } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'
import PageWrapper from '@components/page-wrapper/page-wrapper';
import {addWishlistStart}from '@redux/wishlist/wishlist-action'



const Home = ({ products, addWishlist, pageCount,getPageCount,info, cart,clearProductList, checkout, categories, getCategoryStart, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler }) => {
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
  const [page, setPage] = useState(1)

  const [scrollPosition, setScrollPosition] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
  const [navHeight, setNavHeight] = useState(156)
  const [restHeight, setRestHeight] = useState(78) // in vh
  const [plpc, setPlpc] = useState(775) // in vh
  const [description, setDescription] = useState("")

  useEffect(() => { // Componentdidmount
    if (!categories.length) getCategoryStart(storeId);
    setSearchHandler((e) => {
      const  value  = e;
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
  }, [Router.query,page])
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
    <div >
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>

      <section>

      <Gproducts wishlist={addWishlist} lastEleRef={listLastElement} storeName={info?.store_name} products={products} status={status}/>
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
  banner:state.store.banners,
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

