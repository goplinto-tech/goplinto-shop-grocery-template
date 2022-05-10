import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import CreateNewPassword from './create-pass'
import { otpVerificationStart, authShowToggle, forgotPasswordOtpVerifyStart } from '@redux/user/user-action';
import { set } from 'nprogress';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, onSuccess, userId, info, forgotPass, forgotPasswordOtpVerify }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState("")
    const [timer, settimer] = useState(60)
    const [trigger, setTrigger] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
    const storeId = info.store_id;
    const onChangeHandler = (e) => {

        const { value } = e.target;

        if (error) setError(null);
        if (!(/^\d*$/.test(value))) return;
        setOtp(otp.toString()+value.toString())
    }
    const onSubmitHandler = () => {
alert(otp)
        if (!otp) return setError("Enter valid OTP.");
        if (forgotPass) {
          forgotPasswordOtpVerify({ state: { otpCode: otp, customerId: userId }, setError, setIsLoading, setIsSuccess, setUser })
      }else{


        otpVerify({
            otp,
            userId,
            storeId,
            setError,
            setStatus,
            setUser,
            mode: username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'email' : 'phone',
        })
      }

       setTrigger(1)
        setError('')
        setIsLoading(true)
    }
    useEffect(() => {
        if (status) {
            if (onSuccess) {
                onSuccess()
            }
        }
    }, [status])
    useEffect(() => {
        if (error || status) {
            setIsLoading(false)
        }
    }, [status, error])


    // Componentdidmount
    useEffect(() => {
        return () => {
            setOtp('');
            setStatus("")
            setError('')
            setIsLoading(false)
        }
    }, [])
    const star=(number)=>{
      return `${number[0]}*******${number[number.length-2]}${number[number.length-1]} `
    }
    function clickEvent(first,last){

			if(first.value.length){
				document.getElementById(last).focus();
			}
		}
    function countdown() {

      var timeleft = timer;
      var downloadTimer = setInterval(function(){
      timeleft--;
      settimer( timeleft);
      if(timeleft <= 0)
          clearInterval(downloadTimer);
      },1000);

    }
    useEffect(() => {countdown()},[trigger])

    return (
      <>

      {
        isSuccess ?
        <CreateNewPassword setPage={setPage} user={user} forgotPass={forgotPass} />
        :

      <>

        <div className="auth hidden md:block">
              <div className="p-6 pt-40 auth-form-container rounded " style={{border:"2px solid #F58634"}} >

                <div className="flex justify-end items-center">

                    <Button className='bg-transparent dark-blue ' onClick={() => { setPage(true); showToggle() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                        </svg>
                    </Button>
                </div>

                <div className="w-full  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                <img
                  className="w-20 h-20 object-contain"
                  src={
                    info.logo_img_url
                    ||
                    '/img/default.png'
                  }
                  alt="..."
                />
              </div>
                <div className='mt-3 mx-12 w-full flex  justify-center' style={{ maxWidth: 'fit-content' }} >
                    {error ? <></> :
                        <span className='flex justify-center text-lg font-bold black-color'>An OTP sent to your registered mobile number

                            {
                                username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                    ` ${star(username)}`
                                    : ` +91 ${star(username)}`
                            }
                        </span>
                    }
                </div>
                <div className="mt-10">
                    <div className='' style={{ maxWidth: 'fit-content' }} >
                        {
                            error ?
                                <span className='text-base red-color'>{error}</span>
                                : null
                        }
                    </div>
                    <div className="flex mx-10">
         <div className={`  flex auth-input ${error && 'input-danger'} `}>
  <input className="h-20 w-20 mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center"  onChange={onChangeHandler} type="text" id="ist" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'sec')}} />
  <input  className="h-20 w-20 mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="sec" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'third')}}/>
  <input  className="h-20 w-20 mx-2 p-4 outline-none border-2 rounded-lg   w-full custom-input text-center" onChange={onChangeHandler} type="text" id="third" maxLength={1} onKeyUp= {(e)=>{clickEvent(e.target,'fourth')}} />
  <input className="h-20 w-20 mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="fourth" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'fifth')}} />
  <input  className="h-20 w-20 mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="fifth" maxlength={1} />

</div>


                        {/* <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} /> */}
                    </div>
                </div>
                <div className="auth-redirect text-lg my-8 mx-10 flex justify-between items-center black-color-75" >
                    <span className='font-semibold mx-2 ' id="timerCont">{timer} sec</span>
                    <span >Didn't receive OTP? <Button className="red-color px-2"style={{color:"#F58634"}} onClick={resend} >Resend</Button> </span>
                </div>
                <div className="flex justify-around w-full">
                    <Button className={`w-10/12 btn-bg btn-color py-4 rounded `} type="button" onClick={onSubmitHandler} disabled={isLoading}
                        style={{
                          backgroundColor:"#F58634",...isLoading && {
                                opacity: 0.7,
                                cursor: "not-allowed"
                            },
                        }}>{isLoading ? 'Loading...' : 'Verify OTP'} </Button>
                </div>
            </div>
        </div>

        <div className="mobauth md:hidden">

              <div className="p-6 auth-form-container rounded pt-60 " >

                <div className="flex justify-end items-center">

                    <Button className=' hidden bg-transparent dark-blue ' onClick={() => { setPage(true); showToggle() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                        </svg>
                    </Button>
                </div>

                <div className="w-full  shrink-0 flex  justify-center overflow-hidden rounded-md items-center">
                <img
                  className="w-20 h-20 object-contain"
                  src={
                    info.logo_img_url
                    ||
                    '/img/default.png'
                  }
                  alt="..."
                />
              </div>
                <div className='mt-3 px-12 w-full flex  justify-center' style={{ maxWidth: 'fit-content' }} >
                    {error ? <></> :
                        <span className='flex justify-center text-lg font-bold black-color'>An OTP sent to your registered mobile number

                            {
                                username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                    ` ${star(username)}`
                                    : ` +91 ${star(username)}`
                            }
                        </span>
                    }
                </div>
                <div className="mt-10">
                    <div className='' style={{ maxWidth: 'fit-content' }} >
                        {
                            error ?
                                <span className='text-base red-color'>{error}</span>
                                : null
                        }
                    </div>
                    <div className="flex mx-10">
         <div className={`  flex auth-input ${error && 'input-danger'} `}>
  <input className="h-[60px] w-[60px] mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center"  onChange={onChangeHandler} type="text" id="mist" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'sec')}} />
  <input  className="h-[60px] w-[60px]  mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="msec" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'third')}}/>
  <input  className="h-[60px] w-[60px]  mx-2 p-4 outline-none border-2 rounded-lg   w-full custom-input text-center" onChange={onChangeHandler} type="text" id="mthird" maxLength={1} onKeyUp= {(e)=>{clickEvent(e.target,'fourth')}} />
  <input className="h-[60px] w-[60px]  mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="mfourth" maxLength={1} onKeyUp={(e)=>{clickEvent(e.target,'fifth')}} />
  <input  className="h-[60px] w-[60px]  mx-2 p-4 outline-none border-2  rounded-lg  w-full custom-input text-center" onChange={onChangeHandler} type="text" id="mfifth" maxlength={1} />

</div>


                        {/* <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} /> */}
                    </div>
                </div>
                <div className="auth-redirect text-lg my-8 mx-10 flex justify-between items-center black-color-75" >
                    <span className='font-semibold mx-2 ' id="timerCont">{timer} sec</span>
                    <span >Didn't receive OTP? <Button className="red-color px-2"style={{color:"#F58634"}} onClick={resend} >Resend</Button> </span>
                </div>
                <div className="flex justify-around w-full px-4">
                    <Button className={`w-10/12 btn-bg btn-color py-4 rounded `} type="button" onClick={onSubmitHandler} disabled={isLoading}
                        style={{
                          backgroundColor:"#F58634",...isLoading && {
                                opacity: 0.7,
                                cursor: "not-allowed"
                            },
                        }}>{isLoading ? 'Loading...' : 'Verify OTP'} </Button>
                </div>
            </div>
            <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[100px] w-full `} style={{zIndex:1200}}>

<div className={`flex items-center absolute bottom-0  mb-4`}>

   <p className={`text-2xl text-[white] mx-4`}>OTP Verification</p>
</div>




</div>
        </div>


        </>
                      }
                      </>
    )
}

const mapStateToProps = state => ({
  show: state.user.show,
  info: state.store.info
})
const mapDispatchToProps = dispatch => ({
  showToggle: () => dispatch(authShowToggle()),
  otpVerify: (data) => dispatch(otpVerificationStart(data)),
  forgotPasswordOtpVerify: (data) => dispatch(forgotPasswordOtpVerifyStart(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
