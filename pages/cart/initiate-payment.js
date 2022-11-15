import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Router from 'next/router'

import PaypalPay from "@components/online-payment/paypalpay";
import PageWrapper from "@components/page-wrapper/page-wrapper";
import withAuth from "@components/auth/withAuth";
import { redirect } from "@components/link";
import { clearCheckout, createNewRzpOrderStart, initiateOrderPymentStart, orderPaymentConfirmStart } from "@redux/checkout/checkout-action";
// import PayButton from "@components/online-payment/paypalpay";


const Payment = ({ checkout, store, clearCheckout, confirmPayment }) => {

    const { payment, purchaseDetails, purchase, confirmOrder } = checkout;
    const purchaseId = purchaseDetails?.purchaseId;
    const customerId = purchaseDetails?.customerId;
    const paymentMethod = payment == 'Y' ? "PAY" : "COD";

    const [gateway, setGateway] = useState("PAYPAL"); // RAZORPAY
    const [paymentCompleted, setPaymentCompleted] = useState(null);
    const [orderId, setOrderId] = useState(Object.keys(purchaseDetails?.orders)[0]);

    const [onSuccess, setOnSuccess] = useState(null);
    const [onError, setOnError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    // Checking for a valid purchase
    if (!checkout.purchaseDetails || !purchase) {
        redirect('/cart')
        return null
    }


    const onCancelAction = (context) => {
        
        Router.back()
    }

    const onSuccessAction = (context) => {
        console.log('success', context);
        const orderAmount = context.transactions.reduce((acc, item) => item.amount.total + acc, 0)
        const encoded = btoa(JSON.stringify({ amount: orderAmount, purchaseId: purchaseId, method: "PAY", gateway: "PAYPAL", customerId: customerId, id: context.id, orderId }))
        // setPaymentCompleted(context)
        
        redirect(`/thank-you?id=${encoded}`)        
    }  

    if ( paymentCompleted){
        return <>
            {
                paymentCompleted &&
                    <div className="flex-col flex justify-center items-center w-full h-screen">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', display: 'block' }} width="75px" height="75px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
                                    <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
                                </circle> <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
                                    <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s"></animate>
                                </circle> <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
                                    <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s"></animate>
                                </circle> <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
                                    <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s"></animate>
                                </circle>
                            </svg>
                            <h5 className="white-color-75">We are confirming your order </h5>
                        </div>
                    </div>
            }
        </>
    }

    return <PaypalPay onSuccess={onSuccessAction} onCancel={onCancelAction} purchaseId={purchase?.purchase_id} storeId={store.store_id} />
}

const mapStateToProps = state => ({
    checkout: state.checkout,
    user: state.user.currentUser,
    store: state.store.info
})

const mapDispatchToProps = dispatch => ({
    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data)),
    confirmPayment: (data) => dispatch(orderPaymentConfirmStart(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(Payment)))