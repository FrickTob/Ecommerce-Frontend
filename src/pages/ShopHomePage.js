import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ShopHomePage.css'


const ShopHomePage = () => {
  return (
    <div className='homePage'>
    <h1>Shop the Hottest clothes for less</h1>
    <Link to={'/products/'}>Shop All Clothes</Link>
    </div>
  )
}

export default ShopHomePage
