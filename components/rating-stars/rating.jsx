// /**
//  * Rating is used when required to show feedback of user in stars
//  * @param {Number} value Value is the current value of the rating. default is 0.00
//  * @param {Number} size Size of the stars in pixel.
//  * @param {boolean} edit True if want to change the value, false to stop change. Default is false.
//  * @param {count} count Max value of the rating. default is 5.00
//  */

// import ReactStars from "react-rating-stars-component";

// const Rating = ({ value = 3.7, size = 24, edit = false, count = 5.00, ...params }) => {
//     return (
//         <div className='stars rating flex items-center align-items-center' data-stars="1">
//             <ReactStars
//                 count={count}
//                 value={value}
//                 edit={edit}
//                 // onChange={ratingChanged}
//                 size={size}
//                 isHalf={true}
//                 emptyIcon={<i className="far fa-star"></i>}
//                 halfIcon={<i className="fa fa-star-half-alt"></i>}
//                 fullIcon={<i className="fa fa-star"></i>}
//                 activeColor="#d85a5a"
//                 {...params}
//             />
//             <span style={{ marginLeft: '8px ' }} className="text-sm font-medium black-color-75">{Number(value).toFixed(2)}</span>
//         </div>
//     )
// }

// export default Rating


