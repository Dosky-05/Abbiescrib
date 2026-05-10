import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart"       element={<Cart />} />
          <Route path="/about"      element={<About />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="*"           element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
