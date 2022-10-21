import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ItemSearch from './ItemSearch';

const Navbar = ({ search, setSearch }) => {

  const navigate = useNavigate();

  return (
    <nav>
      <span>
        <ItemSearch search={search} setSearch={setSearch}/>
      </span>
      
      <span>
      <button onClick={() => navigate("/shop")}>Shop</button>
        <button onClick={() => navigate("/shopping-cart")}>Shopping Cart</button>
        <button onClick={() => navigate("/checkout")}>Check Out</button>
      </span>
    </nav>
  )
}

export default Navbar