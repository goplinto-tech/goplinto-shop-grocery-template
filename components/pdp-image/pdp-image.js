/**
//  * @param {Array} list list of all images, the first image will be default image
//  * @param {String} alt alt is the default alt string for all images
//  * @returns Jsx object
//  */

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 250,
    magnifieWidth = 250,
    zoomLevel = 2
}) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    return (
        <div
            className='px-4'
            style={{
                position: "relative",
                height: height,
                width: width,
                minHeight: 300,
                minWidth: 300,
            }}
        >
            <img
                src={src}
                style={{ height: height, width: width, maxWidth: '450px', maxHeight: '450px', minWidth: '450px', minHeight: '450px' }}
                onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onMouseLeave={() => {
                    // close magnifier
                    setShowMagnifier(false);
                }}
                alt={"img"}
            />

            <div
                style={{
                    display: showMagnifier ? "" : "none",
                    position: "absolute",

                    // prevent maginier blocks the mousemove event of img
                    pointerEvents: "none",
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifieWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifieWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: "no-repeat",

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                        }px`,

                    //calculete position of zoomed image.
                    backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
            ></div>
        </div>
    );
}

function App({ src }) {
    return (
        <div className="App">
            <ImageMagnifier
                width={"500px"}
                height={"100%"}
                src={src}
            />
        </div>
    );
}



const PdpImage = ({ list: images = [], alt = 'goplinto product image' }) => {

    const [activeImage, setActiveImage] = useState(0)
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
    const [openSlider, setOpenSlider] = useState(false)
    useEffect(() => {
        console.log(activeImage);
    })

    return (
        <div className="flex w-full justify-start items-start md:space-x-4 pdp-images" >
            <div className=" max-h-full pdp-image-list-c min-w-fit">
                <div className="pdp-image-list hidden sm:flex flex-col max-w-fit space-y-3 md:space-y-4">
                    {
                        [...images].map((item, i) => (
                            <div className="w-20 h-20 overflow-hidden rounded-md cursor-pointer" key={i} onClick={() => setActiveImage(i)}>
                                <img className={`w-full h-full object-cover ${activeImage != i && 'opacity-60'}`} src={item} alt={alt} />
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className="mx-auto pdp-primary-image flex h-full min-h-full items-start justify-center">
                <div className="w-full h-auto relative sm:pl-4 md:pl-0">
                    {isDesktopOrLaptop ?
                        <App src={`${images[activeImage] || '/static/images/default.png'}`} />

                        :
                        <>
                            <img className="w-full h-full" src={images[activeImage]} alt={alt} onClick={() => setOpenSlider(true)} />
                            <div className='w-full py-4 flex space-x-2 justify-center'>
                                {
                                    images.map((item, i) => (
                                        <div className={`${i == activeImage && 'active'} border-b-4 w-4 cursor-pointer`} onClick={() => setActiveImage(i)} key={i} />
                                    ))
                                }
                            </div>
                            <div className={`${openSlider ? 'slider-active' : 'slider'} z-[1000] mob-pdp-image-slider fixed inset-x-0  -bottom-full bg-black-color-75 flex items-end`}>
                                <div className='w-full bg-white pb-16'>
                                    <div className='p-6 w-full black-color cursor-pointer' onClick={() => setOpenSlider(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg ml-auto" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                        </svg>
                                    </div>
                                    <div className='mob-pdp-image-c my-6 w-full flex justify-center items-center overflow-hidden'>
                                        <img className='w-full h-auto object-cover' src={images[activeImage] || '/static/images/default.png'} alt={alt} />
                                    </div>
                                    <div className='w-full px-4 mb-10'>
                                        <div className='flex overflow-x-auto space-x-6 items-center no-scrollbar'>
                                            {
                                                images.map((item, i) => (
                                                    <div className={`${i == activeImage && 'active'} overflow-hidden h-20 w-20 p-4 flex-shrink-0 border-b-4 cursor-pointer `} onClick={() => setActiveImage(i)} key={i}>
                                                        <img className="w-full h-auto object-contain" src={item} alt={alt} />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default PdpImage;


// /**
//  *
//  * @param {Array} list list of all images, the first image will be default image
//  * @param {String} alt alt is the default alt string for all images
//  * @returns Jsx object
//  */
// import { useState, useEffect } from 'react';
// import ReactImageMagnify from 'react-image-magnify';
// import { useMediaQuery } from 'react-responsive';

// const PdpImage = ({ list = [], alt = 'goplinto product image' }) => {

//     const [activeImage, setActiveImage] = useState(0)
//     const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
//     const [openSlider, setOpenSlider] = useState(false)
//     useEffect(() => {
//         console.log(activeImage);
//     })

//     return (
//         <div className="flex w-full justify-start items-start md:space-x-4 pdp-images" >
//             <div className=" max-h-full pdp-image-list-c min-w-fit">
//                 <div className="pdp-image-list hidden sm:flex flex-col max-w-fit space-y-3 md:space-y-4">
//                     {
//                         [...list].map((item, i) => (
//                             <div className="w-20 h-20 overflow-hidden rounded-md cursor-pointer" key={i} onClick={() => setActiveImage(i)}>
//                                 <img className={`w-full h-full object-cover ${activeImage != i && 'opacity-60'}`} src={item} alt={alt} />
//                             </div>
//                         ))
//                     }
//                 </div>

//             </div>
//             <div className="mx-auto pdp-primary-image flex h-full min-h-full items-center justify-center">
//                 <div className="w-full h-auto relative sm:pl-4 md:pl-0">
//                     {isDesktopOrLaptop ?
//                         // <GlassMagnifier
//                         //     imageSrc={'/img/default.png'}
//                         //     imageAlt="Example"
//                         //     largeImageSrc="/img/default.png" // Optional
//                         // />
//                         <ReactImageMagnify {...{
//                             smallImage: {
//                                 alt: 'Wristwatch by Ted Baker London',
//                                 isFluidWidth: true,
//                                 src: list[activeImage] || '/img/default.png',
//                                 srcSet: [
//                                     `${list[activeImage] || '/img/default.png'} 355w`,
//                                     `${list[activeImage] || '/img/default.png'} 481w`,
//                                     `${list[activeImage] || '/img/default.png'} 584w`,
//                                     `${list[activeImage] || '/img/default.png'} 687w`,
//                                     `${list[activeImage] || '/img/default.png'} 770w`,
//                                     `${list[activeImage] || '/img/default.png'} 861w`,
//                                     `${list[activeImage] || '/img/default.png'} 955w`,
//                                     `${list[activeImage] || '/img/default.png'} 1033w`,
//                                     `${list[activeImage] || '/img/default.png'} 1112w`,
//                                     `${list[activeImage] || '/img/default.png'} 1192w`,
//                                     `${list[activeImage] || '/img/default.png'} 1200w`,
//                                 ].join(', '),
//                                 sizes: '(min-width: 480px) (max-height: 556px) 30vw, 80vw',
//                                 // width: "100%",
//                                 // width: "100%",
//                                 // width: "1500",
//                                 // height: "1500"
//                             },
//                             largeImage: {
//                                 alt: '',
//                                 src: list[activeImage] || '/img/default.png',
//                                 height: 1200,
//                                 width: 1800

//                             },

//                             imageClassName: 'rounded-md ',
//                             enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
//                             enlargedImageContainerDimensions: {
//                                 width: '200%',
//                                 height: '100%'

//                             },

//                         }} style={{}} />
//                         :
//                         <>
//                             <img className="w-full h-full" src={list[activeImage]} alt={alt} onClick={() => setOpenSlider(true)} />
//                             <div className='w-full py-4 flex space-x-2 justify-center'>
//                                 {
//                                     list.map((item, i) => (
//                                         <div className={`${i == activeImage && 'active'} border-b-4 w-4 cursor-pointer`} onClick={() => setActiveImage(i)} key={i} />
//                                     ))
//                                 }
//                             </div>
//                             <div className={`${openSlider ? 'slider-active' : 'slider'} z-10 mob-pdp-image-slider fixed inset-x-0  -bottom-full bg-black-color-75 flex items-end`}>
//                                 <div className='w-full bg-white pb-16'>
//                                     <div className='p-6 w-full black-color cursor-pointer' onClick={() => setOpenSlider(false)}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg ml-auto" viewBox="0 0 16 16">
//                                             <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
//                                             <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
//                                         </svg>
//                                     </div>
//                                     <div className='mob-pdp-image-c my-6 w-full flex justify-center items-center overflow-hidden'>
//                                         <img className='w-full h-auto object-cover' src={list[activeImage] || '/img/default.png'} alt={alt} />
//                                     </div>
//                                     <div className='w-full px-4 mb-10'>
//                                         <div className='flex overflow-x-auto space-x-6 items-center no-scrollbar'>
//                                             {
//                                                 list.map((item, i) => (
//                                                     <div className={`${i == activeImage && 'active'} overflow-hidden h-20 w-20 p-4 flex-shrink-0 border-b-4 cursor-pointer `} onClick={() => setActiveImage(i)} key={i}>
//                                                         <img className="w-full h-auto object-contain" src={item} alt={alt} />
//                                                     </div>
//                                                 ))
//                                             }

//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PdpImage;