import React from 'react'
import { Discount, Old, Price, ProductImage, ProductName,AddButton, Blocker, ProductDescription } from './Styled'
import {BsHeart} from 'react-icons/bs'
import StarRating from './star'
function Index() {
  return (
    <div className="mx-2">
      <div  className="bg-white w-full h-60 rounded  flex card text-grey-darkest">
  <ProductImage className="rounded-lg" src="https://bit.ly/2EApSiC" alt="Room Image" />
  <div className=" h-9 mt-2 relative right-11 rounded-full flex justify-center align-center border-2 bg-white">
       <BsHeart className='m-2' color={"#242424BF"}/>
      </div>
  
  <div className="w-full flex flex-col">
    <div className=" pb-0 flex-1">
        <ProductName>Chicken Pizza</ProductName>
      <StarRating/>
      <div className="flex  flex-row justify-between relative align-center ">
          <div className='w-1/4 flex flex-row justify-between  text-center align-center'>
               <Price>180</Price>
                <Old className='mt-1'>200</Old>
                <Discount className='mt-1 '> 20%
                </Discount>
              </div>

              
  <div className='w-3/4 min-w-1/2  flex justify-end'>
  <AddButton className="   py-1 px-8  ">
  Add
</AddButton>
  </div>


              
          <div>


          </div>
      </div>

      <div className='w-full  mt-2 flex flex-row justify-between'> 
       <ProductDescription>hifsjdhfasjhdfjkashfljasdjkhskjhklashkjkhkjhfkjasfsdkjfh dfasdfasdsa afsd
       hifsjdhfasjhdfjkashfljasdjkhskjhklashkjkhkjhfkjasfsdkjfh
       </ProductDescription>

         <Blocker />
      </div>
      {/* <div className="text-xs flex items-center mb-4">
        <i className="fas fa-map-marker-alt mr-1 text-grey-dark" />
        Soho, London
      </div> */}
      {/* <span className="text-5xl text-grey-darkest">£63.00<span className="text-lg">/PPPN</span></span> */}
      {/* <div className="flex items-center mt-4">
        <div className="pr-2 text-xs">
          <i className="fas fa-wifi text-green" /> Free WiFi
        </div>
        <div className="px-2 text-xs">
          <i className="text-grey-darker far fa-building" /> 2mins to center
        </div>
      </div> */}
    </div>
    {/* <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
      Book Now
      <i className="fas fa-chevron-right" />
    </div> */}
  </div>
</div>


    </div>
  )
}

export default Index