import React, { useState, useEffect, useRef } from "react";
import { GoPrimitiveDot } from "react-icons/go";

import { useSwipeable } from "react-swipeable";

const featuredProducts = [
  "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHt0T3F5FkyPbTzSnHVOu_oX8Pc0rezMq5WlzA1WmpkB8lIRKDiOFO8TmpUAcdqYQJjm4&usqp=CAU",
];

let count = 0;
let slideInterval;
export default function Slider({banner}) {
  // const featuredProducts=banner

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current?.classList?.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {

    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);

  slideRef.current?.classList?.add("fade-anim");


  };

const handleOnPrevSlide=()=>{

  count = (count - 1) % featuredProducts.length;
  count===-1?
  setCurrentIndex(featuredProducts.length-1)

  :setCurrentIndex(count)
}
const handleOnNextSlide=()=>{
  count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);




}

  const handlers = useSwipeable({
    onSwipedLeft: () => handleOnPrevSlide(),
    onSwipedRight: () => handleOnNextSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

const slider={

maxHeight:`352px`,
borderRadius: `0px`,
opacity: 1,
}
const dot={
  fontSize:`20px`,
  display: `flex`,
  alignItems: `center`
}
  return (

 <div ref={slideRef} className="flex flex-col justify-center w-full  select-none relative">
    <div {...handlers}>
      <div className=" w-full justify-center  " >
        <img style={slider} className="w-full" src={featuredProducts[currentIndex]} alt="" onScroll={()=>{alert("hello")}}/>
      </div>
      </div>

      <div className=" w-full relative -top-10 flex justify-center flex-row my-2">
          {
              featuredProducts.map((value,index)=>(
                <div key={index} style={dot} >
                <GoPrimitiveDot className="cursor-pointer" color={ index === currentIndex ?"white":"#2424243F"} onClick={()=>{setCurrentIndex(index)}}/>
            </div>

              ))
          }


      </div>

    </div>


  );
}
