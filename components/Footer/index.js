import { useEffect, useState } from 'react'
import Link from '@components/link'
import { connect } from 'react-redux';
import { BsDot } from 'react-icons/bs'
import { useRouter } from 'next/router'
import ContactUs from '@components/ContactUS/ContactUs';
import absoluteUrl from 'next-absolute-url'
function index({ info, socialProfile, storePolicies }) {
  const router = useRouter()
  const [mobNavHeight, setMobNavHeight] = useState(0)
  const [contactUsVisible, setContactUsVisible] = useState(false)
  const otherLinksName = ['refund-policy', 'privacy-policy']
  const otherLinksTitle = ['Return & Refunds', 'Privacy Policy']
  const [otherLinks, setOtherLinks] = useState([])
  const [showOtherLinks, setShowOtherLinks] = useState(false)

  useEffect(() => {
    storePolicies && storePolicies?.map((item, idx) => {
      if (item.is_policy_added) {
        setShowOtherLinks(true)
      }
    })
  }, [])

  const { origin } = absoluteUrl()
  // console.log("origin",origin)
  // const origin="https://dev.robinhoodstyle.com"
  var count = origin.match(new RegExp("\\.", 'g'));

  // console.log("originalDomain", extractDomain(origin))
  if (count) {
    if (count.length >= 2) {
      const firstDotIndex = origin.indexOf('.');
      var domain = origin.substring(firstDotIndex + 1);
    }
    else {
      var domain = origin
    }
  }
  else {
    var domain = origin
  }

  useEffect(() => {
    // other links
    let other = []
    for (let i = 0; i < 2; i++) {
      const name = otherLinksTitle[i];
      // const url = `${domain}/${otherLinksName[i]}`
      if (domain.includes('http')) {
        var url = `${domain}/${otherLinksName[i]}`
      }
      else {
        var url = `https://${domain}/${otherLinksName[i]}`
      }
      const nameUrl = { name, url }
      other.push(nameUrl)
    }
    setOtherLinks(other)




    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
          const ele = document.getElementById('mob-navbar')
          const ele2 = document.getElementById('cart-total-btn') || false
          let totalH = mobNavHeight
          if (!!ele) {
            if (ele.offsetHeight != totalH) {
              totalH = ele.offsetHeight
            }
          }
          if (!!ele2) {
            if (ele2.offsetHeight != mobNavHeight) {
              totalH += ele2.offsetHeight
            }
          }
          setMobNavHeight(totalH)
        } else {
          setMobNavHeight(0)
        }
      })
      objerver.observe(document.body)
    }
  }, [])

  // console.log("otherLinks", otherLinks)
  // console.log("policy",storePolicies)
  return (

    // <footer style={{
    //   paddingBottom: mobNavHeight,
    // }}
    // >
    //   <div className="hidden sm:block w-full bg-dark-900" >
    //     <div className="px-32 footer-bg pb-10 " >
    //       <div
    //         className="  border-b-2 border-gray-800 h-1/3  flex flex-row   justify-center "
    //         style={{ alignItems: 'center' }}
    //       >
    //         <p className="text-white my-8">
    //           <Link href='https://www.goplinto.com/privacy-policy/' passHref>
    //             <a target="_blank">
    //             Privacy Policy
    //             </a>
    //           </Link>
    //         </p>
    //         <BsDot className="mx-4 my-8 " color={'gray'} size={20} />
    //         <p className="text-white my-8 ">
    //           <Link href='https://www.goplinto.com/refund-policy/' passHref>
    //             <a target="_blank">
    //             Return & Refunds
    //             </a>
    //           </Link>
    //         </p>

    //       </div>
    //       <div className=" h-1/3 mt-10 flex  justify-center  align-center">
    //         <a className='block' href='https://goplinto.com/' target={'_blank'}>
    //           <p className="text-white flex justify-center mx-auto">
    //             Online Store Created Using
    //           </p>

    //           <div className="flex justify-center mx-auto">
    //             <img
    //               src={
    //                 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'
    //               }
    //               alt="Picture of the author"
    //               className="w-1/4 my-2 mr-16 md:mr-8 lg:mr-8"
    //             />
    //           </div>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <div className='nav-bg hidden sm:block'>
      <div className=' bg-black bg-opacity-70'>
        <div className='px-20 py-10 '>
          <div className='grid grid-cols-4 '>
            {/* store info */}
            <div className='col-span-1 text-white'>
              <div>
                <img className="h-48 w-48 max-h-48" src={info?.logo_img_url} />
              </div>
              <p className='mt-2 font-montRegular'>{info?.store_desc}</p>
              <div className='space-y-2'>
                {/* <div>
                <span><img className='inline mr-2' src={location.src} alt="" />{storeDetails?.city}, {storeDetails?.country}</span>
              </div>
              <div>
                <span><img className='inline mr-2' src={call.src} alt="" />+{storeDetails?.primary_phone}</span>
              </div> */}
              </div>

            </div>
            {/* links */}
            <div className='col-span-3 ml-24'>
              <div className={`grid ${showOtherLinks ? "grid-cols-4" : "grid-cols-3"}`}>
                <div className='space-y-3'>
                  <h3 className='text-xl font-montMedium text-white'>Menu</h3>
                  <div className='w-fit space-y-3'>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push('/')}>Home</p>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push('/shop')}>Shop</p>
                    {/* <p className='text-gray-200 font-montRegular text-base cursor-pointer'>About Us</p> */}
                    <p onClick={() => setContactUsVisible(true)} className='text-gray-200 font-montRegular text-base cursor-pointer'>Contact Us</p>
                  </div>
                </div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-montMedium text-white'>Account</h3>
                  <div className='w-fit space-y-3'>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push("/account")}>My Profile</p>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push('/account/wishlist')}>Wishlist</p>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push("/account/myorders")}>Orders</p>
                    <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push("/account/savedplaces")}>Saved Address</p>
                  </div>
                </div>
                {
                  socialProfile.length ? <div className='space-y-3'>
                    <h3 className='text-xl font-montMedium text-white'>Social</h3>
                    <div className='w-fit space-y-3'>
                      {
                        socialProfile.map(function (item, idx) {
                          if (item.social_account_link) {
                            return <p><Link key={idx} href={`https://${item.social_account_link}`}><a target="_blank" className='text-gray-200 font-montRegular text-base cursor-pointer capitalize'>{(item.social_account_name).toLowerCase()}</a></Link></p>
                          }
                        })
                      }
                    </div>
                  </div> : ""
                }
              {showOtherLinks &&  <div className='space-y-3'>
                  <h3 className='text-xl font-montMedium text-white '>Other Links</h3>
                  <div className='w-fit space-y-3'>
                    {
                      // otherLinks.map((item, idx) => <p onClick={() => window.location.href = `${item.url}`} key={idx} className='text-gray-200 font-montRegular text-base cursor-pointer'>{item.name}</p>)
                      storePolicies.map(function (item, idx) {
                        if (item.is_policy_added) {
                          return (
                            <p><Link key={idx} href={`/policies/${item.policy_id}`}><a target="_blank" className='text-gray-200 font-montRegular text-base cursor-pointer capitalize'>{item.policy_name}</a></Link></p>
                          )
                        }
                      })
                    }
                  </div>
                </div>}

              </div>

            </div>
          </div>
          {/* contact us */}
          <>
            <ContactUs contactUsVisible={contactUsVisible} setContactUsVisible={setContactUsVisible}></ContactUs>
          </>
        </div>
        <div className='w-full flex items-center justify-center'>
          <span className='mr-3 text-white'>Powered by</span><img src={'https://devo2.goplinto.com/profileLogos/goplinto_logo.png'} className='h-6  object-contain' />
        </div>

        <div className='px-2 md:px-6 w-full flex flex-row items-start justify-between mt-9 md:pb-10 space-x-1 md:space-x-4'>
          <div className={`w-full basis-2/12 flex-grow flex flex-col flex-auto justify-center space-y-3 items-center`} >
            <p className='inline-block w-full text-[#FFFFFFB3] text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Cloud Hosted on'}</p>
            <div className={`w-full flex flex-row justify-between items-start max-h-8 `}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/aws dark mode copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/Azure web services copy@2x.png'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <div className={`w-full basis-3/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
            <p className='w-full text-center text-[#FFFFFFB3]  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
            <div className={`w-full flex flex-row justify-between items-start px-4 border-gray-400`}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/pci-compliant.f0aea468@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/ssl-final@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/https (1)@2x.png'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <div className={`w-full basis-7/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
            <p className='w-full text-center text-[#FFFFFFB3] mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Payments accepted via'}</p>
            <div className={`w-full flex flex-row justify-between items-baseline pl-6 border-gray-400`}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/amex@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/master card@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/visa copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/upi@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/paytm@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/pe copy 2@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/google pay copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/img/& more.svg'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.store.info,
  socialProfile: state.store.socialProfile,
  storePolicies: state.store.storePolicies


})
export default connect(mapStateToProps)(index);
