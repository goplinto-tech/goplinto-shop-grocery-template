/**
 * Rating is used when required to show feedback of user in stars
 * @param {Number} value Value is the current value of the rating. default is 0.00
 * @param {Number} size Size of the stars in pixel.
 * @param {boolean} edit True if want to change the value, false to stop change. Default is false.
 * @param {count} count Max value of the rating. default is 5.00
 */

import ReactStars from "react-rating-stars-component";

const Rating = ({ value, size , edit = false, count = 5, place, changevalue,...params }) => {
  const secondExample = {
    size: size||30,
    count: 5,
    color: "black",
    activeColor: "red",
    value: value,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log(`Example 2: new value is ${newValue}`);
    }
  };
    return (
        <div className='stars rating flex items-center align-items-center' data-stars="4" >

          {
            place==="order"?

            <ReactStars
            count={count}
            value={value}
            edit={true}

            size={size}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#FFC120"
            a11y= {true}
            onChange={newValue => {
              changevalue(newValue);
            }}



        />
            :

            <ReactStars
                count={count}
                value={value}
                edit={edit}
                // onChange={ratingChanged}
                size={size}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#FFC120"
                {...params}
            />
          }

            <span style={{ marginLeft: '8px ' }} className={`text-sm font-medium black-color-75 ${place==='order'?"hidden":""}`}>{Number(value).toFixed(2)}</span>
        </div>
    )
}

export default Rating


