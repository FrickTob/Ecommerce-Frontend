import React, { useEffect, useState } from 'react'
import '../styles/MyCartPage.css'
import { useCookies } from 'react-cookie'
import CartItem from '../components/CartItem'

const MyCartPage = ({cartItems, removeCartItems}) => {
  let [cookies, setCookie] = useCookies('cart')
  let [totalPrice, setTotalPrice] = useState(0)

  useEffect(()=>{
    if (cartItems != null && cartItems.length !== 0) {
      updateTotalPrice()
    }
    if (cartItems.length === 0) {
      setTotalPrice(0)
    }
},[cartItems])

  let updateTotalPrice = () => {
    var currTotal = 0
    console.log('cart', cartItems)
    cartItems.forEach((item) => { currTotal += parseFloat(item[0]?.product_price) * item[1]})
    setTotalPrice(currTotal.toFixed(2))
  }

  let removeItem = (id) => {
    let currCart = cartItems.filter((cartItem) => cartItem[0].id !== id)
    removeCartItems(currCart)
    setCookie('cart', currCart)
    updateTotalPrice()
  }

  return (
    <div className='myCartPage'>
        <h2>Your Cart: ({cartItems.length} items)</h2>
        <div className='cartInfoBox'>
          <div className='cartBox'>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem[0].id} item={cartItem[0]} quantity={cartItem[1]} onClick={() => removeItem(cartItem[0].id)}/>
              ))}
          </div>
          <div className='subtotalBox'>
            <h3>Summary</h3>
            {cartItems.map((cartItem) => (
              <div key={cartItem[0].id}>
                <p>{cartItem[0]?.product_title} x{cartItem[1]}  {parseFloat(cartItem[0]?.product_price) * cartItem[1]}</p>
              </div>
            ))}
            <div className='horizontalLine'></div>
            <p>Total {totalPrice === 0 ? "" : totalPrice}</p>
            <div className='horizontalLine'></div>
            <button className='positiveButton'>Checkout</button>
          </div>
        </div>
    </div>
  )
}

export default MyCartPage