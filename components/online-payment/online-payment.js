import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { connect } from "react-redux"
// import plintoLogo from './plintoLogo.jpg'
import { orderPaymentConfirmStart } from "../../redux/checkout/checkout-action"
import Loader from "../loading/loader"

const OnlienPayment = ({ razorpayKey, store, user, themeColor = '#F64B5D', checkout, setConfirmPayment, rzpOrder, children, setInitiateStatus, setError, walletPay, walletAmount ,setRzpOrder}) => {
    console.log('fsdfsdfsdf', walletPay ? checkout.purchaseDetails.calculatedPurchaseTotal - walletAmount : checkout.purchaseDetails.calculatedPurchaseTotal);
    useEffect(() => {
        // if (!checkout.rzpOrder) Router.push(`/${store.store_name.replaceAll(' ', '-').trim()}/${store.store_id}/cart`)
        // Payment details
        // console.log("razorpaykey from online order",razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_API_KEY)
        const orderAmount = walletPay ? checkout.purchaseDetails.calculatedPurchaseTotal - walletAmount : checkout.purchaseDetails.calculatedPurchaseTotal;
        const rzpOrderId = rzpOrder.id;
        const customerId = user.customer_id
        const purchaseId = checkout.purchase.purchase_id;
        const options = {
            key: razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
            amount: (orderAmount * 100).toFixed(2), // Accept in Paisa (₹1 = 100 paisa)
            name: store.store_name || "Sigaram Technologies",
            description: "Powered by Goplinto",
            image: store.logo_img_url,
            order_id: rzpOrderId,
            handler: async (response) => {
                if (!response.razorpay_payment_id) {
                    setError("Your payment seems to have failed, please try again");
                } else {
                    setConfirmPayment({
                        purchaseId: purchaseId,
                        customerId: customerId,
                        amount: orderAmount,
                        id: response.razorpay_payment_id
                    });
                    setInitiateStatus('success')
                }
            },
            prefill: {
                name: user.full_name,
                contact: user.phone,
            },
            theme: {
                color: themeColor,
            },
            modal: {
                "ondismiss": () => {
                    document.body.style.overflow = 'auto'
                    setRzpOrder(null)
                    setInitiateStatus('pending');
                    

                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    },[])
    return (
        <>
            {children}
        </>)
}

export default OnlienPayment;