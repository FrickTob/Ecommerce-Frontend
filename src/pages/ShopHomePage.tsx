import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ShopHomePage.css'


const ShopHomePage = () => {
  return (
    <div className='homePage'>
      <h1>Shop the Hottest clothes for less</h1>
      <button className='positiveButton'><Link className='allProductsHomepageLink' to={'/products/'}>Shop All Clothes</Link></button>
    </div>
  )
}

export default ShopHomePage
