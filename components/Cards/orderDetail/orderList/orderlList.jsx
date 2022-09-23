import moment from 'moment'
import { Button } from '../../../inputs'
import OrderItemDetails from './OrderItemDetails'

function orderlList({ list, storeName, orderId, createTime, openReturn,info }) {


  return (
    <div className="w-full    ">

      <div>
        {
          list?.map((item, i) => (
            <OrderItemDetails info={info} item={item}/>
            // <div key={i} className=" rounded bg-white flex justify-start space-x-4 mt-2 sm:mt-0 p-0 sm:p-4 items-center px-4 sm:px-6">
            //   <Button className="mt-2 rounded bg-gray-900 md:w-[131px] md:h-[131px] w-20 h-20 shrink-0 block" type='link' href={`/product/${item.orderItemId}`}>
            //     <img className="w-full h-full rounded object-cover opacity-80" src={item.customizationDetails ? Object.keys(item.customizationDetails.variant_item_attributes).length&&item?.customizationDetails?.variant_item_attributes?.variant_value_1?.variant_value_images !=null ? item?.customizationDetails?.variant_item_attributes?.variant_value_1?.variant_value_images?.img_url_1:'/img/default.png':item.itemImg?item.itemImg:'/img/default.png'} />
            //   </Button>
            //   <div className="   items-center space-y-4 ">
            //     <Button type='link' href={`/product/${item.orderItemId}`}>
            //       <p className="text-left font-semibold truncate-2 text-base text-dark mt-2 ">{item.itemName}</p>
            //     </Button>
            //     {item.customizationDetails && <p>{item?.customizationDetails?.variant_item_attributes && Object.keys(item?.customizationDetails?.variant_item_attributes).map(function (key) {
            //       if (key.includes('variant_value')) {
            //         if (item?.customizationDetails?.variant_item_attributes[key] != null) {
            //           return <span>{item?.customizationDetails?.variant_item_attributes[key].variant_value_name}, </span>
            //         }
            //       }
            //     })}</p>}
            //     <p className="text-left text-lg lg:text-2xl font-bold text-gray-900  ">₹ {item.discountedOrderItemAmount}</p>
            //   </div>
            // </div>
          ))
        }
      </div>
      <div>
      </div>
    </div>
  )
}

export default orderlList
