function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


const Stepper = ({ activeStep = 1, vertical = false, steps = [], sx = {}, openReturn, details, isCanceled }) => {
    const style = {
        labelClass: '',
        compoleted: {
            color: '#E83B3B'
        },
        active: {
            color: '#E83B3B'
        },
        pending: {
            color: '#c5c5c5'
        },
        check: {
            color: '#fff'
        },
        ...sx
    }
    return (
        <>
            <div className="flex w-full">
                <div className="w-full " style={{ minHeight: '60px' }}>
                    <div className={`w-full flex ${vertical && 'flex-col'} justify-between h-full `}>
                        {
                            steps.map((item, i) => (
                                <div key={i} className={`flex relative ${!vertical ? 'flex-col  justify-start items-center' : 'justify-center items-start '} px-2 flex-1`}>
                                    {
                                        activeStep >= i + 1 ?
                                            <div key={i} className={`h-5 w-5 shrink-0 rounded-full shadow-xl z-10 ${!vertical && 'mb-4 flex-col'}`} style={{
                                                boxShadow: `none`,
                                                backgroundColor: activeStep >= i + 1 ? style.compoleted.color : style.pending.color
                                            }} >
                                                {
                                                    activeStep >= i + 1 &&
                                                        item?.icon ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ color: style.check.color }} className="h-5 w-5 p-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ color: style.check.color }} className="h-5 w-5 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>

                                                }
                                            </div>
                                            :
                                            // boxShadow: `0px 0px 0px 10px ${activeStep + 1 == i + 1 ? hexToRGB(style.compoleted.color, 0.15) : hexToRGB(style.pending.color, 0.15)}`,
                                            //     backgroundColor: activeStep + 1 == i + 1 ? style.compoleted.color : style.pending.color,
                                            <div key={i} className={`h-5 w-5 shrink-0 rounded-full shadow-xl z-10 scale-75 ${!vertical && 'mb-4 flex-col'} `} style={{
                                                boxShadow: `0px 0px 0px 10px ${hexToRGB(style.pending.color, 0.15)}`,
                                                backgroundColor: style.pending.color,
                                            }} />
                                    }
                                    <div className={`text-black w-full  ${vertical ? `text-left -ml-2.5 border-dashed ${i + 1 != steps.length && `h-24 border-l-2`}` : 'text-center'} inline-block`} style={{
                                        // minHeight: ' 80px',
                                        borderColor: vertical ? activeStep >= i + 1  ? style.compoleted.color : style.pending.color : 'none'
                                    }}>
                                        <span className={`text-sm font-semibold tracking-normal inline-block ${vertical && 'pl-6'} ${style.labelClass}`}>
                                            {item?.lable}
                                            <span className="block text-xs font-normal text-gray-400">
                                                {item?.dsc}
                                            </span>
                                        </span>
                                    </div>
                                    {
                                        i != 0 && !vertical &&
                                        <span className=" absolute flex-auto border-dashed border-t-2 left-0 top-2.5  w-full -translate-x-1/2"
                                            style={{
                                                borderColor: activeStep >= i + 1 || activeStep + 1 == i + 1 ? style.compoleted.color : style.pending.color
                                            }}
                                        />
                                    }

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div >
            {
                details?.orderStatus &&
                <div className="mt-4 w-full border-t-2 border-[#00000] h-full">
                    <div className=" px-4 my-4  w-full flex justify-end  items-center  ">
                        {
                            !isCanceled ?
                                <p className='btn-color-revers cursor-pointer mr-14 font-bold' onClick={openReturn}>Cancel</p>
                                :
                                <p className='btn-color-revers cursor-pointer mr-14 font-bold'  >Order Cancelled</p>
                        }
                        {/* <p className='btn-color-revers cursor-pointer font-bold '>Need Help?</p> */}
                    </div>
                </div>
            }

        </>
    )
}
export default Stepper;