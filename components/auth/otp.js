import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import { otpVerificationStart, authShowToggle } from '../../redux/user/user-action';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, onSuccess, userId, setUser, info }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
    const storeId = info.store_id;
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError(null);
        if (!(/^\d*$/.test(value))) return;
        setOtp(value)
    }
    const onSubmitHandler = () => {
        if (!otp) return setError("Enter valid OTP.");
        otpVerify({
            otp,
            userId,
            storeId,
            setError,
            setStatus,
            setUser,
            mode: username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'email' : 'phone',
        })
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
    return (
        <div className="auth">
            <div className="p-6 auth-form-container rounded" >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Enter OTP</h2>
                    <Button className='bg-transparent dark-blue p-2' onClick={() => { setPage(true); showToggle() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                        </svg>
                    </Button>
                </div>
                <div className='mt-3' style={{ maxWidth: 'fit-content' }} >
                    {error ? <></> :
                        <span className='text-lg font-medium black-color-75'>OTP sent to
                            {
                                username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                    ` ${username}`
                                    : ` +91 ${username}`
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
                    <div>
                        <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} />
                    </div>
                </div>
                <div className="auth-redirect text-lg my-8 flex justify-between items-center black-color-75" >
                    <span className='font-semibold'>01:25</span>
                    <span >Didn't receive OTP? <Button className="red-color px-2" onClick={resend} >Resend</Button> </span>
                </div>
                <div >
                    <Button className={`w-full btn-bg btn-color py-4 rounded`} type="button" onClick={onSubmitHandler} disabled={isLoading}
                        style={{
                            ...isLoading && {
                                opacity: 0.7,
                                cursor: "not-allowed"
                            },
                        }}>{isLoading ? 'Loading...' : 'Verify OTP'} </Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    info: state.store.info
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    otpVerify: (otp) => dispatch(otpVerificationStart(otp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
