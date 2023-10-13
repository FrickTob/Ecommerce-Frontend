import React, { useEffect, useState } from 'react'
import '../styles/MyCartPage.css'
import { useCookies } from 'react-cookie'

const MyCartPage = ({cartItems, removeCartItems}) => {
  let [cookies, setCookie] = useCookies('cart')
  let [totalPrice, setTotalPrice] = useState(0)

  useEffect(()=>{
    if (cartItems != null && cartItems.length !== 0) {
      updateTotalPrice()
    }
},[cartItems])

  let updateTotalPrice = () => {
    var currTotal = 0
    console.log('cart', cartItems)
    cartItems.forEach((item) => {
      currTotal += parseFloat(item[0]?.product_price) * item[1]
    })
    setTotalPrice(currTotal)
  }

  let removeItem = (id) => {
    let currCart = cartItems.filter((cartItem) => cartItem[0].id !== id)
    removeCartItems(currCart)
    setCookie('cart', currCart)
  }

  return (
    <div className='myCartPage'>
        <div className='cartBox'>
            <h2>Your Cart: ({cartItems.length} items)</h2>
            {cartItems.map((cartItem) => (
              <div>
                <h3>{cartItem[0]?.product_title} {cartItem[1]}</h3>
                <button onClick={() => (removeItem(cartItem[0]?.id))}>Remove</button>
              </div>
            ))}
        </div>
        <div className='subtotalBox'>
          <h3>Subtotal</h3>
          {cartItems.map((cartItem) => (
            <div>
              <h3>{cartItem[0]?.product_title} {parseFloat(cartItem[0]?.product_price) * cartItem[1]}</h3>
            </div>
          ))}
          <h3>{totalPrice}</h3>
        </div>
    </div>
  )
}

export default MyCartPage