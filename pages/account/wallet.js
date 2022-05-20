
import Wallet from '@components/Cards/Order/wallet/wallet'
import Transaction from '@components/Cards/Order/wallet/transaction'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import withAuth from '@components/auth/withAuth'
import accountLayout from '@components/layout/account-layout'
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { connect } from 'react-redux'
import fetcher from '@redux/utility'
import { useEffect, useState } from 'react'
import { set } from 'nprogress'

const profileWallet = ({user, info}) => {
  const [wallet, setwallet] = useState("")
  const [transaction, settransaction] = useState([])

  console.log(user, info, 'line15')
  const router = useRouter()
  useEffect(() => {
    const getDetail = async () => {
      const data = await fetcher('GET', `?r=customer/get-customer-wallet-details&customerId=${user.customer_id}&storeId=${info.store_id}`)
      const transaction = await fetcher('GET', `?r=customer/get-wallet-transaction-details&customerId=${user.customer_id}`)
      console.log(transaction)
      settransaction(transaction.data)
      setwallet(data.data)
    }

    return getDetail()
  }, [])


  return (

    <div className="md:grid md:grid-cols-1 bg-[transparent] md:gap-6 mt-28 md:mt-2 lg:mt-0">
      <div className="w-full h-max ">
        <Wallet walletdata={wallet?.customer_wallet_balance} />
      </div>

      <div className="w-full md:mb-[0px] ">
        {transaction.length !== 0 ?
          <Transaction item={transaction && transaction} />
          : <div className="bg-white py-20 text-center px-4 font-bold text-lg" >
            No transaction !!!
          </div>
        }
        {/* <Transaction  item={transaction&&transaction}/> */}
      </div>
      <div className={`md:hidden fixed top-0 shadow-lg nav-bg h-[80px] w-full `} style={{ zIndex: 1200 }}>

        {/* <Tracker status={cartHeader.status}/> */}
        <div className={`flex items-center absolute bottom-0  mb-4`} onClick={router.back}>
          <BsArrowLeft className={`mx-4`} size={35} color={'white'} />
          <p className={`text-2xl text-[white] mx-4`}>Wallet</p>
        </div>




      </div>
    </div>
    )

}
const mapStateToProps = state => ({
  user: state.user,
  info: state.store.info,
})

export default connect(mapStateToProps,)(PageWrapper(withAuth(accountLayout(profileWallet))))
