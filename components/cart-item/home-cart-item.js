import { connect } from "react-redux";
import Link from "@components/link";
import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
import { QuantityID } from "../inputs";
const HomeCartItem = ({ addToCart, removeFromCart, data }) => {
    return (
        <div className="w-100 block ">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="col-span-9 sm:col-span-7 flex sm:space-x-4">
                    <div className="flex flex-col justify-between">
                        <h3 className=" text-base capitalize cart-item-title leading-5" style={{
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                            display: '-webkit-box',
                            WebkitBoxOrient: "vertical"
                        }}>{data.item_name.toLowerCase()}</h3>
                        <div>
                            <span className="font-medium black-color-75  text-base inline-block sm:mr-2">₹{data.sale_price}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 sm:col-span-5">
                    <div className="flex flex-col  justify-between w-full h-full items-end space-y-3">
                        <div >
                            <QuantityID h={44} value={data.quantity} disabledPlush={(() => {
                                if (data.inventoryDetails) {
                                    return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                                }
                                return false
                            })()}
                                onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} />
                        </div>
                        <div>
                            <h3 className="font-bold black-color text-base block w-full">₹ {data.quantity * data.sale_price}</h3>
                        </div>
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
    removeFromCart: (item) => dispatch(removeFromCart(item))
})

export default connect(null, mapDispatchToProps)(HomeCartItem);