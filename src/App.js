import Header from './components/Header'
import Footer from './components/Footer';
import ShopDetailedPage from './pages/ShopDetailedPage';
import ShopHomePage from './pages/ShopHomePage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import ShopProductsPage from './pages/ShopProductsPage';

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" exact element={<ShopHomePage />} />
        <Route path="/products" element={<ShopProductsPage />} />
        <Route path="/item/:id" element={<ShopDetailedPage />} />
      </Routes>
    </Router>
    <Footer />
    </>
  );
}

export default App;
