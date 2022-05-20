<<<<<<< HEAD
import Head from 'next/head'
import { connect } from 'react-redux'
import { useEffect, useState, useRef, memo, useCallback } from 'react'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';
import Gproducts from '@components/Products/gproduct'

import { redirect } from '@components/link';


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
            const value = e;
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
    }, [Router.query, page])
    useEffect(() => { // UI function
=======
import React from 'react';
import PageWrapper from '@components/page-wrapper/page-wrapper';
import Slider from "react-slick";
import { connect } from 'react-redux'
import { BsChevronRight } from "react-icons/bs";
import RecommendedCard from "@components/Cards/Home/RecommendedCard";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className='hidden md:block lg:block'>
    <div
      className={className}
      style={{ ...style, display: "block", marginRight: "50px" }}
      onClick={onClick}
    >
    </div>
    </div>

  );
}
>>>>>>> origin/tanjid

        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className='hidden md:block lg:block'>
                    <div
                        className={className}
                        style={{ ...style, display: "block", marginLeft: "50px", zIndex: '1' }}
                        onClick={onClick}
                    />
                </div>
            );
        }
        const Index = ({ banner }) => {
            var bannersettings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />
            };

            const settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 3,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            autoplay: true,
                            dots: false,
                            nextArrow: <SampleNextArrow />,
                            prevArrow: <SamplePrevArrow />,
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }
                ]
            };

            return (
                <div >
<<<<<<< HEAD
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>
      <section>
        <Gproducts wishlist={addWishlist} lastEleRef={listLastElement} storeName={info?.store_name} products={products} status={status} />
      </section >
=======
      {/* slider div */}
      <div className='mt-10 mr-6 ml-6 lg:mr-24 lg:ml-24 mb-8'>
      <div>
        <Slider {...bannersettings}>
          {banner.map((item, idx) => <div key={idx}>
            <img className='lg:w-full lg:h-[500px] lg:max-h-[500px]' src={item.banner_img_url} alt="" />
          </div>)}
        </Slider>
      </div>
      </div>
      {/* fresh items */}
      <div className='mr-6 ml-6 lg:mr-40 lg:ml-40'>
      <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold '>Fresh Items</h2>
      <div className='bg-[#C0EDAB]'>
      <Slider {...settings}>
          {[1,2,3,4,5,6,7].map((item, idx) => <div key={idx}>
            <img className='w-[80px] h-[80px] max-h-[80px] lg:w-[200px] lg:h-[200px] lg:max-h-[200px] ml-4 mt-2' src="/img/fresh1.png" alt="" />
          </div>)}
        </Slider>
      </div>
      </div>
      {/* Recommended */}
      <div className='mr-6 ml-6 lg:mr-40 lg:ml-40'>
        <h2 className='mt-8 mb-2 text-lg md:text-xl lg:text-2xl font-bold'>Recomended</h2>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-8'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => < div key={idx} >
          <RecommendedCard></RecommendedCard>
        </div>)
        }
      </div>
      </div>

>>>>>>> origin/tanjid
    </div >
  );
};

const mapStateToProps = state => ({
<<<<<<< HEAD
    cart: state.cart,
    info: state.store.info,
    products: state.store.products,
    categories: state.store.categories,
    checkout: state.checkout,
    banner: state.store.banners,
    pageCount: state.store.pageCount
=======
  banner: state.store.banners
>>>>>>> origin/tanjid


})

export default connect(mapStateToProps)(PageWrapper(Index));