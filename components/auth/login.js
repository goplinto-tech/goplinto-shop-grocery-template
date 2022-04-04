import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '../inputs'
import { loginSuccess, authShowToggle, getLoginOtpStart } from '../../redux/user/user-action'
import Otp from './otp'

// Login Component
const Login = ({ showToggle, getLoginOtp, userloginSuccess, setPage, info }) => {
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null) // {}
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState('') // loading failed success
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
    const storeId = info.store_id;
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError(null);
        // if (!(/^\d*$/.test(value))) return;
        setPhone(value.trim())
    }
    const onSubmitHandler = () => {
        if (!phone) return setError("Enter valid phone number!.");
        getLoginOtp({ phone, setUser, setError, storeId })
        setError('')
        setStatus('loading')
    }
    useEffect(() => {
        return () => {
            setUser(null);
            setStatus('')
        }
    }, [])
    useEffect(() => {
        if (error) {
            setStatus('')
        }
        if (user) {
            setStatus('')
        }
    }, [error, user])

    return (
        <>
            {
                !user ?
                    <div className="auth">
                        <div className="p-6 auth-form-container rounded" >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">Login</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="mt-10">
                                <div className='' style={{ maxWidth: 'fit-content' }} >
                                    {
                                        !!error &&
                                        <span className='text-base red-color'>{error}</span>

                                    }
                                </div>
                                <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Phone Number or Email" onChange={onChangeHandler} value={phone} disabled={status == 'loading'} />
                            </div>
                            <div className="py-8 border-b-2 ">
                                <Button className={`w-full btn-color text-lg font-medium btn-bg py-4 rounded ${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}
                                    style={{
                                        ...(status == 'loading') && {
                                            opacity: 0.7,
                                            cursor: "not-allowed"
                                        },
                                    }}
                                >{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div>
                            <div className="auth-redirect  black-color mt-8 text-lg" >
                                <span>New User? <Button className=" bg-transparent red-color px-1" onClick={() => setPage(false)}>Create Account</Button> </span>
                            </div>

                        </div>
                    </div>
                    : <Otp username={phone} onSuccess={() => { userloginSuccess(user) }} setPage={setPage} setUser={setUser} userId={user.customer_id} resend={onSubmitHandler} />
            }
        </>

    )

}

const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    getLoginOtp: (data) => dispatch(getLoginOtpStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})
const mapStateToProps = (state) => ({
    info: state.store.info
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
