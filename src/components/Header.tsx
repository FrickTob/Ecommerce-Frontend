import React, { KeyboardEventHandler, MouseEventHandler } from 'react'
import '../styles/Header.css'
import { Link, SetURLSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import cartLogo from '../media/cart.svg'
import storeLogo from '../media/redhead.png'
import background from '../media/homepagebackground.jpg'
import { KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'


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
  //searchText : string,
  //setSearchText : React.Dispatch<React.SetStateAction<string>>
}

const Header : React.FC<HeaderProps> = ({cartStuff}) => {

  let [cartSize, setCartSize] = useState(0)
  let [searchParams, setSearchParams] = useSearchParams()
  let navigate = useNavigate()
  let searchBar = document.getElementById('searchBar') as HTMLInputElement

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

  let handleSearchTyping : KeyboardEventHandler = (e : KeyboardEvent) => {
    if (e.key !== "Enter") return
    submitSearch()
  }
  let submitSearch = () => {
    if (searchBar == null) return
      setSearchParams({"search" : searchBar.value})
      if (searchBar.value == '') 
        navigate('/products')
      else 
        navigate({pathname: '/products',
                  search: '?search=' + searchBar.value})
  }

  let resetSearch = () => {
    if (searchBar == null) return
    searchBar.value = ''
    setSearchParams({})
  }

  return (
    <div className='header'>
      <div className='topHeaderRow'>
        <Link className='logoHeaderBox' to={'/'}><img src={storeLogo}/></Link>
        <div className='middleHeader'>
          <Link to={'/products'} onClick={(e) => resetSearch()}>All Products</Link>
          <Link to={'/about'} onClick={(e) => resetSearch()}>About</Link>
          <div className='searchBarBox'>
            <input id='searchBar' onKeyDown={handleSearchTyping} className='searchBar' type='text' placeholder='Search for products...'></input>
            <img onClick={submitSearch} className='searchIconImg' src='https://img.icons8.com/ios-filled/50/000000/search--v1.png'/>
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
