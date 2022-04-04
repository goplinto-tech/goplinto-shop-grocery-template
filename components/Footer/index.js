import { useEffect, useState } from 'react'
import Link from '@components/link'

import { BsDot } from 'react-icons/bs'
function index() {
  const [mobNavHeight, setMobNavHeight] = useState(0)
  useEffect(() => {
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
  return (
    <footer style={{
      paddingBottom: mobNavHeight,
    }}
    >
      <div className="hidden sm:block w-full bg-dark-900" >
        <div className="px-32 footer-bg pb-10 " >
          <div
            className="  border-b-2 border-gray-800 h-1/3  flex flex-row   justify-center "
            style={{ alignItems: 'center' }}
          >
            <p className="text-white my-8">
              <Link href='/privacy'>
                Privacy Policy
              </Link>
            </p>
            <BsDot className="mx-4 my-8 " color={'gray'} size={20} />
            <p className="text-white my-8 ">
              <Link href='/returns-refunds'>
                Return & Refunds
              </Link>
            </p>

            <BsDot className="mx-4 my-8" color={'gray'} size={20} />
            <p className="text-white my-8  ">
              <Link href='/terms-of-use'>
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className=" h-1/3 mt-10 flex  justify-center  align-center">
            <a className='block' href='https://goplinto.com/' target={'_blank'}>
              <p className="text-white flex justify-center mx-auto">
                Online Store Created Using
              </p>

              <div className="flex justify-center mx-auto">
                <img
                  src={
                    'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'
                  }
                  alt="Picture of the author"
                  className="w-1/4 my-2 mr-16 md:mr-8 lg:mr-8"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default index
