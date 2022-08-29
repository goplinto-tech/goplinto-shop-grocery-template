import { connect } from "react-redux";
import Link from "@components/link";
import { addToCart, removeFromCart, deleteItemFromCart } from "@redux/cart/cart-actions";
import { QuantityID } from "../inputs";
import Rating from "@components/rating-stars/rating";
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { deleteFromPurchaseStart } from "@redux/checkout/checkout-action";
import { useEffect } from "react";
import { useState } from "react";

const CartItem = ({ addToCart, removeFromCart, data, deleteItemFromCart, deleteFromPurchase, isDetailsLoading }) => {
    console.log("cart item", data)
    const [cartItemImg, setCartItemImg] = useState([])
    useEffect(() => {
        var img = []
        if (data.defaultVariantItem != null) {
            if (data.defaultVariantItem.variant_item_attributes) {
                console.log("images taking from: data.defaultVariantItem.variant_item_attributes")
                for (let i = 1; i <= Object.keys(data.defaultVariantItem.variant_item_attributes).length; i++) {
                    if (data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`] != null) {
                        if (data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`].variant_value_images != null) {
                            if (typeof data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'object') {
                                img = Object.values(data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`].variant_value_images).filter(Boolean);
                                setCartItemImg(img)
                            }
                            else if (typeof data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'string') {
                                img = Object.values(JSON.parse(data.defaultVariantItem.variant_item_attributes[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                                setCartItemImg(img)
                            }
                        }
                    }

                }
                if (!img.length) {
                    img = ['/img/default.png']
                    setCartItemImg(img)
                }

            }
            else {
                console.log("images taking from: data.defaultVariantItem")
                for (let i = 1; i <= 5; i++) {
                    if (data.defaultVariantItem[`variant_value_${i}`] != null) {
                        if (data.defaultVariantItem[`variant_value_${i}`].variant_value_images != null) {
                            if (typeof data.defaultVariantItem[`variant_value_${i}`].variant_value_images == 'string') {
                                img = Object.values(JSON.parse(data.defaultVariantItem[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                                setCartItemImg(img)
                            }
                            else if (typeof data.defaultVariantItem[`variant_value_${i}`].variant_value_images == 'object') {
                                img = Object.values(data.defaultVariantItem[`variant_value_${i}`].variant_value_images).filter(Boolean);
                                setCartItemImg(img)
                            }
                        }
                    }

                }
                if (!img.length) {
                    img = ['/img/default.png']
                    setCartItemImg(img)
                }
            }
        }
        else {
            console.log("images taking from: data")
            img = [data.primary_img || '/img/default.png']
            setCartItemImg(img)
        }

    }, [data])
    console.log("cart item img", cartItemImg)
    return (
        <div className="w-100 block space-y-3">
            <div className="flex justify-between space-x-6">
                <Link href={`/product/${data.item_id}`}>
                    <a className="block w-24 h-24 md:w-40 md:h-40 relative">
                        <span className=" absolute">

                        </span>
                        {/* <img className="w-full h-full object-cover" src={data.defaultVariantItem ? Object.keys(data.defaultVariantItem).length && data?.defaultVariantItem?.variant_value_1?.variant_value_images != null ? data?.defaultVariantItem?.variant_value_1?.variant_value_images.img_url_1 : '/img/default.png' : data.primary_img ? data.primary_img : '/img/default.png'} alt="product" /> */}
                        <img className="w-full h-full object-cover" src={cartItemImg[0]} alt="product" />
                        {data.is_veg=='Y' && <img className="w-4 h-4 top-2 left-2 absolute" src="/img/veg.svg" />}
                    </a>
                </Link>
                <div className="flex-1 space-y-2 md:space-y-4 mt-0 md:mt-4">
                    <Link href={`/product/${data.item_id}`}>
                        <a className="block">
                            <h3 className=" lg:text-base text-sm capitalize cart-item-title line-truncate-2">{data.item_name.toLowerCase()}</h3>
                        </a>
                    </Link>
                    {data.defaultVariantItem && data?.defaultVariantItem?.variant_item_attributes ? <p>{data?.defaultVariantItem?.variant_item_attributes && Object.keys(data?.defaultVariantItem?.variant_item_attributes).map(function (key) {
                        if (key.includes('variant_value')) {
                            if (data?.defaultVariantItem?.variant_item_attributes[key] != null) {
                                return <span>{data?.defaultVariantItem?.variant_item_attributes[key].variant_value_name}, </span>
                            }
                        }
                    })}</p> :
                        <p>{data?.defaultVariantItem && Object.keys(data?.defaultVariantItem).map(function (key) {
                            if (key.includes('variant_value')) {
                                if (data?.defaultVariantItem[key] != null) {
                                    return <span>{data?.defaultVariantItem[key].variant_value_name}, </span>
                                }
                            }
                        })}</p>
                    }
                    <div className="flex justify-between items-center ">
                        <div className="lg:col-span-5">
                            <div className="">
                                <span className="font-medium black-color-75  text-base sm:text-xl inline-block sm:mr-2">₹{data.defaultVariantItem ? data.defaultVariantItem.sale_price : data.sale_price}</span>
                                {
                                    data.defaultVariantItem ?
                                        data.defaultVariantItem.sale_price != data.defaultVariantItem.list_price &&
                                        <span className=" text-base sm:text-base black-color-50 line-through ml-4 lg:ml-0 xl:ml-4 inline-block">(MRP ₹{data.defaultVariantItem.list_price})</span>
                                        :
                                        data.sale_price != data.price &&
                                        <span className=" text-base sm:text-base black-color-50 line-through ml-4 lg:ml-0 xl:ml-4 inline-block">(MRP ₹{data.price})</span>
                                }
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="hidden md:flex  flex-col sm:flex-row justify-between w-full h-full items-end sm:items-center ">
                                <div>
                                    <QuantityID value={data.quantity} pdp={true} h={'44px'} disabledPlush={(() => {
                                        if (data.inventoryDetails) {
                                            return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                                        }
                                        return false
                                    })()}
                                        onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} disabled={isDetailsLoading} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {!data.isOrderItemValid && <div>
                        {data.invalidReason && <p className="text-sm text-red-600 ">Currently Unavailable</p>}
                        {data.invalidReason && <p className="text-xs text-red-600">(please remove this item to proceed)*</p>}
                    </div>}
                </div>

                <div className="w-10 hidden md:flex justify-end items-start">
                    <button disabled={isDetailsLoading} className=" w-fit h-fit  " onClick={(e) => { deleteItemFromCart(data) }}
                    style={{
                        ...isDetailsLoading &&{
                            opacity:0.7,
                            cursor:"not-allowed"
                        }
                    }} 
                    >
                        <div className="border-[1px] border-[#CDCDCD] flex md:hidden items-center rounded">
                            <svg className="ml-2 mr-1" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 0.09375C7.01884 0.093716 7.51802 0.292221 7.89514 0.648545C8.27227 1.00487 8.49875 1.492 8.52812 2.01L8.53125 2.125H11.8125C11.9313 2.12504 12.0456 2.17015 12.1324 2.25123C12.2192 2.33231 12.2719 2.44331 12.28 2.5618C12.2881 2.68029 12.2509 2.79743 12.176 2.88956C12.101 2.98169 11.9939 3.04194 11.8762 3.05812L11.8125 3.0625H11.315L10.515 11.2C10.4749 11.6057 10.2919 11.9839 9.99874 12.2672C9.70554 12.5504 9.32121 12.7202 8.91437 12.7462L8.80437 12.75H4.19562C3.78779 12.75 3.39324 12.6049 3.0825 12.3408C2.77176 12.0767 2.56507 11.7106 2.49937 11.3081L2.485 11.1994L1.68437 3.0625H1.1875C1.07423 3.06249 0.964786 3.02147 0.879418 2.94702C0.79405 2.87257 0.73853 2.76972 0.723125 2.6575L0.71875 2.59375C0.718755 2.48048 0.759777 2.37104 0.834229 2.28567C0.908682 2.2003 1.01153 2.14478 1.12375 2.12937L1.1875 2.125H4.46875C4.46875 1.58628 4.68276 1.06962 5.06369 0.688689C5.44462 0.307756 5.96128 0.09375 6.5 0.09375ZM10.3731 3.0625H2.62625L3.41812 11.1075C3.43566 11.287 3.51476 11.4549 3.64201 11.5827C3.76926 11.7106 3.93682 11.7904 4.11625 11.8087L4.19562 11.8125H8.80437C9.17937 11.8125 9.4975 11.5469 9.57 11.1862L9.5825 11.1075L10.3725 3.0625H10.3731ZM7.59375 4.78125C7.70702 4.78125 7.81646 4.82228 7.90183 4.89673C7.9872 4.97118 8.04272 5.07403 8.05812 5.18625L8.0625 5.25V9.625C8.06246 9.74376 8.01735 9.85809 7.93627 9.94487C7.85519 10.0317 7.74419 10.0844 7.6257 10.0925C7.50721 10.1006 7.39007 10.0634 7.29794 9.98848C7.20581 9.91353 7.14556 9.80641 7.12937 9.68875L7.125 9.625V5.25C7.125 5.12568 7.17439 5.00645 7.26229 4.91854C7.3502 4.83064 7.46943 4.78125 7.59375 4.78125ZM5.40625 4.78125C5.51952 4.78125 5.62896 4.82228 5.71433 4.89673C5.7997 4.97118 5.85522 5.07403 5.87062 5.18625L5.875 5.25V9.625C5.87496 9.74376 5.82985 9.85809 5.74877 9.94487C5.66769 10.0317 5.55669 10.0844 5.4382 10.0925C5.31971 10.1006 5.20257 10.0634 5.11044 9.98848C5.01831 9.91353 4.95806 9.80641 4.94187 9.68875L4.9375 9.625V5.25C4.9375 5.12568 4.98689 5.00645 5.07479 4.91854C5.1627 4.83064 5.28193 4.78125 5.40625 4.78125ZM6.5 1.03125C6.22551 1.03126 5.96105 1.13448 5.75913 1.32042C5.55721 1.50637 5.43259 1.76144 5.41 2.035L5.40625 2.125H7.59375C7.59375 1.83492 7.47852 1.55672 7.2734 1.3516C7.06828 1.14648 6.79008 1.03125 6.5 1.03125Z" fill="#313031" />
                            </svg>
                            <p className="font-thin text-sm mr-2 ml-1 py-2">Remove</p>

                        </div>
                        <p className="font-thin text-sm mr-2  ml-1 hidden md:block py-2">
                            <IoIosCloseCircleOutline className={`${isDetailsLoading?"cursor-not-allowed":"cursor-pointer"} hidden md:block`} size={20} />
                        </p>
                    </button>
                </div>
            </div>
            <div className="w-full md:hidden flex justify-between items-center">
                <div>
                    <QuantityID value={data.quantity} pdp={true} h={'44px'} disabledPlush={(() => {
                        if (data.inventoryDetails) {
                            return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                        }
                        return false
                    })()}
                        onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} disabled={isDetailsLoading}/>
                </div>
                <div className=" w-fit h-fit  ">
                    <button disabled={isDetailsLoading} onClick={(e) => { deleteItemFromCart(data) }} className="border-[1px] border-[#CDCDCD] flex md:hidden items-center rounded"
                    style={{
                        ...isDetailsLoading &&{
                            opacity:0.7,
                            cursor:"not-allowed"
                        }
                    }} 
                    >
                        <svg className="ml-2 mr-1" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0.09375C7.01884 0.093716 7.51802 0.292221 7.89514 0.648545C8.27227 1.00487 8.49875 1.492 8.52812 2.01L8.53125 2.125H11.8125C11.9313 2.12504 12.0456 2.17015 12.1324 2.25123C12.2192 2.33231 12.2719 2.44331 12.28 2.5618C12.2881 2.68029 12.2509 2.79743 12.176 2.88956C12.101 2.98169 11.9939 3.04194 11.8762 3.05812L11.8125 3.0625H11.315L10.515 11.2C10.4749 11.6057 10.2919 11.9839 9.99874 12.2672C9.70554 12.5504 9.32121 12.7202 8.91437 12.7462L8.80437 12.75H4.19562C3.78779 12.75 3.39324 12.6049 3.0825 12.3408C2.77176 12.0767 2.56507 11.7106 2.49937 11.3081L2.485 11.1994L1.68437 3.0625H1.1875C1.07423 3.06249 0.964786 3.02147 0.879418 2.94702C0.79405 2.87257 0.73853 2.76972 0.723125 2.6575L0.71875 2.59375C0.718755 2.48048 0.759777 2.37104 0.834229 2.28567C0.908682 2.2003 1.01153 2.14478 1.12375 2.12937L1.1875 2.125H4.46875C4.46875 1.58628 4.68276 1.06962 5.06369 0.688689C5.44462 0.307756 5.96128 0.09375 6.5 0.09375ZM10.3731 3.0625H2.62625L3.41812 11.1075C3.43566 11.287 3.51476 11.4549 3.64201 11.5827C3.76926 11.7106 3.93682 11.7904 4.11625 11.8087L4.19562 11.8125H8.80437C9.17937 11.8125 9.4975 11.5469 9.57 11.1862L9.5825 11.1075L10.3725 3.0625H10.3731ZM7.59375 4.78125C7.70702 4.78125 7.81646 4.82228 7.90183 4.89673C7.9872 4.97118 8.04272 5.07403 8.05812 5.18625L8.0625 5.25V9.625C8.06246 9.74376 8.01735 9.85809 7.93627 9.94487C7.85519 10.0317 7.74419 10.0844 7.6257 10.0925C7.50721 10.1006 7.39007 10.0634 7.29794 9.98848C7.20581 9.91353 7.14556 9.80641 7.12937 9.68875L7.125 9.625V5.25C7.125 5.12568 7.17439 5.00645 7.26229 4.91854C7.3502 4.83064 7.46943 4.78125 7.59375 4.78125ZM5.40625 4.78125C5.51952 4.78125 5.62896 4.82228 5.71433 4.89673C5.7997 4.97118 5.85522 5.07403 5.87062 5.18625L5.875 5.25V9.625C5.87496 9.74376 5.82985 9.85809 5.74877 9.94487C5.66769 10.0317 5.55669 10.0844 5.4382 10.0925C5.31971 10.1006 5.20257 10.0634 5.11044 9.98848C5.01831 9.91353 4.95806 9.80641 4.94187 9.68875L4.9375 9.625V5.25C4.9375 5.12568 4.98689 5.00645 5.07479 4.91854C5.1627 4.83064 5.28193 4.78125 5.40625 4.78125ZM6.5 1.03125C6.22551 1.03126 5.96105 1.13448 5.75913 1.32042C5.55721 1.50637 5.43259 1.76144 5.41 2.035L5.40625 2.125H7.59375C7.59375 1.83492 7.47852 1.55672 7.2734 1.3516C7.06828 1.14648 6.79008 1.03125 6.5 1.03125Z" fill="#313031" />
                        </svg>
                        <p className="font-thin text-sm mr-2 ml-1 py-2">Remove</p>

                    </button>
                    <p className="font-thin text-sm mr-2  ml-1 hidden md:block py-2">
                        <IoIosCloseCircleOutline className="cursor-pointer hidden md:block" size={20} />
                    </p>
                </div>
            </div>
            {
                !!data.inventoryDetails && <>
                    {
                        data.inventoryDetails.min_order_quantity > 1 &&
                        <div className="">
                            <span className="text-sm red-color">*Minimum order quantity is {data.inventoryDetails.min_order_quantity}.</span>
                        </div>
                    } {
                        data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity &&
                        <div className="">
                            <span className="text-sm success-color">*You reached to maximum order quantity.</span>
                        </div>
                    }
                </>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    isDetailsLoading: state.ui.isDetailsLoading,
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    deleteItemFromCart: (item) => dispatch(deleteItemFromCart(item)),
    deleteFromPurchase: (item) => dispatch(deleteFromPurchaseStart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
