import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import '../styles/ShopDetailedPage.css'

interface ShopDetailedPageProps {
  cartItems : Array<ProductAndQuantity>,
  addCartItems : React.Dispatch<ProductAndQuantity[]>
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const ShopDetailedPage : React.FC<ShopDetailedPageProps> = ({cartItems, addCartItems, setIsLoading}) => {
  let startProduct : Product = {
    id : -1,
    product_title : "empty",
    product_description : "empty",
    product_price : -1,
    product_quantity : -1,
    product_image : "none"
  }
  let [product, setProduct] = useState(startProduct)
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
      if (cartItems[i].product.id === product.id) {
        productIndex = i
        break
      }
    }
    console.log('i', productIndex)
    var currItems : Array<ProductAndQuantity> = []
    if (productIndex === -1) {
      currItems = [...cartItems, {product: product, quantity: 1}]
    }
    else {
      currItems = [...cartItems]
      currItems[productIndex].quantity += 1
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
    setIsLoading(true)
    let response = await fetch('/api/store/' + itemNum + '/')
    let data = await response.json()
    setIsLoading(false)
    console.log("data", response.json)
    setProduct(data)
  }

  return (
    <div className='detailedPage'>
      <div className='detailedItemBox'>
        <img className='detailedImage' alt='' src={product?.product_image}></img>
        <div className='detailedItemTitleBox'>
          <h1>{product?.product_title}</h1>
          <p>{product?.product_price}</p>
        </div>
        <div className='horizontalLine' />
        <p>{product?.product_description}</p>
        <button className='positiveButton' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ShopDetailedPage
