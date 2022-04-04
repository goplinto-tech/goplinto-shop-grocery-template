import ProductItem from "../product-item/product-item";
import { Button } from "@components/inputs";
import Link from "@components/link";
import Loader from "@components/loading/loader";
import Router from "next/router";
// import ProductCard from '../Cards/ProductListCard/index'
function product({ products, status, storeName }) {
  console.log(status);
  return (
    <div className="my-4">
      <div className="relative flex flex-row md:px-2 mb-8 justify-end sm:justify-between align-center md:sticky md:z-10 top-0 bg-white">
        <div className=" hidden sm:flex items-baseline">
          <h2 className="font-bold text-2xl ">{storeName || ''}</h2>
          <span className=" text-sm black-color-75 ml-2">({products ? products.length : 0} Items)</span>
        </div>
        <div>
          <Button className="flex justify-center item-center p-2 border rounded black-color-75">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>{' '}
            Sort / Filter
          </Button>

        </div>
      </div>
      <div className="flex flex-col space-y-8">
        {
          status == 'success'
            ?
            products.length
              ?
              products.map((item, i) => (
                <ProductItem key={i} data={item} />
              ))
              :
              <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                <h6>
                  <span className="">No items found{' '}
                    <Link href={`/`}>
                      <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                        Show All Products.
                      </a>
                    </Link>
                  </span>
                </h6>
              </div>
            : status == 'loading' ?
              <>
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </>
              :
              <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                <h6>
                  <span className="">Unexpected error occurred{' '}
                    <span className="red-color" onClick={Router.reload} style={{ cursor: 'pointer' }}>{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                      </svg> Please Reload
                    </span>
                  </span>
                </h6>
              </div>
        }
      </div>
    </div>
  );
}

export default product;


        // {
        //   products ? products.map((item, i) => (
        //     <ProductItem key={i} data={item} />
        //   )) :
        //     <>
        //       <ProductItem />
        //       <ProductItem />
        //       <ProductItem />
        //     </>
        // }