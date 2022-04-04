import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '../inputs'
import Otp from './otp';
import { getRegisterOtpStart, loginSuccess, authShowToggle } from '../../redux/user/user-action';

// Register Component
const Register = ({ showToggle, setPage, getRegisterOtp, userloginSuccess, info }) => {
    const [state, setState] = useState({ name: "", phone: "" });
    const [userId, setUserId] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState("") // """
    const [status, setStatus] = useState("")
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
    const storeId = info.store_id;;
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        if (error) setError(null);
        // if (!(/^\d*$/.test(value)) && name == 'phone') return;
        setState({ ...state, [name]: value.trim() })
    }
    const onSubmitHandler = () => {
        if (!state.name || !state.phone) return setError("Enter valid name and email or phone number.");
        getRegisterOtp({ state, setUserId, setUser, setError, storeId })
        setError('')
        setStatus('loading')
    }
    useEffect(() => {
        return () => {
            setUserId(null);
        }
    }, [])
    useEffect(() => {
        if (error || user) {
            setStatus("")
        }
    }, [user, error])

    return (
        <>
            {
                userId || user
                    ? <Otp username={state.phone} onSuccess={() => {
                        if (user && userId) {
                            userloginSuccess(user)
                        } else {
                            setPage(true)
                        }
                    }} setPage={setPage} userId={userId} setUser={setUser} resend={onSubmitHandler} />

                    : <div className="auth">
                        <div className="p-6 auth-form-container rounded" >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">Create Account</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={showToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="mt-10">
                                <div className='' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        error ?
                                            <span className='text-base red-color'>{error}</span>
                                            : null
                                    }
                                </div>
                                <div>
                                    <Input name='name' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Your name" onChange={onChangeHandler} value={state.name} />
                                </div>
                                <div className='mt-6'>
                                    <Input name='phone' className={`auth-input ${error && 'input-danger'}`} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                </div>
                            </div>
                            <div className="py-8 border-b-2">
                                <Button className={`w-full btn-color text-lg font-medium btn-bg py-4 rounded${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}
                                    style={{
                                        ...(status == 'loading') && {
                                            opacity: 0.7,
                                            cursor: "not-allowed"
                                        },
                                    }}>{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div>
                            <div className="auth-redirect mt-8 black-color text-lg" >
                                <span>Already have an account? <Button className="bg-transparent red-color px-1" onClick={() => setPage(true)}>Login</Button> </span>
                            </div>
                        </div>
                    </div>

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
    getLoginOtp: (phone) => dispatch(getLoginOtpStart(phone)),
    getRegisterOtp: (user) => dispatch(getRegisterOtpStart(user)),
    otpVerify: (otp) => dispatch(otpVerificationStart(otp)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
