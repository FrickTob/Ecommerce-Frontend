import React from 'react'
import '../styles/CartItem.css'

const CartItem = ({item, quantity, onClick}) => {
  return (
    <div className='cartItemBox'>
      <img className='cartItemImg' alt='' src={item.product_image}></img>
      <h3 className='cartItemTitle'>{item.product_title}</h3>
      <h4 className='cartItemQuant'>{quantity}</h4>
      <button onClick={onClick}>Remove</button>
    </div>
  )
}

export default CartItem
