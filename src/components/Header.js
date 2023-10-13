import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'


const Header = ({cartStuff}) => {

  let [cartSize, setCartSize] = useState(0)
  useEffect(() => {
    if (cartStuff !== undefined) {
      setCartSize(cartStuff.length)
    }
  },[cartStuff])

  return (
    <div>
      <div className='topHeaderRow'>
        <Link to={'/'}>Logo here</Link>
        <div className='middleHeader'>
          <Link to={'/products'}>Home</Link>
          <Link to={'/about'}>About</Link>
        </div>
        <Link to={'/my-cart'}>Cart {cartSize === 0 ? "" : cartSize}</Link>
      </div>
    </div>
  )
}

export default Header
