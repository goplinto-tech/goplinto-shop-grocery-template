import Wishlist from './wishlist.jsx'
function index({data,wishListedItem,setWishListedItem}) {
  return (
    <Wishlist data={data} wishListedItem={wishListedItem} setWishListedItem={setWishListedItem}/>
  )
}

export default index
