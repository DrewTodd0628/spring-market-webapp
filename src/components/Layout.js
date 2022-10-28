import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';

const Layout = ({ signOut }) => {

  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Header/>
      <Navbar search={search} setSearch={setSearch} signOut={signOut}/>
      <main>
        <Outlet context={[search]}/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout