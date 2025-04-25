import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Context from './context/Context';

function App() {
  return (
    <Context> {/* Wrap everything with Context provider */}
      <BrowserRouter>
        <Header />
        <Routes> {/* Use Routes instead of direct Route */}
          <Route path='/' element={<Home />} /> {/* New v6 syntax */}
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;