import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { IoEyeOutline, IoEyeOff } from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button, Input } from '../inputs'
import Otp from './otp'
import { loginSuccess, authShowToggle, getLoginOtpStart, loginWithPasswordStart, forgotPasswordStart } from '@redux/user/user-action'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

// Login Component
const Login = ({ fcmToken, showToggle, loginWithPassword, userloginSuccess, forgotPassword, setPage, info }) => {

    const [isVarificationPhone, setIsVarificationPhone] = useState(true)
    const [forgotPass, setForgotPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [user, setUser] = useState(null)
    const [state, setState] = useState({
        storeId: info.store_id,
        verificationType: isVarificationPhone ? "PHONE" : 'EMAIL', // (EMAIL  or PHONE),
        password: "",
        emailId: "",
        phone: "",
        isdCode: "91",
        deviceId: fcmToken
    })
    // const [user, setUser] = useState(null) // {}
    const [error, setError] = useState("") // ""
    const [isLoading, setIsLoading] = useState(false) // loading failed success

    const onChangeHandler = (e) => {
        let { value, name } = e.target;
        if (error) setError(null);
        if ((!(/^\d*$/.test(value)) || value.length > 10) && name == 'phone') return;
        if (name != 'password') value = value.trim();
        setState({ ...state, [name]: value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!(state.phone || state.emailId)) return setError("Enter valid 10 digit phone number or email id!");
        if (state.verificationType == 'EMAIL' && !state.emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError("Enter a valid email id!");
        if (state.verificationType == 'PHONE' && state.phone.length < 10) return setError("Please enter valid 10 digit phone number.");
        setError('')
        setIsLoading(true)
        if (forgotPass) {
            forgotPassword({ state, setError, setIsLoading, setUser })
        } else {
            loginWithPassword({ state, setError, setStatus: setIsLoading, setUser })
        }


    }
    useEffect(() => {
        setState(state => ({ ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }))
    }, [isVarificationPhone])

    useEffect(() => {
        if (error) {
            setIsLoading('')
        }
    }, [error])

    return (
        <>
            {
                !user ?
                    <>
                        <div className="auth overflow-y-auto no-scrollbar">
                            <div className={`sm:hidden flex sticky top-0 justify-between items-center shadow-lg nav-bg h-[100px] w-full `} style={{ zIndex: 1200 }}>
                                <div className={`flex items-center  mb-4`}>
                                    <p className={`text-2xl text-[white] mx-4`}>Login</p>
                                </div>
                                <Button className='bg-transparent dark-blue sm:hidden block mx-6' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="p-6 absolute bottom-0 sm:bottom-auto top-[100px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full bg-white sm:w-[512px] rounded " style={{ border: "2px solid #F58634" }} >
                                <div className="flex justify-end items-center">
                                    {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                    {/* <div className='w-fit flex   p-4' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3   transition-all  duration-500 border-2 border-static ${isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <span className={`py-2 px-3  transition-all duration-500 border-2 border-static ${!isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <MdEmail />
                                        </span>
                                    </div> */}
                                    <Button className='bg-transparent dark-blue  hidden sm:block' onClick={showToggle} >
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

                                {/* toggle */}
                                <div className='w-fit flex pl-0 py-4 pr-4' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3   transition-all  duration-500 border-2 border-static ${isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <span className={`py-2 px-3  transition-all duration-500 border-2 border-static ${!isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <MdEmail />
                                        </span>
                                    </div>

                                <form onSubmit={onSubmitHandler}>
                                    <div className="mt-6 flex justify-center">
                                        <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                            {
                                                !!error &&
                                                <span className='text-base red-color'>{error}</span>
                                            }
                                        </div>
                                    </div>
                                    {
                                        isVarificationPhone ?
                                            <div className=" flex justify-center">
                                                <div className='w-3/4 w-full  flex space-x-2 '>
                                                    <div className='w-10 shrink-0 relative '>
                                                        <PhoneInput
                                                            inputClass='hidden'
                                                            containerClass='py-4 w-full h-full rounded-lg'
                                                            buttonClass='w-full flag-div'
                                                            // country={'us'}
                                                            enableAreaCodes={true}
                                                            value={state.isdCode}
                                                            onChange={phone => setState({ ...state, isdCode: phone })}
                                                        />
                                                    </div>
                                                    <div className=' relative w-full'>
                                                        <input disabled={isLoading} className='ml-2 input-focus absolute text-center text-sm top-1/2 -translate-y-1/2 w-11 outline-none rounded-lg' value={'+' + state.isdCode} />
                                                        <Input disabled={isLoading} name='phone' className={`border input-focus pl-14 py-4 ${error && ' border-red-400'} rounded-lg `} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                    </div>
                                                </div>

                                            </div>

                                            :
                                            <div className=' flex justify-center  '>
                                                <Input disabled={isLoading} name='emailId' className={` border input-focus py-4 w-3/4 ${error && ' border-red-400'} rounded-lg`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                            </div>
                                    }

                                    <div className=" flex justify-center">
                                        {
                                            !forgotPass &&
                                            <div className='mt-6 w-full flex justify-center relative h-fit w-3/4 '>
                                                <Input disabled={isLoading} name='password' className={` border input-focus ${error && ' border-red-400'} rounded-lg py-4 w-full`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} />
                                                <div className=' cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 p-4' onClick={() => setShowPass(!showPass)}>
                                                    {
                                                        showPass ?
                                                            <IoEyeOff size={25} color="#eeeff2" />
                                                            :
                                                            <IoEyeOutline size={25} color="#eeeff2" />
                                                    }
                                                </div>
                                            </div>
                                        }

                                    </div>

                                    <div className=' relative flex justify-end ml-14 mt-4'>
                                        <Button type='button' className='font-semibold btn-color-revers ' onClick={() => { setUser(null); setForgotPass(!forgotPass);setError("") }} >{forgotPass ? 'Want to Login?' : 'Forgot password?'}</Button>
                                    </div>
                                    <div className="py-4 border-b-2 flex w-full justify-center ">
                                        <Button className={`w-3/4 btn-color btn-bg w-full text-lg font-medium btn-bgs py-4 rounded ${isLoading ? 'loading-btn' : ""}`} type="submit" disabled={isLoading}
                                            style={{
                                                ...(isLoading) && {
                                                    opacity: 0.7,
                                                    cursor: "not-allowed"
                                                },
                                            }}
                                        >{isLoading ? 'Loading...' : forgotPass ? 'Get OTP' : 'Login'}</Button>
                                    </div>
                                </form>

                                <div className="auth-redirect  black-color mt-8 text-lg " >
                                    <span className="font-bold">New User? <Button className=" bg-transparent btn-color-revers px-1" onClick={() => setPage(false)}>Create Account</Button> </span>
                                </div>

                            </div>
                        </div>
                    </>
                    : <Otp username={isVarificationPhone ? state.isdCode + ' ' + state.phone : state.emailId}
                        verificationType={state.verificationType}
                        setPage={setPage} userId={user} forgotPass={forgotPass} resend={() => forgotPassword({ state })}
                    />
            }

        </>

    )

}

const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    loginWithPassword: (data) => dispatch(loginWithPasswordStart(data)),
    forgotPassword: (data) => dispatch(forgotPasswordStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})
const mapStateToProps = (state) => ({
    info: state.store.info
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
