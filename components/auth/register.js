import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '@components/inputs'
import { IoEyeOutline, IoEyeOff } from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Otp from './otp';
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { getRegisterOtpStart, loginSuccess, authShowToggle, getLoginOtpStart, registerWithPasswordStart, forgotPasswordStart } from '@redux/user/user-action';

// Register Component
const Register = ({ fcmToken, showToggle, setPage, forgotPassword, registerWithPassword, userloginSuccess, info }) => {
    const [showPass, setShowPass] = useState(false)
    const [isVarificationPhone, setIsVarificationPhone] = useState(false)
    const [state, setState] = useState({
        storeId: info.store_id,
        fullName: "",
        password: "",
        confirmPassword: "",
        verificationType: isVarificationPhone ? "PHONE" : 'EMAIL', // (EMAIL  or PHONE)
        emailId: "",
        phone: "",
        isdCode: "91", // ..mandatory if verificationType is PHONE
        deviceId: fcmToken
    });
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        if (error) setError(null);
        if ((!(/^\d*$/.test(value)) || value.length > 10) && name == 'phone') return;
        // console.log(name);
        // if (name != 'password' && ) value = value.trim()
        // if (name != 'confirmPassword') value = value.trim()
        if (value.length > 40 && name == 'password') return;
        if (value.length > 40 && name == 'confirmPassword') return;
        let val = ''
        if (name == 'password') {
            val = value.replace(/\s\s+/g, '').trim()
        } else {
            val = value.replace(/\s\s+/g, ' ').trimStart()
        }
        setState({ ...state, [name]: val })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // if (isLoading) return;
        if (!state.fullName) return setError("Please enter your name.");
        if (!(state.phone || state.emailId)) return setError("Please enter valid email id or 10 digit phone number.");
        if (state.verificationType == 'PHONE' && state.phone.length < 10) return setError("Please enter valid 10 digit phone number.");
        if (state.verificationType == 'EMAIL' && !state.emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError("Enter a valid email id!");
        if (!state.password || state.password.length < 8) return setError("Please choose a strong password. Minimum password length should be of eight characters.");
        if (state.password != state.confirmPassword) return setError("Password and confirm password are not same.");
        setError('')
        setIsLoading(true)
        registerWithPassword({ state: { ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }, setError, setUser, setStatus: setIsLoading, storeId: info.store_id })
    };
    useEffect(() => {
        setState(state => ({ ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }))
    }, [isVarificationPhone])

    // const resendHandler = () => {
    //     forgotPassword({ state })
    // }
    // console.log(state);

    return (
        <>
            {
                !!user
                    ? <Otp verificationType={state.verificationType} username={isVarificationPhone ? state.isdCode + ' ' + state.phone : state.emailId}
                        setPage={setPage} userId={user.customer_id} resend={() => forgotPassword({ state })}
                    />

                    :
                    <>
                        <div className="auth overflow-y-auto no-scrollbar">
                            <div className={`sm:hidden flex sticky top-0 justify-between items-center shadow-lg nav-bg h-[100px] w-full `} style={{ zIndex: 1200 }}>
                                <div className={`flex items-center  mb-4`}>
                                    <p className={`text-2xl text-[white] mx-4`}>Register</p>
                                </div>
                                <Button className='bg-transparent dark-blue sm:hidden block mx-6' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="p-6 sm:absolute bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full bg-white sm:w-[512px] rounded " style={{ border: "2px solid #F58634" }} >
                                <div className="flex justify-between items-center">
                                    {/* <h2 className="text-2xl font-semibold">Login</h2> */}
                                    <div className='w-fit flex   p-4' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3   transition-all  duration-500 border-2 border-static ${isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <BsFillTelephoneFill />
                                        </span>
                                        <span className={`py-2 px-3  transition-all duration-500 border-2 border-static ${!isVarificationPhone ? 'btn-color font-medium btn-bg btn-bg' : 'btn-color-revers'}`}>
                                            <MdEmail />
                                        </span>
                                    </div>
                                    <Button className='bg-transparent dark-blue hidden sm:block' onClick={showToggle} >
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

                                {
                                    !!error &&
                                    <div className='flex sticky top-20 pb-4 bg-white w-full' >
                                        <span className='text-base red-color'>{error}</span>
                                    </div>

                                }
                                <form onSubmit={onSubmitHandler}  >
                                    <div className="flex justify-center mt-2">

                                        <Input disabled={isLoading} name='fullName' className={` border input-focus py-4 rounded-lg w-3/4 ${error && ' border-red-400'}`} type="text" placeholder="Your name" onChange={onChangeHandler} value={state.name} />
                                    </div>


                                    {
                                        isVarificationPhone ?
                                            <div className=" flex justify-center mt-4">
                                                <div className='w-3/4 w-full flex space-x-2 '>
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
                                                        <Input disabled={isLoading} name='phone' className={` border input-focus pl-14 py-4 ${error && ' border-red-400'} rounded-lg `} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                    </div>
                                                </div>

                                            </div>

                                            :
                                            <div className='mt-4 w-full flex justify-center   '>
                                                <Input disabled={isLoading} name='emailId' className={` input-focus border py-4 w-3/4 ${error && ' border-red-400'} rounded-lg`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                            </div>
                                    }
                                    <div className='mt-4 h-fit w-full flex justify-center  '>
                                        {/* <Input disabled={isLoading} name='password' className={`py-3 ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} /> */}
                                        {/* <h3 className='mb-1'>Password</h3> */}
                                        <div className=' relative w-full '>
                                            <Input disabled={isLoading} name='password' className={`border input-focus py-4 rounded-lg w-full  ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Create a password" onChange={onChangeHandler} value={state.password} />
                                            <div className=' cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 p-4' onClick={() => setShowPass(!showPass)}>
                                                {
                                                    showPass ?
                                                        <IoEyeOff size={25} color="#eeeff2" />
                                                        :
                                                        <IoEyeOutline size={25} color="#eeeff2" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <Input disabled={isLoading} name='confirmPassword' className={`border input-focus py-4 w-3/4 rounded-lg ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Confirm password" onChange={onChangeHandler} value={state.confirmPassword} />
                                    </div>
                                    <div className="py-8 border-b-2 flex w-full justify-center">
                                        <Button className={`w-full rounded-lg btn-color text-lg font-medium btn-bg py-4 ${isLoading == true ? 'loading-btn' : ""}`} type="submit" disabled={isLoading == true}
                                            style={{
                                                ...(isLoading == true) && {
                                                    opacity: 0.7,
                                                    cursor: "not-allowed"
                                                },
                                            }}>{isLoading == true ? 'Loading...' : 'Register'}</Button>
                                    </div>

                                </form>

                                {/* <div className="w-full mt-4 flex justify-center">

                                <div className='w-3/4'>
                                    <Input name='name' className={`auth-input ${error && 'input-danger'} rounded-lg`} type="text" placeholder="Your name" onChange={onChangeHandler} value={state.name} />
                                </div>

                                </div>
                                <div className="w-3/4 mt-2 flex justify-start">
                             <div className=' flex-col ' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base mx-14 red-color'>{error}</span>

                                    }
                                </div>
                             </div>
                                <div className='mt-6 flex  justify-center w-full'>
                                <div className='w-3/4'>
                                    <Input name='phone' className={`auth-input ${error && 'input-danger'} rounded-lg`} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                </div>
                            </div>
                            <div className="py-8 border-b-2 flex justify-center">
                                <Button className={`w-3/4 btn-color text-lg font-medium btn-bg py-4 rounded${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}
                                    style={{
                                        backgroundColor:"#F58634",...(status == 'loading') && {
                                            opacity: 0.7,
                                            cursor: "not-allowed"
                                        },
                                    }}>{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div> */}
                                <div className="auth-redirect mt-8 black-color text-lg" >
                                    <span>Already have an account? <Button className="bg-transparent btn-color-revers px-1" onClick={() => setPage(true)}>Login</Button> </span>
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
    user: state.user,
    info: state.store.info
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    // getLoginOtp: (phone) => dispatch(getLoginOtpStart(phone)),
    // getRegisterOtp: (user) => dispatch(getRegisterOtpStart(user)),
    // otpVerify: (otp) => dispatch(otpVerificationStart(otp)),
    registerWithPassword: (data) => dispatch(registerWithPasswordStart(data)),
    forgotPassword: (data) => dispatch(forgotPasswordStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
