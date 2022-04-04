import { useState } from "react";
import { Star } from "./Styled";
import {AiFillStar} from 'react-icons/ai'
 



function StarRating() {

  const [acctive, setacctive] = useState({
      index:-1,
      active:false,
      deadindex:false
  })
 

  
  const handleChange = (value,index) => {

   setacctive({
       index:index,
       active:true,
       deadindex: index===0? !acctive.deadindex:acctive.index
   })
   console.log(index,acctive.index,acctive.active,acctive.deadindex)
  }
  
  const rating=[0,1,2,3,4]
  return (
    <div>
     
      {
          rating.map((star,index) =>(
              <Star className="my-2" key={index} id={index}  active={star<=acctive.index && acctive.active && acctive.deadindex ? true :false} onClick={(event)=>handleChange(event,index)} >
              <AiFillStar  />

              </Star>
          ))
      }
    </div>
  )
}



export default  StarRating