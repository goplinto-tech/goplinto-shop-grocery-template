import React from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';

const MobContactUs = ({ mobContactUsVisible, setMobContactUsVisible, info, socialProfile,settings }) => {
    const customStyles = {
        overlay: { zIndex: 1000 },
        content: {
            width: 'auto',
            minWidth: '360px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            zIndex: 1000,
        },
    };
    return (
        <div>
            <Modal
                closeTimeoutMS={200}
                isOpen={mobContactUsVisible}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setMobContactUsVisible(false)}
                style={customStyles}
            >
                <div>
                    <div className='flex justify-between pt-5 px-4 pb-5 btn-bg'>
                        <h2 className='text-[18px] tracking-[2px] font-semibold text-white'>Contact Us</h2>
                        <p className='cursor-pointer text-xl font-thin text-gray-300' onClick={() => setMobContactUsVisible(false)}><AiOutlineClose /></p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='p-7'>
                            <img className="h-32 w-32 max-h-32 " src={info?.logo_img_url ? info.logo_img_url : "/img/default.png"} alt="" />
                        </div>
                        <div className='flex justify-center flex-col'>
                            <h3 className='text-base font-montSemiBold mb-3'>{info?.store_name}</h3>
                            <p className='text-sm text-gray-400'>{info?.store_type}</p>
                        </div>

                    </div>
                    <div className='text-white btn-bg h-[300px]'>
                        <div className='p-4'>
                            <h2 className='text-[14px] tracking-[2px] font-semibold'>Contact Us</h2>
                        </div>
                        <div className='space-y-4'>
                            {settings.is_address_available=="Y" ? <div className='pl-4'>
                                <span className='text-[13px]'><svg className='inline mr-2' width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 9.18182C17 15.5455 9 21 9 21C9 21 1 15.5455 1 9.18182C1 7.01187 1.84285 4.93079 3.34315 3.3964C4.84344 1.86201 6.87827 1 9 1C11.1217 1 13.1566 1.86201 14.6569 3.3964C16.1571 4.93079 17 7.01187 17 9.18182Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.99992 11.9091C10.4727 11.9091 11.6666 10.6881 11.6666 9.18186C11.6666 7.67563 10.4727 6.45459 8.99992 6.45459C7.52716 6.45459 6.33325 7.67563 6.33325 9.18186C6.33325 10.6881 7.52716 11.9091 8.99992 11.9091Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>{info?.address + ","}{info?.city + ","}{info?.state + ","}{info?.country}</span>
                            </div> : ""}
                            <div className='pl-4'>
                                {/* storeDetails?.primary_phone &&  */}
                                {info?.primary_phone && <span className='text-[13px]'><svg className='inline mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.9995 12.9791V15.3877C17.0004 15.6113 16.9545 15.8327 16.8648 16.0375C16.775 16.2424 16.6434 16.4263 16.4783 16.5775C16.3132 16.7286 16.1183 16.8437 15.906 16.9154C15.6938 16.987 15.4689 17.0136 15.2457 16.9935C12.7702 16.725 10.3923 15.8808 8.30312 14.5286C6.35937 13.2959 4.71141 11.6512 3.47627 9.71135C2.11669 7.61679 1.27059 5.23206 1.00653 2.75036C0.986426 2.52834 1.01286 2.30457 1.08416 2.0933C1.15546 1.88203 1.27005 1.6879 1.42065 1.52325C1.57124 1.35861 1.75454 1.22706 1.95886 1.13699C2.16319 1.04691 2.38407 1.00029 2.60744 1.00008H5.02086C5.41128 0.996243 5.78977 1.13422 6.0858 1.3883C6.38182 1.64237 6.57517 1.99521 6.62981 2.38103C6.73168 3.15185 6.92059 3.9087 7.19295 4.63713C7.30118 4.9245 7.32461 5.23682 7.26045 5.53707C7.19629 5.83732 7.04723 6.11292 6.83093 6.33121L5.80925 7.35087C6.95446 9.36092 8.62206 11.0252 10.6361 12.1682L11.6578 11.1485C11.8765 10.9326 12.1527 10.7839 12.4535 10.7198C12.7544 10.6558 13.0673 10.6792 13.3552 10.7872C14.0851 11.059 14.8435 11.2476 15.6158 11.3492C16.0066 11.4042 16.3635 11.6007 16.6186 11.9012C16.8737 12.2017 17.0093 12.5853 16.9995 12.9791Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>  +{info?.isd_code_phone_number} {info?.primary_phone}</span>}
                            </div>
                            <div className='pl-4'>
                                {/* storeDetails?.primary_email &&  */}
                                {info?.primary_email && <p className='text-[13px]'><span className='text-[18px] mr-2 font-montMedium'>@</span> {info?.primary_email}</p>}
                            </div>
                        </div>

                        {/* Social links */}
                        {
                            socialProfile.length ? <div >
                                <div className='p-4'>
                                    <div>
                                        <h2 className='text-[14px] tracking-[2px] font-semibold'>Social Accounts</h2>
                                    </div>
                                    <div className='flex space-x-6 mt-3'>
                                        {
                                            socialProfile.map(function (item, idx) {
                                                if (item.social_account_link) {
                                                    return (
                                                        <a target="_blank" className='block' href={(item.social_account_link.indexOf('http://') == 0 || item.social_account_link.indexOf('https://') == 0) ? `${item.social_account_link}` : `https://${item.social_account_link}`}
                                                            style={{ width: "2rem", height: '2rem', maxHeight: '2rem', borderRadius: '50%' }}
                                                            bgColor="#fff" fgColor="#000"
                                                            key={idx}>
                                                            <img src={item?.logo_img_url || ''} alt="Goplinto" />
                                                        </a>)
                                                    // return <SocialIcon style={{width:"2rem",height:'2rem',maxHeight:'2rem',borderRadius:'50%'}} bgColor="#fff" fgColor="#000" url={(item.social_account_link.indexOf('http://')==0 || item.social_account_link.indexOf('https://')==0)? `${item.social_account_link}`: `https://${item.social_account_link}`} onClick={() => window.location.href = (item.social_account_link.indexOf('http://')==0 || item.social_account_link.indexOf('https://')==0)? `${item.social_account_link}`: `https://${item.social_account_link}`} key={idx}/>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                                : ""
                        }
                    </div>
                </div>
            </Modal>

        </div>
    );
};

const mapStateToProps = state => ({
    info: state.store.info,
    settings: state.store.settings,
    socialProfile: state.store.socialProfile


})
export default connect(mapStateToProps)(MobContactUs);