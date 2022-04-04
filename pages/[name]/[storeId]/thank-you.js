import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Button } from "@components/inputs"
import { useRouter } from "next/router"
import PageLoader from '@components/loading/loader'

// Actions
import { orderPaymentConfirmStart } from "@redux/checkout/checkout-action"
import PageWrapper from "@components/page-wrapper/page-wrapper"

const ThankYou = ({ confirmOrder }) => {
    const [status, setStatus] = useState('loading') // loading, success, failure
    const [orderId, setOrderId] = useState(null)

    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query
        const data = JSON.parse(atob(id))
        console.log(id, data);
        setOrderId(data.orderId)
        confirmOrder({ ...data, setStatus })

    }, [router.isReady])

    return (
        <section>
            {
                status == 'loading'
                    ?
                    <PageLoader />
                    :
                    status == 'success'
                        ?
                        <div className="wrapper mx-auto">
                            <div className="thank-you py-16">
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
                                    <div className=" text-center mt-10">
                                        <h3 className="text-3xl font-bold">Thank you, your order has been placed successfully.!</h3>
                                        <div className='pt-6 pb-10'>
                                            <span className="text-xl black-color-75  pb-10">An order confirmation mail has been sent to you.</span>
                                        </div>
                                        <h4 className="text-2xl">Order Id - #{orderId}</h4>
                                        <div className="mt-6">
                                            <Button className="py-4 w-60 block mx-auto  btn-border btn-bg-revese btn-color-revese rounded border-2 " type="link" href={`/account/orderdetail/${orderId}`} title="View Order Details" />
                                        </div>
                                    </div>
                                </div>

                            </div>
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
                                        <h4 className="text-2xl">Order Id - #{orderId}</h4>
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

const mapDispatchToProps = dispatch => ({
    confirmOrder: (payload) => dispatch(orderPaymentConfirmStart(payload))
})

export default connect(null, mapDispatchToProps)(PageWrapper(ThankYou));