import { connect } from "react-redux";
import { QuantityID, Button } from "../inputs";
// import Rating from '../rating-stars/rating'

import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";

const ProductItem = ({ data, addToCart, removeFromCart, cart }) => {
    if (!data) {
        return (
            <div className="h-full  flex border-gray-200 rounded-lg overflow-hidden">
                <div className=" w-32 h-32 sm:w-40 sm:h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
                <div className="px-6 pt-6">
                    <h1 className="w-1/2 mb-3 sm:mb-4 h-4 sm:h-6 animate-pulse bg-gray-500"></h1>
                    <h2 className="bg-gray-400 animate-pulse h-3 sm:h-4 w-1/4 mb-2"></h2>
                    <p className="leading-relaxed mb-3 w-full h-2 sm:h-3 animate-pulse bg-gray-400"></p>
                    <div className="block items-center flex-wrap ">
                        <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-52 inline-flex items-center md:mb-2 lg:mb-0">

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
                itemInCart?.quantity ?
                    <QuantityID value={itemInCart.quantity} disabledPlush={(() => {
                        if (itemInCart.inventoryDetails) {
                            return itemInCart.inventoryDetails.max_order_quantity == itemInCart.quantity && itemInCart.inventoryDetails.max_order_quantity > 0 || itemInCart.inventoryDetails.inventory_quantity <= itemInCart.quantity
                        }
                        return false
                    })()}
                        onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                    :
                    <Button className={`btn-color btn-bg max-h-min text-base font-medium rounded py-2.5 px-9 sm:py-3 sm:px-12 ${className}`} onClick={() => addToCart(productDataForCart)} >Add</Button>
            }
        </>
    )
    return (
        <>
            <div className="w-100 block product-item">
                <div className="flex flex-row justify-between space-x-4 w-full">
                    <div>
                        <div className="flex w-full relative">
                            {/* <Button className="block relative product-item-img w-40 h-40 shrink-0" type="link" href={`/product/${data.item_id}`}>
                                        <img className="rounded-md w-full h-full object-cover" src={`${data.primary_img || '/img/default.png'}`} alt={`${data.item_name}`} />
                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-1">
                                            <LocalQuantityID />
                                        </div>
                                    </Button> */}
                            <div className="mb-5 md:mb-0 block relative product-item-img w-32 h-32 min-w-min sm:w-40 sm:h-40 shrink-0">
                                <Button className="block " type="link" href={`/product/${data.item_id}`} style={{ height: '-webkit-fill-available' }}>
                                    <img className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-300 rounded-md  object-cover" src={`${data.primary_img || '/img/default.png'}`} alt={`${data.item_name}`} />
                                </Button>
                                <div className="block lg:hidden absolute left-1/2 -translate-x-1/2 -bottom-5 rounded bg-white">
                                    <LocalQuantityID />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between pl-4 ">
                                <h3 className="capitalize text-sm sm:text-xl cart-item-title product-item-truncate">
                                    <Button className=" capitalize" type="link" href={`/product/${data.item_id}`}>
                                        {data.item_name.toLowerCase()}
                                    </Button>
                                </h3>
                                {/* <Rating size={16} /> */}
                                <div className="te leading-3">
                                    <h2 className="font-bold black-color text-sm sm:text-2xl inline-block">₹{data.sale_price}</h2>
                                    <span className="text-xs sm:text-lg black-color-50 line-through ml-2 md:ml-4 inline-block">₹{data.price}</span>
                                    <span className="text-xs sm:text-lg success-color line-through ml-2 md:ml-4 inline-block">Save ₹ {data.price - data.sale_price}</span>
                                </div>
                                <div>
                                    <span className="text-xs sm:text-base black-color-75 tracking-tight leading-4 md:leading-6 product-item-truncate ">{data.item_desc}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-32 shrink-0 hidden lg:flex items-center ">
                        <LocalQuantityID />
                    </div>
                </div>
                {
                    !!itemInCart.inventoryDetails && <>
                        {
                            itemInCart.inventoryDetails.min_order_quantity > 1 &&
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
    cart: state.cart
})
const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
