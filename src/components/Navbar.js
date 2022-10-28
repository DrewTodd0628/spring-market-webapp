import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ItemSearch from './ItemSearch';import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

const Navbar = ({ search, setSearch, signOut }) => {

  const navigate = useNavigate();

  return (
    <nav>
      <span>
        <ItemSearch search={search} setSearch={setSearch}/>
      </span>
      
      <span>
      <button onClick={() => navigate("/shop")}>Shop for items</button>
        <button onClick={() => navigate("/shopping-cart")}>Shopping Cart</button>
        {/* <button onClick={() => navigate("/checkout")}>Check Out</button> */}
        <Button onClick={signOut}>Sign Out</Button>
      </span>
    </nav>
  )
}

export default Navbar