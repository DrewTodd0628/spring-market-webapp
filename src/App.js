import Footer from './components/Footer';
import Header from './components/Header';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ShoppingCart from './components/ShoppingCart';
import CheckOut from './components/CheckOut';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index path="/" element={<Shop/>}/>
        <Route index path="/shop" element={<Shop/>}/>
        <Route index path="/shopping-cart" element={<ShoppingCart/>}/>
        <Route index path="/checkout" element={<CheckOut/>}/>
      </Route>
    </Routes>
  );
}

export default App;
