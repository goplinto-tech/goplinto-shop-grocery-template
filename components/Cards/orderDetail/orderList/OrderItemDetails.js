import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { Button } from '../../../inputs'
const OrderItemDetails = ({ item,info }) => {
    console.log(item)
    const [orderItemImg, setOrderItemImg] = useState([])
    useEffect(() => {
        var img = []
        if (item.customizationDetails != null) {
            if (item.customizationDetails.variant_item_attributes) {
                console.log("images taking from: data.defaultVariantItem.variant_item_attributes")
                for (let i = 1; i <= Object.keys(item.customizationDetails.variant_item_attributes).length; i++) {
                    if (item.customizationDetails.variant_item_attributes[`variant_value_${i}`] != null) {
                        if (item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images != null) {
                            if (typeof item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'string') {
                                img = Object.values(JSON.parse(item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                                setOrderItemImg(img)
                            }
                            else if (typeof item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images == 'object') {
                                img = Object.values(item.customizationDetails.variant_item_attributes[`variant_value_${i}`].variant_value_images).filter(Boolean);
                                setOrderItemImg(img)
                            }
                        }
                    }

                }
                if (!img.length) {
                    img = ['/img/default.png']
                    setOrderItemImg(img)
                }

            }
            else {
                console.log("images taking from: data.defaultVariantItem")
                for (let i = 1; i <= 5; i++) {
                    if (item.customizationDetails[`variant_value_${i}`] != null) {
                        if (item.customizationDetails[`variant_value_${i}`].variant_value_images != null) {
                            if(typeof item.customizationDetails[`variant_value_${i}`].variant_value_images=='string'){
                            img = Object.values(JSON.parse(item.customizationDetails[`variant_value_${i}`].variant_value_images)).filter(Boolean);
                            setOrderItemImg(img)
                            }
                            else if(typeof item.customizationDetails[`variant_value_${i}`].variant_value_images=='object'){
                            img = Object.values(item.customizationDetails[`variant_value_${i}`].variant_value_images).filter(Boolean);
                            setOrderItemImg(img)
                            }
                        }
                    }

                }
                if (!img.length) {
                    img = ['/img/default.png']
                    setOrderItemImg(img)
                }
            }
        }
        else {
            console.log("images taking from: data")
            img = [item.itemImg || '/img/default.png']
            setOrderItemImg(img)
        }

    }, [item])
    return (
        <div className=" rounded bg-white flex justify-start space-x-4 mt-2 sm:mt-0 p-0 sm:p-4 items-center px-4 sm:px-6">
            <Button className="mt-2 rounded bg-gray-900 md:w-[131px] md:h-[131px] w-20 h-20 shrink-0 block" type='link' href={`/product/${item.itemId}`}>
                <img className="w-full h-full rounded object-cover opacity-80" src={orderItemImg[0]} />
                {/* <img className="w-full h-full rounded object-cover opacity-80" src={item.customizationDetails ? Object.keys(item.customizationDetails.variant_item_attributes).length && item?.customizationDetails?.variant_item_attributes?.variant_value_1?.variant_value_images != null ? item?.customizationDetails?.variant_item_attributes?.variant_value_1?.variant_value_images?.img_url_1 : '/img/default.png' : item.itemImg ? item.itemImg : '/img/default.png'} /> */}
            </Button>
            <div className="   items-center space-y-4 ">
                <Button type='link' href={`/product/${item.itemId}`}>
                    <p className="text-left font-semibold truncate-2 text-base text-dark mt-2 ">{item.itemName}</p>
                </Button>
                {item.customizationDetails && <p>{item?.customizationDetails?.variant_item_attributes && Object.keys(item?.customizationDetails?.variant_item_attributes).map(function (key) {
                    if (key.includes('variant_value')) {
                        if (item?.customizationDetails?.variant_item_attributes[key] != null) {
                            return <span>{item?.customizationDetails?.variant_item_attributes[key].variant_value_name}, </span>
                        }
                    }
                })}</p>}
                <p className="text-left text-lg lg:text-2xl font-bold text-gray-900  ">{info.currency_symbol} {item.discountedOrderItemAmount}</p>
            </div>
        </div>
    );
};

export default OrderItemDetails;