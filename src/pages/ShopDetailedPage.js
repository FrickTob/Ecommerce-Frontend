import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import '../styles/ShopDetailedPage.css'


const ShopDetailedPage = ({cartItems, addCartItems}) => {

  let [product, setProduct] = useState()
  let [cookies, setCookie] = useCookies(['cart'])

  useEffect(() => {
    getProduct()
  }, [])

  let addToCart = () => {
    if (product == null) return
    // check if item is in the cart. If so, 
    console.log('items',cartItems)
    var productIndex = -1
    for (var i = 0; i < cartItems.length; i++) {
      console.log('items', cartItems, product)
      if (cartItems[i][0].id === product.id) {
        productIndex = i
        break
      }
    }
    console.log('i', productIndex)
    var currItems = []
    if (productIndex === -1) {
      currItems = [...cartItems, [product, 1]]
    }
    else {
      currItems = [...cartItems]
      currItems[productIndex][1] += 1
    }
    addCartItems(currItems)
    let itemsCookieStr = JSON.stringify(currItems)
    setCookie('cart', itemsCookieStr)
    
  }

  let getProduct = async () => {

    // get item number from the current url
    let fetchURL = document.URL.split('/')
    let itemIndex = fetchURL.findIndex((str) => {return str === 'item'})
    let itemNum = fetchURL[itemIndex + 1]

    let response = await fetch('/api/store/' + itemNum + '/')
    let data = await response.json()
    setProduct(data)
  }

  return (
    <div className='detailedPage'>
      <img className='detailedImage' alt='' src={product?.product_image}></img>
      <h1>{product?.product_title}</h1>
      <p>{product?.product_description}</p>
      <p>{product?.product_price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default ShopDetailedPage
