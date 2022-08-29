import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Button } from "@components/inputs"
import { useRouter } from "next/router"
import PageLoader from '@components/loading/loader'
import Link from 'next/link'
// Actions
import { clearCheckout, orderPaymentConfirmStart } from "@redux/checkout/checkout-action"
import PageWrapper from "@components/page-wrapper/page-wrapper"
import Tracker from "@components/Cards/tracker"
import Stepper from "@components/stepper/stepper"
import { clearCart } from "@redux/cart/cart-actions"

const ThankYou = ({ confirmOrder, display, clearCheckout, clearCart, purchase }) => {
    const [status, setStatus] = useState('loading') // loading, success, failure
    const [orderId, setOrderId] = useState(null)
    const [mobNavHeight, setMobNavHeight] = useState(0)
    // const [price, setPrice] = useState(0)
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query
        const data = JSON.parse(atob(id))
        // console.log(id, data);
        // console.log();
        if (purchase) {
            setOrderId(data.orderId)
            confirmOrder({ ...data, setStatus })
        } else {
            router.push('/')
        }
        // setPrice(data.amount)

    }, [router.isReady])
    const steps = [{ lable: 'Delivery Address' },
    { lable: 'Add payment method' },
    { lable: 'Order placed' }
    ];
    const style = display ? {
        labelClass: 'text-xs font-normal text-white',
        compoleted: { color: display.secondary_color || '#F58634' },
        active: { color: '#E83B3B' },
        pending: { color: '#c5c5c5' },
        check: { color: '#fff' },
    } : {}
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const objerver = new ResizeObserver(function (e) {
                if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
                    const ele = document.getElementById('mob-navbar')
                    if (ele) {
                        if (ele.offsetWidth != mobNavHeight) {
                            // console.log(ele)
                            setMobNavHeight(ele.offsetHeight)
                        }
                    }
                }
            })
            objerver.observe(document.body)
        }
        // clearCheckout()
        // clearCart()
    }, [])
    return (
        <section >
            <div className='h-[166px] flex justify-center items-center nav-bg w-full sm:hidden fixed sm:static inset-x-0 px-4 py-4  top-[0] z-[1001] bg-white sm:bg-transparent'>
                <Stepper steps={steps} activeStep={3} sx={style} />
            </div>
            {
                status == 'loading'
                    ?
                    <PageLoader />
                    :
                    status == 'success'
                        ?
                        <div className="wrapper mx-auto md:bg-[#E5E5E5]">
                            <div className="thank-you py-16 my-5 md:my-20 bg-white">
                                <div className="flex justify-center items-center flex-col">
                                    <div className="">
                                        <div className="animation-ctn">
                                            <div className="icon icon--order-success svg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                                                    <g fill="none" stroke="#22AE73" strokeWidth="2">
                                                        <circle cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: '960px' }}></circle>
                                                        <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: '960px' }}></circle>
                                                        <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style={{ strokeDasharray: "100px, 100px", strokeDashoffset: '200 px' }} />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center my-10 px-10 lg:px-0">
                                        <h3 className="text-sm md:text-2xl font-bold text-[#1DAE81]">Order Placed. A confirmation email has been sent.</h3>
                                        <div className='pt-6 pb-10'>
                                            {/* <span className="text-sm lg:text-lg font-bold  pb-10">You saved  ₹{price} On this Order.</span> */}
                                        </div>
                                        <div className="flex justify-between ">
                                            <div className="w-1/2 flex items-center">
                                                <Link href="/shop">
                                                    <p className=" text-sm sm:text-lg btn-color-revers justify-start cursor-pointer ">Continue Shopping</p>
                                                </Link>
                                            </div>
                                            <div className="w-1/2 flex justify-end ml-4">
                                                <Button
                                                    className="px-8 py-2 text-sm sm:text-lg rounded btn-bg btn-color text-center mx-auto"
                                                    type="link"
                                                    href={`/account/orderdetail/${orderId}`}
                                                >
                                                    Track Order
                                                </Button>
                                            </div>

                                            <div>

                                            </div>
                                        </div>
                                        {/* <div className="w-full flex justify-between items-center">
                                            <Link href="/">
                                                <h4 className="text-lg text-[#1DAE81]  hidden md:blockmr-20  cursor-pointer">Continue Shoping</h4>

                                            </Link>
                                            <div className=" ml-20">
                                                <Button className="py-2 w-[156px] block mx-auto  hidden md:block  btn-border btn-bg-revese 'btn-color-revese' text-white rounded border-2 " style={{ backgroundColor: "#48887B", border: "2px solid #48887B" }} type="link" href={`/account/orderdetail/${orderId}`} title="Track order" />
                                            </div>
                                        </div> */}

                                    </div>
                                </div>

                            </div>
                            {/* <div id="cart-total-btn"
                                className=" border-[1px] border-[#E7E7E7]   md:border-[0px] mt-0 sm:mt-20 w-full left-0 fixed sm:relative bottom-0 p-4 sm:p-0  bg-white sm:bg-transparent"
                                style={{
                                    bottom: `${mobNavHeight}px`,
                                    zIndex: 1
                                }}
                            >
                                <div className="flex justify-between ">
                                    <div className="w-1/2 flex items-center">
                                        <Link href="/">

                                            <p className="flex text-[16px] text-[#F58634] justify-start ">Continue Shopping</p>
                                        </Link>
                                    </div>
                                    <div className="w-1/2 flex justify-end ml-4">
                                        <Button
                                            className=" w-3/4 py-3  px-2 sm:py-4 white-color rounded btn-bg text-center mx-auto"
                                            type="link"
                                            style={{ backgroundColor: '#F58634' }}
                                            href={`/account/orderdetail/${orderId}`}
                                        >
                                            Track Order
                                        </Button>
                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </div> */}
                        </div>
                        :
                        <div className="wrapper mx-auto">
                            <div className="thank-you py-16">
                                <div className="flex justify-center items-center flex-col">
                                    <div className="">
                                        <div className="animation-ctn">
                                            <div className="icon icon--order-success svg">
                                                <div className="w-40 h-40">
                                                    <img className="w-full" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgaGVpZ2h0PSIzMiIgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnIGlkPSJFcnJvcl8xXyI+PGcgaWQ9IkVycm9yIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiBpZD0iQkciIHI9IjE2IiBzdHlsZT0iZmlsbDojRDcyODI4OyIvPjxwYXRoIGQ9Ik0xNC41LDI1aDN2LTNoLTNWMjV6IE0xNC41LDZ2MTNoM1Y2SDE0LjV6IiBpZD0iRXhjbGFtYXRvcnlfeDVGX1NpZ24iIHN0eWxlPSJmaWxsOiNFNkU2RTY7Ii8+PC9nPjwvZz48L2c+PC9zdmc+" alt="error" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-center mt-10">
                                        <h3 className="text-3xl font-bold">Something went wrong!, unable to confirm order status!</h3>
                                        <div className='pt-6 pb-10'>
                                            <span className="text-xl black-color-75  pb-10">Please check your order <b>#{orderId}</b> in my orders before creating new orders.</span>
                                        </div>

                                        <h4 className="text-2xl cursor-pointer">Order Id - #{orderId}</h4>


                                        <div className="mt-6">
                                            <Button className="py-4 w-60 block mx-auto  btn-border btn-bg-revese btn-color-revese rounded border-2 " type="link" href={`/account/myorders`} title="My Orders" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
            }
        </section>)
}

const mapStateToProps = state => ({
    display: state.store.displaySettings,
    purchase: state.checkout.purchase
})

const mapDispatchToProps = dispatch => ({
    confirmOrder: (payload) => dispatch(orderPaymentConfirmStart(payload)),
    clearCheckout: () => dispatch(clearCheckout()),
    clearCart: () => dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(ThankYou));

