import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ShopHomePage.css'


const ShopHomePage = () => {
  return (
    <div className='homePage'>
      <div className='homePageCover'>
        <h1>Shop the Hottest clothes for less</h1>
        <Link className='allProductsHomepageLink' to={'/products/'}>Shop All Clothes</Link>
      </div>
    </div>
  )
}

export default ShopHomePage
