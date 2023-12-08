import Header from './components/Header'
import Footer from './components/Footer';
import ShopDetailedPage from './pages/ShopDetailedPage';
import ShopHomePage from './pages/ShopHomePage'
import ShopProductsPage from './pages/ShopProductsPage';
import AboutPage from './pages/AboutPage';
import MyCartPage from './pages/MyCartPage';
import ShopCheckoutPage from './pages/ShopCheckoutPage';
import './styles/General.css'
import './types/types'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import { isJsxClosingFragment } from 'typescript';
import { Grid } from 'react-loader-spinner';

function App() {


  let startArr : Array<ProductAndQuantity> = []
  let [cartItems, setCartItems] = useState(startArr)
  let [searchText, setSearchText] = useState("")
  let [cookies, setCookie] = useCookies(['cart'])
  let [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if (cookies.cart === undefined) {
      setCartItems([])
    }
    else {
      setCartItems(cookies?.cart)
    }
  },[])

  return (
    <>
    <Grid
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperClass="loadingSpinner"
      visible={isLoading}/>
    <Router>
      <Header cartStuff={cartItems} />
      <Routes>
        <Route path="/" element={<ShopHomePage />} />
        <Route path="/products" element={<ShopProductsPage setIsLoading={setIsLoading} />} />
        <Route path="/item/:id" element={<ShopDetailedPage cartItems={cartItems} addCartItems={setCartItems} setIsLoading={setIsLoading} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-cart" element={<MyCartPage cartItems={cartItems} removeCartItems={setCartItems} setIsLoading={setIsLoading} />} />
        <Route path="/checkout" element={<ShopCheckoutPage />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
