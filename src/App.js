import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails'; 
import { CartProvider } from './context/Context';


function App() {
  return (
    <CartProvider> {/* Wrap everything with Context provider */}
      <BrowserRouter>
        <Header />
        <Routes> {/* Use Routes instead of direct Route */}
          <Route path='/' element={<Home />} /> {/* New v6 syntax */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductDetails />} /> {/* Add this route */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;