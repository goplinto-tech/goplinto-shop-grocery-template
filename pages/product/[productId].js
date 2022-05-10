import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import Head from "next/head";
import { AiOutlineHeart } from 'react-icons/ai'

// Component
import { QuantityID } from '@components/inputs'
// import Loader from "@components/loading/loader";
import currency from '@utils/currency'
import { Button } from "@components/inputs";
import PdpImage from "@components/pdp-image/pdp-image";
import ErrorPage from '@components/error/index'
import Loader from "@components/loading/loader";
// actions
import { addToCart, removeFromCart } from "@redux/cart/cart-actions";
// import { authShowToggle } from "@redux/user/user-action";
// import { addWishlistStart, removeWishlistStart } from '@redux/wishlist/wishlist-action'
import { productDetailsFetchStart, similarProductFetchStart, getAdditionalInfoStart, getSpecificationsStart } from "@redux/product-details/product-actions";
// Components
import Rating from "@components/rating-stars/rating";
import PageWrapper from "@components/page-wrapper/page-wrapper";
import { GoPrimitiveDot } from 'react-icons/go'
import RecommendedCard from "@components/Cards/Home/RecommendedCard";
const visualsStructure = {
    view: false, // true if want to view on page otherwise false till product details are not fiiled in this object
    name: '',
    id: 0,
    categoryId: null,
    subCategoryId: null,
    storeId: null,
    images: [], // First element will be primary image
    desc: '',
    rating: { value: 4.5, count: 5.0 },
    price: {
        price: Number(0).toFixed(2), //499.90
        sale_price: Number().toFixed(2), //399.99
        currency: currency['INR'] // INR == ₹ USD == $
    },
    inventoryDetails: null,
    specifications: [],
    additionalinfo: [],
    similarProducts: []  //[...similarProducts]
}
import { addWishlistStart } from '@redux/wishlist/wishlist-action'

const ProductDetails = ({
    cart, addToCart, removeFromCart,
    fetchProductDetails, fetchSimilarProducts, getAdditionalInfo, getSpecifications, addWishlist }) => {
    const [success, onSuccess] = useState({})
    const [failure, onFailure] = useState(null)
    const [additionalinfo, setAdditionalInfo] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [similarProducts, setSimilarProducts] = useState([])
    const [defaultVariant, setDefaultVarian] = useState([])
    const [descriptions, setDescriptions] = useState('')
    const [viewdscmore, setViewdscmore] = useState(false)

    // Information for this page
    const [visuals, setVisuals] = useState(visualsStructure)
    const router = useRouter()
    useEffect(() => {
        const { productId } = router.query
        if (!productId) return;
        fetchProductDetails({ id: productId, onSuccess, onFailure })
        getAdditionalInfo({ setAdditionalInfo, id: productId })
        getSpecifications({ setSpecifications, id: productId })
        fetchSimilarProducts({ setSimilarProducts, id: productId })
    }, [router.isReady])

    //UI setting for mobile devices
    const [mobNavHeight, setMobNavHeight] = useState(0)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const objerver = new ResizeObserver(function (e) {
                if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
                    const ele = document.getElementById('mob-navbar')
                    if (ele) {
                        if (ele.offsetWidth != mobNavHeight) {
                            // console.log(ele)
                            setMobNavHeight(ele.offsetHeight)
                        }
                    }
                }
            })
            objerver.observe(document.body)
        }
    }, [])
    useEffect(() => {
        // Run with Product change
        if (!Object.keys(success).length || !success) {
            return
        }
        // Setting Up varient
        const getVariant = []
        if (success.is_customizable == "Y" && success.defaultVariantItem) {
            const setGetVariant = (item => {
                for (let i = 0; i < getVariant.length; i++) {
                    const variant = getVariant[i]
                    if (variant[0].variant_group_id != item.variant_group_id) continue;
                    getVariant[i].push(item)
                    return
                }
                getVariant.push([item]);
            })
            const totalVariant = []
            const defaultVariant = success.defaultVariantItem;
            for (let i = 1; i <= 5; i++) {
                if (defaultVariant[`variant_value_${i}`]) {
                    setGetVariant(defaultVariant[`variant_value_${i}`])
                }
            }
            // console.log(getVariant);
            setDefaultVarian(getVariant)
        }
        // SetingUp images
        const images = [success.primary_img || '/img/default.png']
        for (let i = 1; i <= 5; i++) {
            if (success[`img_url_${i}`]) {
                images.push(success[`img_url_${i}`])
            }
        }
        setVisuals({
            ...visuals,
            view: true,
            id: success.item_id,
            categoryId: success.category_id,
            subCategoryId: success.sub_category_id,
            storeId: success.store_id,
            variantId: success.defaultVariantItem?.variant_item_id,
            name: success.item_name,
            images: [...images],
            desc: success.item_desc,
            rating: { value: 4.5, count: 5.0 },
            price: {
                price: Number(success.price).toFixed(2),
                sale_price: Number(success.sale_price).toFixed(2),
                currency: currency['INR']
            },
            inventoryDetails: success.inventoryDetails,
            // specifications: [...defaultVariant.map((item) => ({ name: item.variant_group_name, value: item.variant_value_name }))],
            specifications: [...specifications],
            similarProducts: [...similarProducts],
            additionalinfo: [...additionalinfo],
            item: success
        })
    }, [success, similarProducts, additionalinfo, specifications])
    useEffect(() => { // SEO
        const dsc = success.item_name + ', ' + success.item_desc
        setDescriptions(dsc)
    }, [success])
    const productDataForCart = {
        item_id: visuals.id,
        store_id: visuals.storeId,
        category_id: visuals.categoryId,
        item_name: visuals.name,
        sale_price: visuals.price.sale_price,
        price: visuals.price.price,
        sub_category_id: visuals.subCategoryId,
        primary_img: visuals.images[0],
        is_veg: visuals.item?.is_veg,
        inventoryDetails: visuals.inventoryDetails,
    }
    const quantityInCart = cart.filter((item) => item.item_id == visuals.id)[0]?.quantity
    // console.log(quantityInCart, failure);
    console.log(visuals);
    return (
        <>
            <Head>
                <title>{visuals.name}</title>
                <meta name="description" content={`${descriptions}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                <meta property="og:description"
                    content={`${descriptions}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                <meta name="keywords" content={`${descriptions} , Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
            </Head>
            <div className=' w-full flex hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
                <span className='text-base font-semibold'>Product</span>
            </div>
            {
                visuals.view ?
                    <div className="flex flex-row md:wrapper w-full mr-0 md:mr-2 ">
                        <div className="basis-1/12 hidden md:block "></div>
                        <div className="basis-12/12 md:basis-10/12 md:ml-7 md:mr-9 ">
                            <section className="bg-black-color-lighter  pdp">
                                <div className="w-full pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px] bg-white  relative">
                                    <div className="">
                                        <div className="flex md:hidden  justify-between w-full">
                                            <img className="my-2" src="/img/square.png" />
                                            <AiOutlineHeart className="my-2" size={18} />
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 md:py-20 overflow-x-hidden">
                                            <div className="w-11/12 md:w-full ml-4 md:ml-0">
                                                {/* <img src={visuals.images[0]} alt={visuals.name} /> */}
                                                <PdpImage name={visuals?.name} list={visuals?.images} />
                                            </div>
                                            <div className="relative overflow-auto no-scrollbar w-full h-full">
                                                <div className=" lg:absolute w-full top-0">
                                                    {/* <span className="text-sm md:text-lg black-color-75 capitalize ">{visuals.item.item_status.toLowerCase()}</span> */}
                                                    <h1 className="text-base md:text-lg xl:text-3xl mb-4 font-semibold md:font-bold capitalize">{visuals?.name.toLowerCase()}</h1>
                                                    <div >
                                                        <Rating value={visuals?.rating.value} count={visuals?.rating.count} />
                                                    </div>
                                                    <div className="my-4 md:my-6">
                                                        <span className="text-lg md:text-xl my-6 black-color font-semibold">₹{visuals?.price?.sale_price}</span>
                                                        {
                                                            visuals.price.sale_price != visuals?.price?.price &&
                                                            <span className="mx-2 md:mx-6 black-color-75 text-sm md:text-lg font-light line-through">₹{visuals?.price?.price}</span>
                                                        }
                                                        {/* {
                                                    Boolean(visuals.price.price - visuals.price.sale_price) &&
                                                    <span className="mx-2 md:mx-6 success-color text-sm md:text-lg font-light">save ₹{visuals.price.price - visuals.price.sale_price}</span>
                                                } */}
                                                    </div>
                                                    <div className="my-6">
                                                        <p className={`text-sm md:text-base text-gray-500 font-bold text-justify md:text-left  normal-case ${!viewdscmore && visuals?.desc?.length > 200 && 'product-truncate'} transition`}>
                                                            {visuals?.desc}
                                                        </p>
                                                        {
                                                            visuals?.desc?.length > 200 &&
                                                            <Button style={{ color: "#F58634" }} className="btn-color-revers" onClick={() => setViewdscmore(!viewdscmore)}>{viewdscmore ? 'hide' : 'more'}.</Button>
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            quantityInCart ?
                                                                <QuantityID className=" hidden md:block" value={quantityInCart} pdp={true} disabledPlush={(() => {
                                                                    if (visuals?.inventoryDetails) {
                                                                        return visuals?.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0 || visuals.inventoryDetails.inventory_quantity <= quantityInCart
                                                                    }
                                                                    return false
                                                                })()}
                                                                    onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                                                                :
                                                                <Button className="w-full hidden md:block md:w-auto py-3 px-12 text-base btn-bg btn-color rounded" style={{ backgroundColor: "#F58634" }} onClick={() => addToCart(productDataForCart)} >ADD TO CART</Button>
                                                        }
                                                    </div>
                                                    {
                                                        visuals.inventoryDetails ?
                                                            <>
                                                                {
                                                                    visuals.inventoryDetails.min_order_quantity > 0 &&
                                                                    <div className="">
                                                                        <span className="text-sm black-color-75">*Minimum order quantity is {visuals.inventoryDetails.min_order_quantity}.</span>
                                                                    </div>
                                                                } {
                                                                    (visuals.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0) || visuals.inventoryDetails.inventory_quantity == quantityInCart &&
                                                                    <div className="">
                                                                        <span className="text-sm success-color">*You reached to maximum order quantity {visuals.inventoryDetails.max_order_quantity}.</span>
                                                                    </div>
                                                                }
                                                            </>
                                                            : <></>
                                                    }
                                                    <div className="my-6">
                                                        {

                                                            defaultVariant.map(varient => (<>
                                                                <h6 className="text-base font-semibold md:text-xl md:font-medium">Size</h6>
                                                                <div className="flex mt-6">
                                                                    {
                                                                        varient.map(() => (
                                                                            <div className="mr-6 size-tab-active rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                                                <span className="text-base md:text-xl font-medium">S</span>
                                                                            </div>

                                                                        ))
                                                                    }
                                                                </div>
                                                            </>))
                                                        }
                                                        {/* <h6 className="text-base font-semibold md:text-xl md:font-medium">Size</h6>
                                            <div className="flex mt-6">
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">M</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">L</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">XL</span>
                                                </div>
                                            </div> */}
                                                    </div>

                                                </div></div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    !!visuals.specifications.length &&
                                    <div className="w-full  pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px]   bg-white ">
                                        <div className="">
                                            <div className="py-4 md:py-20">
                                                <div className="mt-6">
                                                    <div className=" border-static additional-info mb-8">
                                                        <h2 className=" lg:text-2xl md:text-xl">
                                                            Highlights
                                                        </h2>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {
                                                            visuals.specifications.map((item, i) => (
                                                                <div className="py-3 flex flex items-center" key={i}>
                                                                    <GoPrimitiveDot />
                                                                    <p className="text-sm md:text-xl font-thin text-gray-500 mx-2 ">{item.attribute_value}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    !!visuals.specifications.length &&
                                    <div className="w-full pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px]   bg-white ">
                                        <div className="">
                                            <div className="py-4 md:py-20">
                                                <div className="mt-6">
                                                    <div className=" border-static additional-info mb-8">
                                                        <h3 className="lg:text-2xl text-base md:text-xl">
                                                            Product Specification
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {
                                                            visuals.specifications.map((item, i) => (
                                                                <div className="py-3 border-b-2 " key={i}>
                                                                    <h6 className="text-sm font-semibold black-color-75">{item.attribute_key}</h6>
                                                                    <h3 className="text-base font-semibold black-color mt-1">{item.attribute_value}</h3>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    !!!visuals.similarProducts.length &&
                                    <div className="w-full  h md:block bg-[#F5F5F5]  md:bg-white ">
                                        <div className="">
                                            <div className=" md:py-20">
                                                <div className="md:mt-6">
                                                    <div className=" border-static bg-white pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px] md:additional-info mb-8">
                                                        <h3 className="lg:text-2xl text-base md:text-xl">
                                                            Recommended Products
                                                        </h3>
                                                    </div>
                                                    <div className="grid bg-[#F5F5F5] pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px] md:bg-white grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }



                                {
                                    visuals.additionalinfo.length ?
                                        <div className="w-full pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px]   bg-white ">
                                            <div className="">
                                                <div className="">
                                                    <div className=" border-static additional-info ">
                                                        <h3 className=" lg:text-2xl md:text-xl">
                                                            Additional Info
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-10  gap-y-10 gap-x-4 md:gap-8 lg:gap-x-16 xl:gap-x-24">
                                                        {/* // <div className="grid grid-cols-2 mt-10 gap-y-10 gap-x-36"> */}
                                                        {
                                                            visuals.additionalinfo.map((item, i) => (
                                                                <div className="w-full" key={i} >
                                                                    <div className="w-full product-addinfo-img-c border rounded">
                                                                        {
                                                                            item.media_type == "IMAGE" ?
                                                                                <img className="w-full h-full object-cover " src={item.media_url} alt='...' />
                                                                                :
                                                                                <ReactPlayer height={'100%'} width={'100%'} url={item.media_url} />
                                                                        }
                                                                    </div>
                                                                    <div className="mt-8">
                                                                        {/* <h2 className="text-base md:text-xl font-semibold capitalize">{item.title}{item.title.toLowerCase()}</h2> */}
                                                                        <p className="mt-6 text-sm md:text-lg text-gray-500 leading-7 tracking-tight normal-case">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>
                                }

                                {
                                    !!!visuals.similarProducts.length &&
                                    <div className="w-full  h md:block bg-[#F5F5F5]  md:bg-white ">
                                        <div className="">
                                            <div className=" md:py-20">
                                                <div className="md:mt-6">
                                                    <div className=" border-static bg-white pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px] md:additional-info mb-8">
                                                        <h3 className="lg:text-2xl text-base md:text-xl">
                                                            Recommended Products
                                                        </h3>
                                                    </div>
                                                    <div className="grid bg-[#F5F5F5] pl-[7px] pr-[8px] py-[16px] md:pl-[0px] md:pr-[0px] md:py[16px] md:bg-white grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>
                                                        <div>
                                                            <RecommendedCard />

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </section >
                        </div>
                        <div className="basis-1/12 hidden md:block "></div>
                    </div>
                    : failure
                        ?
                        <ErrorPage message="failure.message" />
                        :
                        <Loader />

            }
            <div id="cart-total-btn"
                className=" border-[1px] border-[#E7E7E7]   md:border-[0px] mt-0 sm:mt-20 w-full left-0 fixed mt-2 sm:relative bottom-0 p-4 sm:p-0  bg-white sm:bg-transparent"
                style={{
                    bottom: `${mobNavHeight}px`,
                    zIndex: 1
                }}
            >


                <div className=" flex justify-center ">
                    {
                        quantityInCart ?
                            <QuantityID value={quantityInCart} pdp={true} disabledPlush={(() => {
                                if (visuals?.inventoryDetails) {
                                    return visuals?.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0 || visuals.inventoryDetails.inventory_quantity <= quantityInCart
                                }
                                return false
                            })()}
                                onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                            :
                            <Button className="w-full md:w-auto py-3 px-12 text-base btn-bg btn-color rounded" style={{ backgroundColor: "#F58634" }} onClick={() => addToCart(productDataForCart)} >ADD TO CART</Button>
                    }
                </div>




            </div>

        </>
    )
}

const mapStateToProps = state => ({
    // Other States
    cart: state.cart,
    wishlist: state.wishlist.list,
})
const mapDispatchToProps = dispatch => ({
    // Cart Dispatch
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    // addToWishlist: (item) => dispatch(addWishlistStart(item)),
    // removeFromWishlist: (item) => dispatch(removeWishlistStart(item)),
    // openAuth: () => dispatch(authShowToggle()),
    // Product Dispatch
    fetchProductDetails: (payload) => dispatch(productDetailsFetchStart(payload)),
    fetchSimilarProducts: (payload) => dispatch(similarProductFetchStart(payload)),
    getAdditionalInfo: (payload) => dispatch(getAdditionalInfoStart(payload)),
    getSpecifications: (payload) => dispatch(getSpecificationsStart(payload)),
    addWishlist: (payload) => dispatch(addWishlistStart(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(ProductDetails));




