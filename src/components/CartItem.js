import React from 'react'
import '../styles/CartItem.css'

const CartItem = ({item, quantity, onClick}) => {
  return (
    <div className='cartItemBox'>
      <img className='cartItemImg' alt='' src={item.product_image}></img>
      <div className='cartItemDetailsBox'> 
        <h3>{item?.product_title}</h3>
        <p>{item?.product_description}</p>
        <p>Qty: {quantity}</p>
        <p>Price: {item?.product_price}</p>
        <button className='negativeButton' onClick={onClick}>Remove</button>
      </div>
    </div>
  )
}

export default CartItem
