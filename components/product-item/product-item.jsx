import { useRef, useState } from "react";
import { connect } from "react-redux";
import { QuantityID, Button } from "../inputs";
import Router from 'next/router'
// import Rating from '../rating-stars/rating'

import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
import { AiOutlineHeart, AiFillStar, AiFillHeart } from 'react-icons/ai'
import { addWishlistStart, removeWishlistStart } from "@redux/wishlist/wishlist-action";
import { toast } from "react-toastify";
import { authShowToggle } from "@redux/user/user-action";
import { useEffect } from "react";



const ProductItem = ({ openAuth, className, store, data, user, addToCart, removeFromCart, cart, offer, addItemToWishlist, removeWishlistStart, isWishlistNeeded }) => {
    const tip = useRef(null)
    const [wishlistAdded, setWishListAdded] = useState(data?.wishlistId)
    const [productItemImg, setProductItemImg] = useState([])
    useEffect(() => {
        setWishListAdded(data?.wishlistId)

        if(data){

        if (data.is_customizable == "N") {
            setProductItemImg([data.primary_img || '/img/default.png'])
        }
        else {
            var defImg=[]
            if (data.defaultVariantItem != null) {
                for (let i = 1; i <= 5; i++) {
                    if (data.defaultVariantItem[`variant_value_${i}`] != null) {
                        if (data.defaultVariantItem[`variant_value_${i}`].variant_value_images != null) {
                            if(typeof data.defaultVariantItem[`variant_value_${i}`].variant_value_images=='string'){
                                defImg = Object.values(JSON.parse(data.defaultVariantItem[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                            }
                            else if(typeof data.defaultVariantItem[`variant_value_${i}`].variant_value_images=='object'){
                                defImg = Object.values(data.defaultVariantItem[`variant_value_${i}`].variant_value_images).filter(Boolean);
                            }
                            
                        }
                    }

                }
            }
            // const defImg = Object.values(success?.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? success.defaultVariantItem?.variant_value_1?.variant_value_images : '').filter(Boolean)
            if (defImg.length != 0) {
                setProductItemImg(defImg)
            }
            else if(data.primary_img){
                setProductItemImg([data.primary_img])
            }
            else if(data.img_url_1){
                setProductItemImg([data.img_url_1])
            }
             else {
                setProductItemImg(['/img/default.png'])
                // images = ['/img/default.png']
            }
        }
    }
    }, [data])
    const wishlist = () => {
        if (!user.currentUser) {
            // toast.error("Please Sign in First", {
            //     autoClose: 2000
            // })
            openAuth()
        }
        else {
            const payload = {
                id: Number(data.item_id),
                storeId: store.store_id,
                userId: user.currentUser.customer_id,
                setWishListAdded: setWishListAdded
            }
            addItemToWishlist(payload)
        }
    }

    const removeFromWishList = (wishlistid) => {

        const payload = {
            wishlistId: wishlistid,
            setWishListAdded: setWishListAdded
        }
        removeWishlistStart(payload)

    }
    const tipFun = (e) => {
        let x = e.clientX, y = e.clientY;
        if (tip.current) {
            tip.current.style.top = (y - 10) + 'px';
            tip.current.style.left = (x + 10) + 'px';
        }
    };
    if (!data) {
        return (
            <div className={`h-full border-gray-200 rounded-lg overflow-hidden ${className}`}>
                <div className=" w-32 h-32 sm:w-40 sm:h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
                <div className="pl-0 px-6 pt-6">
                    <h1 className="w-1/2 mb-3 sm:mb-4 h-4 sm:h-6 animate-pulse bg-gray-500"></h1>
                    <h2 className="bg-gray-400 animate-pulse h-3 sm:h-4 w-1/4 mb-2"></h2>
                    <p className="leading-relaxed mb-3 w-full h-2 sm:h-3 animate-pulse bg-gray-400"></p>
                    <div className="block items-center flex-wrap ">
                        <a className="bg-indigo-300 h-4 py-6 animate-pulse mt-2 w-full inline-flex items-center md:mb-2 lg:mb-0">

                        </a>

                    </div>
                </div>
            </div>
        )
    }
    const itemInCart = cart.find((item) => (item.item_id == data.item_id)) || {}
    const productDataForCart = {
        item_id: Number(data.item_id),
        store_id: data.store_id,
        category_id: data.category_id,
        item_name: data.item_name,
        sale_price: data.sale_price,
        price: data.price,
        sub_category_id: data.sub_category_id,
        primary_img: data.primary_img,
        is_veg: data.is_veg,
        inventoryDetails: data.inventoryDetails,
    }
    const LocalQuantityID = ({ className }) => (
        // This component used two times
        <>
            {

                <>
                    {
                        data.is_customizable == "N" ?
                            itemInCart?.quantity ?
                                <QuantityID value={itemInCart.quantity} disabledPlush={(() => {
                                    if (itemInCart.inventoryDetails) {
                                        return itemInCart.inventoryDetails.max_order_quantity == itemInCart.quantity && itemInCart.inventoryDetails.max_order_quantity > 0 || itemInCart.inventoryDetails.inventory_quantity <= itemInCart.quantity
                                    }
                                    return false
                                })()}
                                    onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                                :

                                <Button className={`btn-color w-full btn-bg max-h-min text-xs sm:text-base font-medium rounded py-3  ${className}`} onClick={() => addToCart(productDataForCart)} >ADD TO CART</Button>

                            :
                            <p onClick={() => Router.push(`/product/${data.item_id}`)} className={`btn-color w-full btn-bg max-h-min text-xs sm:text-base font-medium rounded py-3 text-center cursor-pointer`} >View</p>
                    }
                </>
            }
        </>
    )
    return (
        <>
            <div className={`flex flex-col  items-stretch justify-between border-[#B6B6B6] h-full w-[160px] md:w-[221.85px] product-item w-max hover:sca ${className}`}>
                <div className="tooltip block relative bg-white border rounded-sm h-[220px] md:h-[264.49px]">
                    {data?.is_veg == 'Y' &&
                        <img className="w-4 h-4 top-2 left-2 absolute" src="/img/veg.svg" />
                    }
                    {isWishlistNeeded?
                    wishlistAdded ? <AiFillHeart className="w-4 h-4 top-2 right-2 absolute text-[#F35252] hover:text-[#F35252] hover:scale-150 transition-all bg-white  rounded-[50%]" size={18} value={{ color: 'blue' }} onClick={() => removeFromWishList(wishlistAdded)} />
                        :
                        <AiOutlineHeart onClick={wishlist} className="w-4 h-4 top-2 right-2 absolute hover:text-[#F35252] hover:scale-150 transition-all bg-white rounded-[50%]" size={18} />
                        :""
                        }

                    <Button type="link" href={`/product/${data.item_id}`} style={{ height: '-webkit-fill-available' }}>
                        <a onMouseMove={tipFun} >
                            {/* <div className="w-8/12 mx-8 md:mx-10  md:mt-6 cursor-pointer " style={{ height: '160px' }}> */}
                            {console.log("img", data.defaultVariantItem?.variant_value_1?.variant_value_images)}
                            {/* <img className="w-full h-full object-cover" src={data.primary_img ? data.primary_img : data.defaultVariantItem ? data.defaultVariantItem?.variant_value_1?.variant_value_images != null ? JSON.parse(data.defaultVariantItem?.variant_value_1?.variant_value_images).img_url_1 : '/img/default.png' : '/img/default.png'} /> */}
                            <img className="w-full h-full object-cover" src={productItemImg[0]} />
                            {/* </div> */}
                            {
                                data.item_name.length > 40 &&
                                <span ref={tip} className="tooltiptext">
                                    {data.item_name}
                                </span>
                            }
                        </a>
                    </Button>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <div className="flex justify-start items-baseline h-full my-2  w-full ">
                        <div className="flex">
                            <p className="font-bold text-sm md:text-lg">{store.currency_symbol} {data.sale_price}</p>
                            {
                                data.sale_price != data.price && <span className="text-gray-400 font-thinner text-xs ml-2 flex items-center line-through"> (MRP {data.price})</span>
                            }

                        </div>
                        {/* <div className=" hidden md:flex">
                            <p className=" text-sm flex items-center">4.5</p>
                            <div className="flex items-center">
                                <AiFillStar color="orange" />
                            </div>
                        </div> */}
                    </div>
                    <div >
                        <p className="text-sm capitalize font-semibold line-truncate-2">
                            {data.item_name?.toLowerCase()}
                        </p>
                    </div>
                </div>
                <div className="my-2 w-full ">
                    <LocalQuantityID />
                </div>
                {
                    !!itemInCart.inventoryDetails && <>
                        {
                            itemInCart.inventoryDetails.min_order_quantity >= 1 &&  itemInCart.quantity>=1 &&
                            <div className="">
                                <span className="text-sm red-color">*Minimum order quantity is {itemInCart.inventoryDetails.min_order_quantity}.</span>
                            </div>
                        } {
                            itemInCart.inventoryDetails.max_order_quantity == itemInCart.quantity && itemInCart.inventoryDetails.max_order_quantity > 0 || itemInCart.inventoryDetails.inventory_quantity <= itemInCart.quantity &&
                            <div className="">
                                <span className="text-sm success-color">*You reached to maximum order quantity.</span>
                            </div>
                        }
                    </>
                }
            </div>

        </>
    )
}
const mapStateToProps = state => ({
    cart: state.cart,
    user: state.user,
    store: state.store.info,

})
const mapDispatchToProps = dispatch => ({
    openAuth: () => dispatch(authShowToggle()),
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    addItemToWishlist: (item) => dispatch(addWishlistStart(item)),
    removeWishlistStart: (data) => dispatch(removeWishlistStart(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
