import React from 'react'
import Slider from './slider'
import Products from './product';
import { useRouter } from 'next/router';

function index({ products, banner, ...props }) {
  const router = useRouter();
  return (
    <div className=" sm:mx-6 ">
      {
        !router.asPath.includes('search=') &&
        <Slider banner={banner} />
      }
      <Products products={products} {...props} />
    </div>
  )
}

export default index
