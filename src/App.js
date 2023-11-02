import Header from './components/Header'
import Footer from './components/Footer';
import ShopDetailedPage from './pages/ShopDetailedPage';
import ShopHomePage from './pages/ShopHomePage'
import ShopProductsPage from './pages/ShopProductsPage';
import AboutPage from './pages/AboutPage';
import MyCartPage from './pages/MyCartPage';
import './styles/General.css'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

function App() {

  let [cartItems, setCartItems] = useState([])
  let [cookies, setCookie] = useCookies('cart')

  useEffect(()=>{
    if (cookies.cart === undefined) {
      setCartItems([])
    }
    else {
      setCartItems(cookies?.cart)
    }
  },[])

  return (
    <body>
    <Router>
      <Header cartStuff={cartItems} />
      <Routes>
        <Route path="/" exact element={<ShopHomePage />} />
        <Route path="/products" element={<ShopProductsPage />} />
        <Route path="/item/:id" element={<ShopDetailedPage cartItems={cartItems} addCartItems={setCartItems} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-cart" element={<MyCartPage cartItems={cartItems} removeCartItems={setCartItems} />} />
      </Routes>
      <Footer />
    </Router>
    </body>
  );
}

export default App;
