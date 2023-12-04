import Header from './components/Header'
import Footer from './components/Footer';
import ShopDetailedPage from './pages/ShopDetailedPage';
import ShopHomePage from './pages/ShopHomePage'
import ShopProductsPage from './pages/ShopProductsPage';
import AboutPage from './pages/AboutPage';
import MyCartPage from './pages/MyCartPage';
import './styles/General.css'
import './types/types'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

function App() {


  let startArr : Array<ProductAndQuantity> = []
  let [cartItems, setCartItems] = useState(startArr)
  let [searchText, setSearchText] = useState("")
  let [cookies, setCookie] = useCookies(['cart'])

  useEffect(()=>{
    if (cookies.cart === undefined) {
      setCartItems([])
    }
    else {
      setCartItems(cookies?.cart)
    }
  },[])

  return (
    <div className='body'>
    <Router>
      <Header setSearchText={setSearchText} cartStuff={cartItems} />
      <Routes>
        <Route path="/" element={<ShopHomePage />} />
        <Route path="/products" element={<ShopProductsPage searchText={searchText} />} />
        <Route path="/item/:id" element={<ShopDetailedPage cartItems={cartItems} addCartItems={setCartItems} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-cart" element={<MyCartPage cartItems={cartItems} removeCartItems={setCartItems} />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
