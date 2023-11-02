import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import cartLogo from '../media/cart.svg'
import storeLogo from '../media/redhead.png'
import background from '../media/homepagebackground.jpg'


const Header = ({cartStuff}) => {

  let [cartSize, setCartSize] = useState(0)

  const showBubble = () => {
    const itemsBubble = document.getElementById('cartNumItemsBubble')
    if (cartStuff === undefined || cartStuff.length === 0) {
      itemsBubble.style.visibility = 'hidden'
    }
    else {
      itemsBubble.style.visibility = 'visible'
    }
    console.log(itemsBubble)
  }


  useEffect(() => {
    if (cartStuff !== undefined) {
      setCartSize(cartStuff.length)
    }
    showBubble()
  },[cartStuff])



  return (
    <div className='header'>
      <div className='topHeaderRow'>
        <Link className='logoHeaderBox' to={'/'}><img src={storeLogo}/></Link>
        <div className='middleHeader'>
          <Link to={'/products'}>All Products</Link>
          <Link to={'/about'}>About</Link>
        </div>
        <Link className='cartHeaderBox' to={'/my-cart'}>
          <div className='cartLogoBox'>
            <img className='cartLogo' src={cartLogo} />
            <div id='cartNumItemsBubble' className='cartNumItemsBubble'>{cartSize === 0 ? "" : cartSize}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
