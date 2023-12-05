import { useEffect, useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import '../styles/ShopProductsPage.css'

interface ProductsPageProps {
  searchText : String
}

const ShopProductsPage : React.FC<ProductsPageProps> = ({searchText}) => {

  let [products, setProducts] = useState(Array<Product>)
  
  useEffect(() => {
    getProducts()
  },[searchText])

  
  let getProducts = async () => {
    let response = await fetch('/api/store/?search=' + searchText)
    let data = await response.json()
    setProducts(data)
  }


  return (
    <div className="productsPage">
      <div className="productGrid">
      {products.map((product) => (
        <Link to={'/item/' + product?.id} className="productGridItem" key={product?.id}>
          <div className="imageBox"><img alt="" src={product?.product_image} /></div>
          <h3>{product?.product_title}</h3>
          <p>{product?.product_price}</p>
          </Link>))}
      </div>
    </div>
  )
}

export default ShopProductsPage
