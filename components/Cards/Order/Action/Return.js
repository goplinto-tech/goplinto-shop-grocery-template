import { connect } from 'react-redux'
import { useState } from 'react'
import { Button, Radio, Checkbox } from '@components/inputs'
import fetcher from '@redux/utility'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
function Ret({ action, items, closeRetun, user, orderId }) {
  const router = useRouter()
  const [final, setfinal] = useState(false)
  console.log(items, orderId)
  const [reason, setreason] = useState({
    reason1: '',
    reason2: '',
    custom: '',
  })
  const onReasonHandler = (e) => {
    const { value, name, } = e.target

    if (name === 'r1') {
      setPayload({ ...payload, cancelReason: value })
    }
    // if (name === 'r2') {
    //   setPayload({ ...payload, cancelReason: value })


    // }
    if (name === 'custom') {
      console.log(name, value)
      let val = value.replace(/\s\s+/g, '').trim()
      setPayload({ ...payload, cancelReason: val })


    }
  }

  const [payload, setPayload] = useState({

    customerId: user.customer_id,
    cancelReason: '',
    orderItemId: [], // null should be passed when the entire order is to be cancelled
  })
  const onChangeHandler = (e) => {
    const { value, checked, name, type } = e.target


    if (type === "submit") {
      closeRetun(false)
      setPayload({ ...payload, cancelReason: reason.custom ? reason.custom : reason.reason1 ? reason.reason1 : reason.reason2 && reason.reason2 })
      fetcher('post', `/?r=my-orders/cancel-order&orderId=${orderId}`, payload).then(response => {
        console.log(response);
        if (response) {
          toast.success("Request Placed Successfully", {
            autoClose: 2000
          })
          router.push('/account/myorders')         

        }

      }).catch(err => {
        if (err?.response?.data?.message == "Sorry, the order can not be cancelled once confirmed!") {
          toast.error("Request Already Placed", {
            autoClose: 2000
          })
        }
      })
    }


    if (checked) {
      setPayload({
        ...payload,
        orderItemId: [value, ...new Set(payload.orderItemId)],
      })
    } else {
      setPayload({
        ...payload,
        orderItemId: payload.orderItemId.filter((item) => item != value),
      })
    }
  }


  return (
    <div id="return" className="auth ">
      <div className="mt-80 md:mt-0 lg:mt-0 md:roundec-lg lg:rounded-lg ">
        <section className='absolute max-w-[95%] sm:min-w-[512px] top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%]'>
          <div className="flex p-4 justify-between items-center border-b-2 border-gray-200 ">
            <h2 className="text-base font-semibold">{action} Order</h2>
            <Button
              className="bg-transparent dark-blue p-2"
              onClick={() => closeRetun(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fillRule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </Button>
          </div>
          <div className="p-4">
            <h3 className="text-sm  text-gray-600">
              {
                // final
                //   ? 'Why are you returning this order?'
                `Why are you cancelling this order ?`
              }
            </h3>
            {
              // final ? (
              <>
                <div className="mt-4 mx-1 flex flex-around  ">
                  <Radio
                    className="mt-3 "
                    name="r1"
                    value="Order got delayed"
                    onClick={(e) => {
                      onReasonHandler(e)
                    }}
                  />

                  <h3
                    className="text-sm flex text-gray-400 mt-2 mx-3"
                    style={{ alignItems: 'center' }}
                  >
                    Order got delayed
                  </h3>
                </div>
                <div className="mt-4 mx-1 flex flex-around  ">
                  <Radio
                    className="mt-3 "
                    name="r1"
                    value="Got it at a better price"
                    onClick={(e) => {
                      onReasonHandler(e)
                    }}
                  />

                  <h3
                    className="text-sm flex text-gray-400 mt-2 mx-3"
                    style={{ alignItems: 'center' }}
                  >
                    Got it at a better price
                  </h3>
                </div>
                <div className="mt-4 mx-1 flex flex-around hidden md:block lg:block  ">
                  <textarea
                    className="mx-6 border-2 border-gray-200 rounded-lg"
                    rows="4"
                    cols="50"
                    name="custom"
                    onChange={(e) => {
                      onReasonHandler(e)
                    }}
                  ></textarea>
                </div>
                <div className="mt-4 mx-1 flex flex-around block md:hidden lg:hidden ">
                  <textarea
                    className="mx-6 border-2 border-gray-200 rounded-lg"
                    rows="4"
                    cols="35"
                    name="custom"
                    onChange={(e) => {
                      onReasonHandler(e)
                    }}
                  ></textarea>
                </div>

                <div className="flex justify-center md:justify-end lg:justify-end my-6 mb-40 lg:my-2 md:my-2">
                  <Button
                  disabled={payload.cancelReason==''}
                    className={`w-full md:w-max lg:w-max m-2 btn-color text-lg font-medium btn-bg px-4 py-1 rounded `}
                    type="submit"
                    onClick={(e) => {
                      onChangeHandler(e)
                    }}
                  >
                    Place Cancel Request
                  </Button>
                </div>
              </>

              //   <>
              //     {Object.values(items).map((item, i) => (
              //       <div className="mt-4 mx-1 flex flex-around" key={i}>
              //  <Checkbox
              //           className="mt-3 "
              //           name="orderId"
              //           id={item.orderItemId}
              //           value={item.orderItemId}
              //           onChange={onChangeHandler}
              //         />
              //         <label className="flex" htmlFor={item.orderItemId}>
              //           <div className="mx-4 w-10 h-10 rounded bg-gray-900">
              //             <img
              //               className="w-full h-full rounded object-center opacity-80"
              //               src={item.itemImg || '/img/default.png'}
              //             />
              //           </div>
              //           <h3
              //             className="text-sm  text-gray-600 flex align-centers"
              //             style={{ alignItems: 'center' }}
              //           >
              //             {item.itemName}
              //           </h3>
              //         </label>
              //       </div>
              //     ))}
              //     {/* <div className="mt-4 mx-1 flex flex-around  ">
              //       <Radio className="mt-3 " />
              //       <div className="mx-4 w-10 h-10 rounded bg-gray-900">
              //         <img
              //           className="w-full h-full rounded object-center opacity-80"
              //           src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
              //         />
              //       </div>
              //       <h3
              //         className="text-sm flex text-gray-600 "
              //         style={{ alignItems: 'center' }}
              //       >
              //         Plain Briyani
              //       </h3>
              //     </div> */}

              //     <div className="flex justify-end ">
              //       <Button
              //         className={`w-max m-2 btn-color text-lg font-medium btn-bg px-4 py-1 rounded `}
              //         type="button"
              //         onClick={(e) => {
              //           setfinal(
              //             payload.orderItemId.length === 0 ? final : !final
              //           )

              //         }}
              //       >
              //         Next
              //       </Button>
              //     </div>
              //   </>
              // )
            }
          </div>
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
})

export default connect(mapStateToProps)(Ret)
