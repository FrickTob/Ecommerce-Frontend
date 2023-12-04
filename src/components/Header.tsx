import React, { KeyboardEventHandler } from 'react'
import '../styles/Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import cartLogo from '../media/cart.svg'
import storeLogo from '../media/redhead.png'
import background from '../media/homepagebackground.jpg'
import { KeyboardEvent } from 'react'


// product_title = models.CharField(max_length=200)
// product_description = models.TextField()
// product_price = models.FloatField()
// product_quantity = models.IntegerField()
// product_image = models.ImageField(null=True, upload_to="./")

interface Product {
  id : number,
  product_title : String,
  product_description : String,
  product_price : number,
  product_quantity : number,
  product_image : String
}

interface ProductAndQuantity {
  product : Product,
  quantity : number
}

interface HeaderProps {
  cartStuff : Array<ProductAndQuantity>,
  setSearchText : React.Dispatch<React.SetStateAction<string>>
}

const Header : React.FC<HeaderProps> = ({cartStuff, setSearchText}) => {

  let [cartSize, setCartSize] = useState(0)
  let navigate = useNavigate()

  const showBubble = () => {
    const itemsBubble : HTMLElement | null = document.getElementById('cartNumItemsBubble')
    if (!itemsBubble) {return}
    if (cartStuff === undefined || cartStuff.length === 0) {
      itemsBubble!.style.visibility = 'hidden'
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

  let submitSearch : KeyboardEventHandler = (e : KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate('/products')
    }
  }

  return (
    <div className='header'>
      <div className='topHeaderRow'>
        <Link className='logoHeaderBox' to={'/'}><img src={storeLogo}/></Link>
        <div className='middleHeader'>
          <Link to={'/products'}>All Products</Link>
          <Link to={'/about'}>About</Link>
          <div className='searchBarBox'>
            <input onKeyDown={submitSearch} onChange={(event) => setSearchText(event.target.value)} className='searchBar' type='text' placeholder='Search for products...'></input>
            <Link className='searchIcon' to={'/products'}>
              <img className='searchIconImg' src='https://img.icons8.com/ios-filled/50/000000/search--v1.png'/>
            </Link>
          </div>
        </div>
        <Link className='cartHeaderBox' to={'/my-cart'}>
          <div className='cartLogoBox'>
            <img className='cartLogo' src={cartLogo} />
            <div id='cartNumItemsBubble' className='cartNumItemsBubble'></div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
