import React, { useEffect } from 'react'
import { useState } from 'react'


const ShopDetailedPage = () => {

  let [product, setProduct] = useState()

  useEffect(() => {
    getProduct()
  },[])
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
    <div>
      <img src={product?.product_image}></img>
      <h1>{product?.product_title}</h1>
      <p>{product?.product_description}</p>
    </div>
  )
}

export default ShopDetailedPage
