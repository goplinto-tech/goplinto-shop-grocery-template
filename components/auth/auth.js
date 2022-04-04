import { useState } from 'react'
import { connect } from "react-redux"

import { authShowToggle, getLoginOtpStart, getRegisterOtpStart, otpVerificationStart } from "../../redux/user/user-action";

import Login from './login';
import Register from './register';



const Auth = ({ show, user }) => {
    const [page, setPage] = useState(true) // true == login, false == Register

    return (
        <>
            {show && !user ?
                page ?
                    <Login setPage={setPage} />
                    :
                    <Register setPage={setPage} />
                : null
            }
        </>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    user: state.user.currentUser
})
// const mapDispatchToProps = dispatch => ({
//     showToggle: () => dispatch(authShowToggle()),
// })

export default connect(mapStateToProps)(Auth)


// const auth = ({ show, showToggle, getLoginOtp, getRegisterOtp, otpVerify, user, storeId }) => {
//     const [isWantToLogin, setIsWantToLogin] = useState(true);
//     const [userState, setUserState] = useState({
//         phone: "",
//         name: ""
//     });
//     const [itsOTPTime, setItsOTPTime] = useState(false);
//     useEffect(() => {
//         if (user.userId) {
//             setItsOTPTime(true)
//         }
//     }, [user.userId])
//     useEffect(() => {

//     }, [show])
//     const [otp, setOtp] = useState('');
//     const onChangePhone = (e) => {
//         const { value, name } = e.target;
//         if (!(/^\d*$/.test(value))) return;
//         setUserState({ ...userState, phone: value })
//     }
//     const onChangeOtp = (e) => {
//         const { value } = e.target;
//         if ((/^\d*$/.test(value))) {
//             setOtp(value)
//         }
//     }
//     const onChangeName = (e) => {
//         const { value, name } = e.target;
//         setUserState({ ...userState, name: value })
//     }
//     const onSubmitHandler = (e) => {
//         if (itsOTPTime) {
//             otpVerify({
//                 otp: otp,
//                 userId: typeof user.userId == 'object' ? user.userId.customer_id : user.userId,
//                 storeId: storeId
//             })
//             return;
//         }
//         if (isWantToLogin) {
//             getLoginOtp(userState.phone)
//             return;
//         }
//         getRegisterOtp(userState)
//     }
//     return (
//         <>
//             {
//                 show ?
//                     <div className="auth">
//                         <div className="auth-form-container" >
//                             <div className="title-c">
//                                 <h2 className="font-24 font-w-600">{isWantToLogin ? 'Login' : 'Register'}</h2>
//                                 <Button className='bg-transparent dark-blue p-2' onClick={showToggle} >
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
//                                         <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
//                                         <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
//                                     </svg>
//                                 </Button>
//                             </div>
//                             <div className="mt-40">
//                                 {
//                                     !itsOTPTime ?
//                                         <div>
//                                             {
//                                                 !isWantToLogin ?
//                                                     <div>
//                                                         <Input onChange={onChangeName} name='name' value={userState.name} className={`auth-input`} type="text" placeholder="Your name" />
//                                                     </div>
//                                                     : <></>
//                                             }
//                                             <Input onChange={onChangePhone} name='phone' value={userState.phone} className={`auth-input`} type="tel" placeholder="Enter 10 digit phone number" />
//                                         </div>
//                                         :
//                                         <Input onChange={onChangeOtp} name='otp' value={otp} className={`auth-input`} type="text" placeholder="Enter OTP" />
//                                 }
//                             </div>
//                             <div className="mt-40">
//                                 {
//                                     !itsOTPTime ?
//                                         <Button className="w-100" type="button" onClick={onSubmitHandler} >Get OTP</Button>
//                                         : <Button className="w-100" type="button" onClick={onSubmitHandler} >Verify OTP </Button>
//                                 }
//                             </div>
//                             <div className="hr mt-40"></div>
//                             <div className="auth-redirect font-16" >
//                                 {
//                                     !itsOTPTime ?
//                                         <div onClick={() => setIsWantToLogin(!isWantToLogin)}>
//                                             {isWantToLogin ?
//                                                 <span>New User? <Button className="bg-transparent primary-color px-1">Create Account</Button> </span>
//                                                 :
//                                                 <span>Already have an account? <Button className="bg-transparent primary-color px-1">Login</Button> </span>
//                                             }
//                                         </div>
//                                         : <span>Didn't receive OTP? <Button className="bg-transparent primary-color px-1" onClick={() => { setItsOTPTime(false); onSubmitHandler() }} >Resend</Button> </span>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     : null

//             }
//         </>
//     )
// }

// const mapStateToProps = state => ({
//     show: state.user.show,
//     storeId: state.store.shop.store_id,
//     user: state.user
// })
// const mapDispatchToProps = dispatch => ({
//     showToggle: () => dispatch(authShowToggle()),
//     getLoginOtp: (phone) => dispatch(getLoginOtpStart(phone)),
//     getRegisterOtp: (user) => dispatch(getRegisterOtpStart(user)),
//     otpVerify: (otp) => dispatch(otpVerificationStart(otp))
// })

// const Loading = () => (
//     <div>
//         <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
//             <g transform="translate(20 50)">
//                 <circle cx="0" cy="0" r="6" fill="#07abcc">
//                     <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
//                 </circle>
//             </g><g transform="translate(40 50)">
//                 <circle cx="0" cy="0" r="6" fill="#0a69aa">
//                     <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
//                 </circle>
//             </g><g transform="translate(60 50)">
//                 <circle cx="0" cy="0" r="6" fill="#0a104a">
//                     <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
//                 </circle>
//             </g><g transform="translate(80 50)">
//                 <circle cx="0" cy="0" r="6" fill="#02021d">
//                     <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
//                 </circle>
//             </g>
//         </svg>
//     </div>
// )
