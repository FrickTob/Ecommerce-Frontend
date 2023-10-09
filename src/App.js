import './styles/App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import ProductDetailedPage from './pages/ProductDetailedPage';
import StoreHomePage from './pages/StoreHomePage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" exact element={<StoreHomePage />} />
        <Route path="/item/:id" element={<ProductDetailedPage />} />
      </Routes>
    </Router>
    <Footer />
    </>
  );
}

export default App;
