import { connect } from "react-redux";
import Link from "@components/link";
import { addToCart, removeFromCart, deleteItemFromCart } from "../../redux/cart/cart-actions";
import { QuantityID } from "../inputs";
import Rating from "@components/rating-stars/rating";

const CartItem = ({ addToCart, removeFromCart, data, }) => {

    return (
        <div className="w-100 block  ">
            <div className="grid grid-cols-12 gap-4 mb-6 mt-2 ">
                <div className="col-span-3 md:col-span-2  flex sm:space-x-4">
                    <Link href={`/product/${data.item_id}`}>
                        <a className="  block">
                            <div className=" flex w-max ">
                                <img className="hidden md:block w-4 h-4" src="/img/square.png" />
                                <img className="w-[100px] h-[100px] md:w-20 md:h-20 md:mx-4 mx-2 border-[2px] md:border-[0px] border-[#E7E7E7] md:border-[transparent]  object-cover rounded-md" src={data.primary_img || '/img/default.png'} alt="product" />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="lg:col-span-1 md:col-span-2 ">
                </div>
                <div className="col-span-8 lg:col-span-9 md:col-span-9 sm:col-span-9">
                    <Link href={`/product/${data.item_id}`}>
                        <a className="block">
                            <h3 className=" lg:text-base text-sm capitalize cart-item-title">{data.item_name.toLowerCase()}</h3>
                        </a>
                    </Link>
                    {/* <div className="flex md:block w-full justify-between items-center">
                        <Rating value={4.5} count={5.0} size={20} />
                        <img className=" md:hidden w-4 h-4" src="/img/square.png" />
                    </div> */}
                    <div className="flex justify-between items-center ">
                        <div className="lg:col-span-5">
                            <div className="flex flex-col justify-between ">
                                <div>
                                    <span className="font-medium black-color-75  text-base sm:text-xl inline-block sm:mr-2">₹{data.sale_price}</span>
                                    {
                                        data.sale_price != data.price &&
                                        <span className=" text-base sm:text-base black-color-50 line-through ml-4 lg:ml-0 xl:ml-4 inline-block">₹{data.price}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="hidden md:flex  flex-col sm:flex-row justify-between w-full h-full items-end sm:items-center ">
                                <div>
                                    <QuantityID value={data.quantity} pdp={true} disabledPlush={(() => {
                                        if (data.inventoryDetails) {
                                            return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                                        }
                                        return false
                                    })()}
                                        onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-between col-span-12 space-x-4  w-full h-10 md:hidden items-center">
                    <div>
                        <QuantityID value={data.quantity} pdp={true} h={`36px`} border={'1px solid #CDCDCD'} bgColor={'white'} disabledPlush={(() => {
                            if (data.inventoryDetails) {
                                return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                            }
                            return false
                        })()}
                            onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} />
                    </div>
                    <div className="border-[1px] border-[#CDCDCD] flex  items-center rounded  ">
                        <svg className="ml-2 mr-1" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0.09375C7.01884 0.093716 7.51802 0.292221 7.89514 0.648545C8.27227 1.00487 8.49875 1.492 8.52812 2.01L8.53125 2.125H11.8125C11.9313 2.12504 12.0456 2.17015 12.1324 2.25123C12.2192 2.33231 12.2719 2.44331 12.28 2.5618C12.2881 2.68029 12.2509 2.79743 12.176 2.88956C12.101 2.98169 11.9939 3.04194 11.8762 3.05812L11.8125 3.0625H11.315L10.515 11.2C10.4749 11.6057 10.2919 11.9839 9.99874 12.2672C9.70554 12.5504 9.32121 12.7202 8.91437 12.7462L8.80437 12.75H4.19562C3.78779 12.75 3.39324 12.6049 3.0825 12.3408C2.77176 12.0767 2.56507 11.7106 2.49937 11.3081L2.485 11.1994L1.68437 3.0625H1.1875C1.07423 3.06249 0.964786 3.02147 0.879418 2.94702C0.79405 2.87257 0.73853 2.76972 0.723125 2.6575L0.71875 2.59375C0.718755 2.48048 0.759777 2.37104 0.834229 2.28567C0.908682 2.2003 1.01153 2.14478 1.12375 2.12937L1.1875 2.125H4.46875C4.46875 1.58628 4.68276 1.06962 5.06369 0.688689C5.44462 0.307756 5.96128 0.09375 6.5 0.09375ZM10.3731 3.0625H2.62625L3.41812 11.1075C3.43566 11.287 3.51476 11.4549 3.64201 11.5827C3.76926 11.7106 3.93682 11.7904 4.11625 11.8087L4.19562 11.8125H8.80437C9.17937 11.8125 9.4975 11.5469 9.57 11.1862L9.5825 11.1075L10.3725 3.0625H10.3731ZM7.59375 4.78125C7.70702 4.78125 7.81646 4.82228 7.90183 4.89673C7.9872 4.97118 8.04272 5.07403 8.05812 5.18625L8.0625 5.25V9.625C8.06246 9.74376 8.01735 9.85809 7.93627 9.94487C7.85519 10.0317 7.74419 10.0844 7.6257 10.0925C7.50721 10.1006 7.39007 10.0634 7.29794 9.98848C7.20581 9.91353 7.14556 9.80641 7.12937 9.68875L7.125 9.625V5.25C7.125 5.12568 7.17439 5.00645 7.26229 4.91854C7.3502 4.83064 7.46943 4.78125 7.59375 4.78125ZM5.40625 4.78125C5.51952 4.78125 5.62896 4.82228 5.71433 4.89673C5.7997 4.97118 5.85522 5.07403 5.87062 5.18625L5.875 5.25V9.625C5.87496 9.74376 5.82985 9.85809 5.74877 9.94487C5.66769 10.0317 5.55669 10.0844 5.4382 10.0925C5.31971 10.1006 5.20257 10.0634 5.11044 9.98848C5.01831 9.91353 4.95806 9.80641 4.94187 9.68875L4.9375 9.625V5.25C4.9375 5.12568 4.98689 5.00645 5.07479 4.91854C5.1627 4.83064 5.28193 4.78125 5.40625 4.78125ZM6.5 1.03125C6.22551 1.03126 5.96105 1.13448 5.75913 1.32042C5.55721 1.50637 5.43259 1.76144 5.41 2.035L5.40625 2.125H7.59375C7.59375 1.83492 7.47852 1.55672 7.2734 1.3516C7.06828 1.14648 6.79008 1.03125 6.5 1.03125Z" fill="#313031" />
                        </svg>
                        <p className="font-thin text-sm mr-2  ml-1 py-2">Remove</p>
                    </div>
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

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
})

export default connect(null, mapDispatchToProps)(CartItem);
