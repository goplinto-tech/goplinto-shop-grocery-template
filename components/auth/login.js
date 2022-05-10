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
const Login = ({ showToggle, loginWithPassword, userloginSuccess, forgotPassword, setPage, info }) => {
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
            loginWithPassword({ state, setError, setStatus: setIsLoading })
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
                        <div className="auth hidden md:block">
                            <div className="p-6 auth-form-container rounded " style={{ border: "2px solid #F58634" }} >
                                <div className="flex justify-between items-center">
                                    {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                    <div className='w-fit flex   p-4' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3   transition-all  duration-500 border-2 border-[#f58634] ${isVarificationPhone ? 'text-white font-medium btn-bgs bg-[#f58634]' : 'text-[#f58634]'}`}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <span className={`py-2 px-3  transition-all duration-500 border-2 border-[#f58634] ${!isVarificationPhone ? 'text-white font-medium btn-bgs bg-[#f58634] ' : ' text-[#f58634] btn-color-reveses'}`}>
                                            <MdEmail />
                                        </span>
                                    </div>
                                    <Button className='bg-transparent dark-blue ' onClick={showToggle} >
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
                                                <div className='w-3/4 flex space-x-2 '>
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
                                                        <input disabled={isLoading} className='ml-2 absolute text-center text-sm top-1/2 -translate-y-1/2 w-11 outline-none rounded-lg' value={'+' + state.isdCode} />
                                                        <Input disabled={isLoading} name='phone' className={`pl-14 py-4 ${error && ' border-red-400'} rounded-lg `} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                    </div>
                                                </div>

                                            </div>

                                            :
                                            <div className='mt-2  flex justify-center  '>
                                                <Input disabled={isLoading} name='emailId' className={`py-4 w-3/4 ${error && ' border-red-400'} rounded-lg`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                            </div>
                                    }

                                    <div className=" flex justify-center">
                                        {
                                            !forgotPass &&
                                            <div className='mt-6 flex justify-center relative h-fit w-3/4 '>
                                                <Input disabled={isLoading} name='password' className={` ${error && ' border-red-400'} rounded-lg py-4`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} />
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

                                    <div className=' relative flex justify-end w-3/4 ml-14 mt-4'>
                                        <Button type='button' className='font-semibold btn-color-reveses text-[#F58634]' onClick={() => { setUser(null); setForgotPass(!forgotPass) }} >{forgotPass ? 'Want to Login?' : 'Forgot password?'}</Button>
                                    </div>
                                    <div className="py-4 border-b-2 flex  justify-center ">
                                        <Button className={`w-3/4 btn-color text-lg font-medium btn-bgs py-4 rounded ${isLoading ? 'loading-btn' : ""}`} type="submit" disabled={isLoading}
                                            style={{
                                                backgroundColor: "#F58634", ...(isLoading) && {
                                                    opacity: 0.7,
                                                    cursor: "not-allowed"
                                                },
                                            }}
                                        >{isLoading ? 'Loading...' : forgotPass ? 'Get OTP' : 'Login'}</Button>
                                    </div>
                                </form>

                                <div className="auth-redirect  black-color mt-8 text-lg " >
                                    <span className="font-bold">New User? <Button className=" bg-transparent red-color px-1" style={{ color: "#F58634" }} onClick={() => setPage(false)}>Create Account</Button> </span>
                                </div>

                            </div>
                        </div>
                        {/* mobile view */}
                        <div className="mobauth md:hidden">
                            <div className="p-6 pt-40 auth-form-container rounded "  >
                                <div className="flex justify-start items-center">
                                    {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                    <div className='w-fit flex   py-4' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3   transition-all  duration-500 border-2 border-[#f58634] ${isVarificationPhone ? 'text-white font-medium btn-bgs bg-[#f58634]' : 'text-[#f58634]'}`}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <span className={`py-2 px-3  transition-all duration-500 border-2 border-[#f58634] ${!isVarificationPhone ? 'text-white font-medium btn-bgs bg-[#f58634] ' : ' text-[#f58634] btn-color-reveses'}`}>
                                            <MdEmail />
                                        </span>
                                    </div>
                                    <Button className='hidden bg-transparent dark-blue ' onClick={showToggle} >
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
                                                <div className='w-full flex space-x-2 '>
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
                                                        <input disabled={isLoading} className='ml-2 absolute text-center text-sm top-1/2 -translate-y-1/2 w-11 outline-none rounded-lg' value={'+' + state.isdCode} />
                                                        <Input disabled={isLoading} name='phone' className={`pl-14 py-4 ${error && ' border-red-400'} rounded-lg `} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                    </div>
                                                </div>

                                            </div>

                                            :
                                            <div className='mt-2  flex justify-center  '>
                                                <Input disabled={isLoading} name='emailId' className={`py-4 w-full ${error && ' border-red-400'} rounded-lg`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                            </div>
                                    }

                                    <div className=" flex justify-center">
                                        {
                                            !forgotPass &&
                                            <div className='mt-6 flex justify-center relative h-fit w-full '>
                                                <Input disabled={isLoading} name='password' className={` ${error && ' border-red-400'} rounded-lg py-4`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} />
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

                                    <div className=' relative flex justify-end w-full  mt-4'>
                                        <Button type='button' className='   font-semibold btn-color-reveses text-[#F58634]' onClick={() => { setUser(null); setForgotPass(!forgotPass) }} >{forgotPass ? 'Want to Login?' : 'Forgot password?'}</Button>
                                    </div>
                                    <div className="py-4 border-b-2 flex  justify-center ">
                                        <Button className={`w-full btn-color text-lg font-medium btn-bgs py-4 rounded ${isLoading ? 'loading-btn' : ""}`} type="submit" disabled={isLoading}
                                            style={{
                                                backgroundColor: "#F58634", ...(isLoading) && {
                                                    opacity: 0.7,
                                                    cursor: "not-allowed"
                                                },
                                            }}
                                        >{isLoading ? 'Loading...' : forgotPass ? 'Get OTP' : 'Login'}</Button>
                                    </div>
                                </form>
                                <div className="auth-redirect  black-color mt-8 text-lg " >
                                    <span className="font-bold">New User? <Button className=" bg-transparent red-color px-1" style={{ color: "#F58634" }} onClick={() => setPage(false)}>Create Account</Button> </span>
                                </div>

                            </div>

                            <div className={`md:hidden fixed top-0     shadow-lg bg-[#48887B] h-[100px] w-full `} style={{ zIndex: 1200 }}>

                                {/* <Tracker status={cartHeader.status}/> */}
                                <div className={`flex items-center absolute bottom-0  mb-4`}>
                                    {/* <BsArrowLeft className={`mx-4`} size={35} color={'white'}/> */}
                                    <p className={`text-2xl text-[white] mx-4`}>Login</p>
                                </div>




                            </div>
                        </div>


                    </>
                    : <Otp username={isVarificationPhone ? state.isdCode + ' ' + state.phone : state.emailId}
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
