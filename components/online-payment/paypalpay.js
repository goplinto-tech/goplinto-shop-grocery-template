import { clearCheckout, createNewRzpOrderStart, initiateOrderPymentStart } from "@redux/checkout/checkout-action";
import { useRef, useState, useEffect } from "react";

const PayButton = ({ onCancel, onSuccess, purchaseId, storeId }) => {
    const payButton = useRef();
    const [active, setActive] = useState(false)
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_NODE_ENV);
        const script = document.createElement('script');
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            paypal.Button.render({
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'pill',
                    label: 'paypal',
                },
                env: process.env.NEXT_PUBLIC_NODE_ENV == "development" ? 'sandbox' : 'live',
                payment: (data, actions) => {
                    return actions.request.post(`${process.env.NEXT_PUBLIC_PLINTO_URL}?r=payment-gateway/paypal-create-payment&purchaseId=${purchaseId}&storeId=${storeId}`, {},
                        {
                            headers: {
                                'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
                            }
                        })
                        .then((res) => {
                            return res.id
                        }).catch((err) => {
                            if (onCancel) {
                                onCancel(err)
                            }
                        })
                },
                onAuthorize: (data, actions) => {
                    return actions.request.post(`${process.env.NEXT_PUBLIC_PLINTO_URL}?r=payment-gateway/paypal-execute-payment&purchaseId=${purchaseId}&storeId=${storeId}`, {
                        paymentId: data.paymentID,
                        payerId: data.payerID
                    }, {
                        headers: {
                            'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
                        }
                    }).then((res) => {
                        if (onSuccess) {
                            onSuccess(res)
                        }
                    }).catch((err) => {
                        if (onCancel) {
                            onCancel(err)
                        }
                    })
                },
                onCancel: (context) => {
                    if (onCancel) {
                        onCancel(context)
                    }
                },
            }, "#pay");
            setActive(true)
        }
        document.body.appendChild(script);
    }, []);

    return <>
        <div className={`w-full min-h-screen flex justify-center items-center bg-slate-200 ${ active ? 'block' : 'hidden'}`}>
            <div className="h-96 w-72 p-7 bg-[#5ff18663] border-[#59ff85db] border flex justify-center items-center rounded-lg shadow-[-14px_20px_11px_0px_#d1d1d169]">
                <div className="flex items-center w-fit h-fit justify-center flex-col space-y-4">
                    <div className=" h-40 w-full flex justify-center items-center">
                        <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" className="w-40" />

                    </div>
                    <button id="#pay" ref={payButton} />
                </div>
            </div>
        </div>
        <div className={`flex-col flex justify-center items-center w-full min-h-screen ${ !active ? 'block' : 'hidden'}`}>
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
                <h5 className="white-color-75">We are processing your order </h5>
            </div>
        </div>
    </>
}


const mapStateToProps = state => ({
    checkout: state.checkout,
    user: state.user.currentUser,
    store: state.store.shop
})

const mapDispatchToProps = dispatch => ({
    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data))
})

export default PayButton;