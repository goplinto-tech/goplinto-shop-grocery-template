import { useRouter } from 'next/router';
import SideProfile from '../../components/Cards/Order/Profile-card'

function accountLayout(WrappedComponent) {
    return (props) => {
        const router = useRouter()
        return (
            <>
                <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                    <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </button>
                    <span className='text-base font-semibold'>Profile</span>
                </div>
                {/* <div className=' w-full flex sm:hidden justify-between items-center p-4 bg-black-color-lighter bg-white sticky top-0 z-10'>
                    <button className='flex items-center black-color-75' onClick={router.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </button>
                </div> */}
                <section className="bg-gray-100 w-full ">
                    <div className="wrapper mx-auto">
                        <div className="md:grid md:grid-cols-12 gap-10 py-6">
                            {/* <div className=" hidden md:block lg:block lg:col-span-2 md:col-span-4 col-span-0 my-0  md:my-10 lg:my-10  "> */}
                            <div className="hidden md:block md:col-span-5 lg:col-span-4 xl:col-span-3 ">
                                <SideProfile userdetail={props.user} />
                            </div>
                            <div className=" col-span-full md:col-span-7 lg:col-span-8 xl:col-span-9 ">
                                {/* <div className="lg:col-span-9 md:col-span-7 col-span-11 my-10  md:mx-0 lg:mx-0 md:ml-8 lg:ml-8 "> */}
                                <WrappedComponent {...props} />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}


export default accountLayout;
