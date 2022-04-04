import Link from "@components/link"
import Router from 'next/router'
import { useState } from "react"
import MediaQuery from "react-responsive"
import { Button } from "@components/inputs"
import { useRouter } from "next/router"

const CatList = ({ title = "Categories", list = [], closeMenu, ...props }) => {

    const data = (Router?.router?.state?.query)
    const router = useRouter()
    // alert(category,SubCategoryId)
    const [active, setactive] = useState({
        activeid: "",
        activesubcategory: {
            name: "",
            active: true
        },
        active: true
    })

    const activeHandler = (item) => {
        setactive({ ...active, activeid: item.category_id, active: !active.active })
    }
    const subHandler = (item) => {
        setactive({
            ...active, activesubcategory: {
                name: item.sub_category_id,
                active: !active.activesubcategory.active
            },
        })
    }
    const { category: activeId } = router.query
    const goToList = () => {
        if (window) {
            window.scrollBy(0, 400)
        }
    }
    const breackPoint = 768
    return (
        <div className="box-container categories w-full h-full ">
            {/* For desktop */}
            <MediaQuery minWidth={breackPoint}>
                <div className="text-left sticky top-0 bg-white">
                    <span className=" text-center black-color font-extrabold text-xl sticky top-0">{title}</span>
                </div>
                <ul className="ul-list">
                    <li className={`${'active'} `} onClick={closeMenu}>
                        <Link href={`/`}>
                            <a >
                                <div className={`text-left py-1 mt-3 cursor-pointer ${!router.query.category ? 'cat-active btn-color-revers font-semibold' : 'black-color-75'}`}>
                                    <span className="  text-lg  ">All Products</span>
                                    {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                </div>

                            </a>
                        </Link>
                    </li>
                    {
                        list && list.map((item, i) => (
                            <li className={` font-regular `} key={i}>

                                <Link href={`/?category=${item.category_id}`}>
                                    <a>
                                        {parseInt(data?.category, 10) === item.category_id ?
                                            <div className={`text-center flex py-1 mt-3 btn-color-revers cursor-pointer cat-active`} >
                                                <span className={` text-base font-semibold `} >{item.category_name}</span>
                                                {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                            </div>
                                            :

                                            <div className=" text-center flex py-1 mt-3  cursor-pointer " onClick={() => { activeHandler(item) }} >
                                                <span className={` text-base font-medium black-color-75  `} >{item.category_name}</span>
                                                {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                            </div>
                                        }
                                    </a>
                                </Link>
                                {
                                    active.activeid === item.category_id && active.active &&
                                    <ul className="ul-list pl-6">
                                        {
                                            item.subcategories.map((subitem, i) => (
                                                <li >
                                                    <Link href={`/?category=${item.category_id}&subCategoryId=${subitem.sub_category_id}`}>
                                                        <a>
                                                            {parseInt(data?.subCategoryId, 10) === subitem.sub_category_id ?

                                                                <div className="flex flex-col justify-content-center mt-3 cursor-pointer " >
                                                                    <span className={` text-base font-semibold btn-color-revers `} onClick={() => { subHandler(subitem) }} >{subitem.sub_category_name}</span>
                                                                </div>
                                                                :
                                                                <div className="flex flex-col justify-content-center mt-3 cursor-pointer ">
                                                                    <span className={` text-base font-medium black-color-75  `} onClick={() => { subHandler(subitem) }} >{subitem.sub_category_name}</span>
                                                                </div>
                                                            }
                                                        </a>
                                                    </Link>
                                                </li>))
                                        }
                                    </ul>
                                }
                            </li>
                        ))
                        // list?.map((item) => (
                        //     <li key={item.category_id} onClick={closeMenu} className={`font-w-400 ${category == item.category_id && 'active'}`}>

                        //    <Link href={`/?category=${item.category_id}`}>
                        //       <Link>
                        //           <div className=" text-center flex mt-4  ">
                        //               <span className=" text-lg font-medium text-gray-600  active:text-blue-600 ">{item.category_name}</span>
                        //               {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                        //           </div>
                        //       </Link>
                        //   </Link>
                        //   <ul className="ul-list " style={{ paddingLeft: '8px' }}>
                        //       {
                        //           item.subcategories.map((subitem, i) => (
                        //               <li >
                        //                   <Link href={`/?category=${item.category_id}&subCategoryId=${subitem.sub_category_id}`}>
                        //                       <Link>
                        //                           <div className="flex flex-col justify-content-center mt-4">
                        //                               <span className={` text-lg font-medium text-gray-600  `} >{subitem.sub_category_name}</span>

                        //                           </div>
                        //                       </Link>
                        //                   </Link>
                        //               </li>
                        //           ))
                        //       }
                        //   </ul>
                        //     </li>

                        // ))
                    }
                </ul>
            </MediaQuery>
            {/* For Mobile only */}
            <MediaQuery maxWidth={breackPoint}>
                <div className="mob-cat relative w-full mt-3 py-4 border-b-2">
                    <div className="w-full flex overflow-auto space-x-3 no-scrollbar  sticky top-0 -mb-5">
                        <div className={`inline-block py-3 rounded px-3 shrink-0 h-fit w-fit ${!activeId && 'active font-semibold'}`} onClick={goToList}>
                            <Button className=" text-base  " type="link" href={`/`} >All Items</Button>
                        </div>
                        {
                            list && list.map((item, i) => (
                                <div className={`inline-block  py-3 rounded px-3 shrink-0 h-fit w-fit ${item.category_id == activeId && 'active font-semibold'}`} onClick={goToList} key={i}>
                                    <Button className="text-base  " type="link" href={`/?category=${item.category_id}`} >{item.category_name}</Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </MediaQuery>
            {/* <Button type="link" href={`/?category=${item.category_id}`} ></Button> */}

        </div>
    )
}

export default CatList
